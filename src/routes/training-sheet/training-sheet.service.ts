import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingSheet } from './entities/training-sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { ILike, Repository } from 'typeorm';
import slugify from 'slugify';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

import { MulterFile } from 'multer';
import { FileService } from 'src/core/services/File.service';
import { ErrorHandler } from 'src/core/handlers/error.handler';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

export interface WeekData {
  id: number;
  publicName: string;
  slug: string;
  weekDays: (TrainingDay | null)[];
}

export interface TrainingDay {
  id: number;
  day: number;
  shortName: string;
  exerciseGroup: {
    id: number;
    publicName: string;
    category: {
      id: number;
      name: string;
    };
  };
}

@Injectable()
export class TrainingSheetService extends CoreService<TrainingSheet> {
  constructor(
    @InjectRepository(TrainingSheet)
    trainingSheetRepository: Repository<TrainingSheet>,
    private fileService: FileService,
  ) {
    super(trainingSheetRepository);
  }

  async getFile(id: number) {
    // Check if item exists
    const whereId: any = { id };
    const item = await this.repository.findOne({
      where: whereId,
    });

    if (!item) {
      throw new ErrorHandler('Item não encontrado', 404, 404);
    }

    const fileConfig = {
      filename: 'Treino_' + id + '.pdf',
      path: './files/workouts/',
    };

    const buffer = await this.fileService.getFile(
      fileConfig.path,
      fileConfig.filename,
    );
    return buffer;
  }

  override createWhere(query: any) {
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);
    if (query.publicName) where['publicName'] = ILike(`%${query.publicName}%`);
    if (query.slug) where['slug'] = `${query.slug}`;

