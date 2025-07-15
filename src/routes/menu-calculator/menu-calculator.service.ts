import * as fs from 'fs';
import * as path from 'path';
import { FileService } from 'src/core/services/File.service';
import { ErrorHandler } from 'src/core/handlers/error.handler';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { ILike, Repository } from 'typeorm';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class MenuCalculatorService extends CoreService<Menu> {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    private fileService: FileService,
  ) {
    super(menuRepository);
  }

  override createWhere(query: any) {
    let where = {};

    // Garante que filters seja um array, mesmo se vier como string JSON
    let filters = query.filters;
    if (typeof filters === 'string') {
      try {
        filters = JSON.parse(filters);
      } catch {
        filters = [];
      }
    }

    // Se houver múltiplos filtros, monta um array de where (OR entre filtros)
    if (Array.isArray(filters) && filters.length > 0) {
      where = filters.map((filter: any) => {
        // Corrige: para campos numéricos, nunca use ILIKE
        const isNumericField = ['minCalories', 'maxCalories'].includes(
          filter.field,
        );
        if (filter.operator === 'like' && isNumericField) {
          // Tenta extrair o número do valor (ex: '%2%' -> 2)
          const num = parseInt((filter.value || '').replace(/[^0-9]/g, ''));
          if (!isNaN(num)) {
            return { [filter.field]: num };
          }
          return {}; // ignora filtro inválido
        } else if (filter.operator === 'like') {
          return { [filter.field]: ILike(filter.value) };
        } else if (filter.operator === '=' && isNumericField) {
          return { [filter.field]: Number(filter.value) };
        } else if (filter.operator === '=') {
          return { [filter.field]: filter.value };
        }
        return {};
      });
    } else {
      // Fallback para filtros antigos
      if (query.name) where['name'] = ILike(`%${query.name}%`);
      if (query.description)
        where['description'] = ILike(`%${query.description}%`);
      if (query.status) where['status'] = query.status;
      if (query.filter) {
        const aux = where;
        where = [
          { ...aux, name: ILike(`%${query.filter}%`) },
          { ...aux, description: ILike(`%${query.filter}%`) },
        ];
      }
    }

    // LOG para debug
    console.log(
      '[MenuCalculatorService] createWhere - query:',
      JSON.stringify(query),
    );
    console.log(
      '[MenuCalculatorService] createWhere - where:',
      JSON.stringify(where),
    );

    return where;
  }

  async findByCalories(calories: number) {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.minCalories <= :mincalories', { mincalories: calories })
      .andWhere('menu.maxCalories >= :maxcalories', { maxcalories: calories })
      .orderBy('menu.minCalories', 'ASC')
      .getOne();

    if (!menu) {
      const minprox = await this.menuRepository
        .createQueryBuilder('menu')
        .where('menu.minCalories <= :mincalories', { mincalories: calories })
        .orderBy('menu.minCalories', 'DESC')
        .getOne();

      const maxprox = await this.menuRepository
        .createQueryBuilder('menu')
        .where('menu.maxCalories >= :maxcalories', { maxcalories: calories })
        .orderBy('menu.maxCalories', 'ASC')
        .getOne();

      if (minprox && maxprox) {
        // Checa qual está mais próximo do valor de calorias
        const diffMin = Math.abs(calories - minprox.maxCalories);
        const diffMax = Math.abs(maxprox.minCalories - calories);
        return diffMin <= diffMax ? minprox : maxprox;
      } else if (minprox) {
        return minprox;
      } else if (maxprox) {
        return maxprox;
      } else {
        throw new NotFoundException(
          'Nenhum menu encontrado para as calorias informadas',
        );
      }
    }

    return menu;
  }

  // Sobrescreve o método create para garantir que sempre retorna um único Menu
  override async create(createDto: any): Promise<any> {
    try {
      const newItem = this.menuRepository.create(createDto);
      return await this.menuRepository.save(newItem);
    } catch (error) {
      throw new ErrorHandler(error.message, 400, 400);
    }
  }

  async createWithFile(createDto: any, file: any): Promise<Menu[]> {
    try {
      let pdfUrl = '';
      if (file) {
        // Gera nome seguro para o arquivo baseado no nome do menu
        const safeName = String(createDto.name || 'menu')
          .toLowerCase()
          .replace(/[^a-z0-9]/gi, '_')
          .replace(/_+/g, '_')
          .replace(/^_+|_+$/g, '');
        const fileName = `menu_${safeName}.pdf`;
        const fileDir = path.resolve(process.cwd(), 'files/menus');
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir, { recursive: true });
        }
        const fullFilePath = path.join(fileDir, fileName);
        await this.fileService.createFile(fileDir + '/', fileName, file.buffer);
        pdfUrl = `./files/menus/${fileName}`;
      }
      // Cria o registro já com o pdfUrl correto
      const newItem = this.menuRepository.create({ ...createDto, pdfUrl });
      const created = await this.menuRepository.save(newItem);
      return created;
    } catch (error) {
      throw new ErrorHandler(error.message, 400, 400);
    }
  }

  async updateWithFile(id: number, updateDto: any, file: any): Promise<Menu> {
    try {
      const item = await this.menuRepository.findOne({ where: { id } });
      if (!item) throw new ErrorHandler('Item não encontrado', 404, 404);
      let pdfUrl = updateDto.pdfUrl || item.pdfUrl;
      if (file) {
        const safeName = String(updateDto.name || item.name || 'menu')
          .toLowerCase()
          .replace(/[^a-z0-9]/gi, '_')
          .replace(/_+/g, '_')
          .replace(/^_+|_+$/g, '');
        const fileName = `menu_${safeName}.pdf`;
        const fileDir = path.resolve(process.cwd(), 'files/menus');
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir, { recursive: true });
        }
        const fullFilePath = path.join(fileDir, fileName);
        await this.fileService.createFile(fileDir + '/', fileName, file.buffer);
        pdfUrl = `./files/menus/${fileName}`;
      }
      const dto = { ...item, ...updateDto, pdfUrl };
      await this.menuRepository.update(id, dto);
      return await this.menuRepository.findOne({ where: { id } });
    } catch (error) {
      throw new ErrorHandler(error.message, 400, 400);
    }
  }

  async getFilePath(id: number): Promise<string> {
    const item = await this.menuRepository.findOne({ where: { id } });
    if (!item || !item.pdfUrl)
      throw new ErrorHandler('Arquivo não encontrado', 404, 404);

    // Verificar se o arquivo existe fisicamente
    if (!fs.existsSync(item.pdfUrl)) {
      throw new ErrorHandler('Arquivo não encontrado no servidor', 404, 404);
    }

    return item.pdfUrl;
  }

  async getFileInfo(
    id: number,
  ): Promise<{ path: string; size: number; exists: boolean }> {
    try {
      const item = await this.menuRepository.findOne({ where: { id } });
      if (!item || !item.pdfUrl) {
        return { path: '', size: 0, exists: false };
      }

      const filePath = item.pdfUrl;
      const exists = fs.existsSync(filePath);

      if (!exists) {
        return { path: filePath, size: 0, exists: false };
      }

      const stats = fs.statSync(filePath);
      return { path: filePath, size: stats.size, exists: true };
    } catch (error) {
      return { path: '', size: 0, exists: false };
    }
  }
}
