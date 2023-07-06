import { Injectable } from '@nestjs/common';
import { TrainingSheet } from './entities/training-sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { ILike, Repository } from 'typeorm';
import slugify from 'slugify';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

import { MulterFile } from 'multer';
import { FileService } from 'src/core/services/File.service';
import { ErrorHandler } from 'src/core/handlers/error.handler';

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
      console.log(updateDto);
      const dto = { id, ...updateDto };
      const newItem: any = this.repository.create(dto);
      console.log(newItem);
      // Save item in database
      await this.repository.update(id, newItem);

      // Get updated item
      return await this.repository.findOne({ where: whereId });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