    return where;
  }

  override async create(createDto: any): Promise<TrainingSheet> {
    try {
      // Create a new item
      const data = {
        ...createDto,
        slug: slugify(createDto.name, { lower: true }),
      };
      const newItem: any = this.repository.create(data);

      // Save item in database and return it
      const create$ = await this.repository.save(newItem);

      // Create slug with id and name together
      const slug = slugify(`${create$.id}-${create$.name}`, {
        lower: true,
      });

      // Update item with slug
      await this.repository.update(create$.id, {
        slug,
      });

      return { ...create$, slug };
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async createWithFile(
    createDto: any,
    file: MulterFile,
  ): Promise<TrainingSheet> {
    try {
      // Create a new item
      const data = {
        ...createDto,
        slug: slugify(createDto.name, { lower: true }),
      };
      const newItem: any = this.repository.create(data);

      // Save item in database and return it
      const create$ = await this.repository.save(newItem);

      // Create slug with id and name together
      const slug = slugify(`${create$.id}-${create$.name}`, {
        lower: true,
      });
      const toUpdate = {
        slug,
        pdfPath: null,
      };

      if (file) {
        const fileConfig = {
          filename: 'Treino_' + create$.id + '.pdf',
          path: './files/workouts/',
        };
        await this.fileService.createFile(
          fileConfig.path,
          fileConfig.filename,
          file,
        );

        toUpdate.pdfPath = fileConfig.path;
      }

      // Update item with slug
      await this.repository.update(create$.id, toUpdate);

      return { ...create$, slug };
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async updateWithFile(id: number, updateDto: any, file: MulterFile) {
    try {
      // Check if item exists
      const whereId: any = { id };
      const item = await this.repository.findOne({
        where: whereId,
      });

      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      if (file) {
        const fileConfig = {
          filename: 'Treino_' + id + '.pdf',
          path: './files/workouts/',
        };
        await this.fileService.createFile(
          fileConfig.path,
          fileConfig.filename,
          file,
        );

        updateDto.pdfPath = fileConfig.path;
      }

      // Create a new item
      // console.log(updateDto);
      const dto = { id, ...updateDto };
      const newItem: any = this.repository.create(dto);
      // console.log(newItem);
      // Save item in database
      await this.repository.update(id, newItem);

      // Get updated item
      return await this.repository.findOne({ where: whereId });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async getPlannerHomeData(slug: string) {
    const query = this.repository
      .createQueryBuilder('trainingSheet')
      .leftJoinAndSelect('trainingSheet.trainingDays', 'trainingDays')
      .select([
        'trainingSheet.id',
        'trainingSheet.publicName',
        'trainingSheet.slug',
        'trainingSheet.pdfPath',
        'trainingDays.id',
        'trainingDays.day',
      ])
      .where('trainingSheet.slug = :slug', { slug });

    return await query.getOne();
  }

  async getWeekData(slug: string, weekNumber: number) {
    const startDay = weekNumber * 7 - 6;
    const endDay = weekNumber * 7;

    const query = this.repository
      .createQueryBuilder('workout')
      .leftJoinAndSelect(
        'workout.trainingDays',
        'trainingDays',
        'trainingDays.day BETWEEN :startDay AND :endDay',
        { startDay, endDay },
      )
      .leftJoinAndSelect('trainingDays.exerciseGroup', 'exerciseGroup')
      .leftJoinAndSelect('exerciseGroup.category', 'category')
      .select([
        // 'workout.id',
        'workout.publicName',
        // 'workout.slug',
        // 'trainingDays.id',
        'trainingDays.day',
        'trainingDays.shortName',
        // 'exerciseGroup.id',
        'exerciseGroup.publicName',
        // 'category.id',
        // 'category.name',
      ])
      .where('workout.slug = :slug', { slug });

    const planner = await query.getOne();

    // Garantir que todos os dias da semana estejam presentes, preenchendo com null quando necessário
    const weekDays = [];
    for (let i = startDay; i <= endDay; i++) {
      const day = planner?.trainingDays.find((td) => td.day === i);
      if (day) {
        weekDays.push({
          day: day.day,
          shortName: day.shortName,
          exerciseGroup: day.exerciseGroup
            ? { publicName: day.exerciseGroup.publicName }
            : null,
        });
      } else {
        weekDays.push(null);
      }
    }

    // Remover o primeiro elemento da lista
    weekDays.splice(0, 1);

    return {
      id: planner?.id,
      publicName: planner?.publicName,
      slug: planner?.slug,
      weekDays,
    };
  }

  async getWorkoutDetail(slug: string, week: number, workoutIndex: number) {
    const startDay = week * 7 - 6;
    const endDay = week * 7;
    const dayNumber = startDay + workoutIndex + 1;

    const query = this.repository
      .createQueryBuilder('trainingSheet')
      .leftJoinAndSelect(
        'trainingSheet.trainingDays',
        'trainingDay',
        'trainingDay.day = :dayNumber',
        { dayNumber },
      )
      .leftJoinAndSelect('trainingDay.exerciseGroup', 'exerciseGroup')
      .leftJoinAndSelect('exerciseGroup.exerciseMethods', 'exerciseMethod')
      .leftJoinAndSelect(
        'exerciseMethod.exerciseConfigurations',
        'exerciseConfiguration',
      )
      .leftJoinAndSelect('exerciseConfiguration.exercise', 'exercise')
      .leftJoinAndSelect('exerciseConfiguration.method', 'method')
      .select([
        'trainingSheet.publicName',
        'exerciseGroup.publicName',
        'exerciseMethod.rest',
        'exerciseMethod.observations',
        'exerciseConfiguration.id',
        'exerciseConfiguration.series',
        'exerciseConfiguration.reps',
        'exercise.name',
        'exercise.videoUrl',
        'method.name',

        'trainingSheet.id',
        'trainingDay.id',
        'exerciseGroup.id',
        'exerciseMethod.id',
        'exercise.id',
        'method.id',

        // 'trainingSheet.slug',
        // 'trainingDay.day',
        // 'trainingDay.shortName',
        // 'exerciseMethod.observations',
        // 'exerciseConfiguration.id',
        // 'exerciseConfiguration.series',
        // 'exerciseConfiguration.reps',
        // 'exercise.videoUrl',
      ])
      .where('trainingSheet.slug = :slug', { slug });

    const trainingSheet = await query.getOne();

    if (!trainingSheet) {
      throw new NotFoundException('Treino não encontrado');
    }

    const trainingDay = trainingSheet.trainingDays[0];

    if (!trainingDay) {
      throw new NotFoundException('Dia de treino não encontrado');
    }

    const exerciseGroup = trainingDay.exerciseGroup;

    if (!exerciseGroup) {
      throw new NotFoundException('Grupo de exercícios não encontrado');
    }

    return {
      id: trainingSheet.id,
      publicName: trainingSheet.publicName,
      slug: trainingSheet.slug,
      workout: {
        id: exerciseGroup.id,
        publicName: exerciseGroup.publicName,
        observations: (exerciseGroup as any).observations || '',
        exerciseMethods: exerciseGroup.exerciseMethods,
      },
    };
  }

  async generateSlugReport(): Promise<string> {
    try {
      // Buscar todos os training sheets
      const allSheets = await this.repository.find({
        select: ['id', 'name', 'slug'],
        order: { id: 'ASC' },
      });

      // Gerar o relatório
      const report = allSheets.map((sheet) => {
        // Limpar o nome (remover espaços/tabs extras no início e fim)
        const cleanName = sheet.name?.trim() || '';

        // Gerar o slug esperado da mesma forma que o método create() faz
        const expectedSlug = slugify(`${sheet.id}-${cleanName}`, {
          lower: true,
        });

        const isAligned = sheet.slug === expectedSlug;

        return {
          id: sheet.id,
          name: sheet.name, // Mantém o nome original para visualização
          cleanName: cleanName, // Mostra o nome limpo
          currentSlug: sheet.slug,
          expectedSlug: expectedSlug,
          isAligned: isAligned,
          needsUpdate: !isAligned,
        };
      });

      // Estatísticas
      const stats = {
        total: report.length,
        aligned: report.filter((r) => r.isAligned).length,
        misaligned: report.filter((r) => !r.isAligned).length,
      };

      const finalReport = {
        generatedAt: new Date().toISOString(),
        statistics: stats,
        items: report,
      };

      // Garantir que o diretório existe
      const dirPath = './files/reports';
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      // Salvar o relatório em arquivo
      const filePath = `${dirPath}/slug-report.json`;
      writeFileSync(filePath, JSON.stringify(finalReport, null, 2), 'utf-8');

      return filePath;
    } catch (error) {
      throw new ErrorHandler(
        'Erro ao gerar relatório de slugs: ' + error.message,
        500,
        500,
      );
    }
  }
}
