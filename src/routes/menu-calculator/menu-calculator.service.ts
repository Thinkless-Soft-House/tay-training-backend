import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class MenuCalculatorService extends CoreService<Menu> {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
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
        const isNumericField = ['minCalories', 'maxCalories'].includes(filter.field);
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
      if (query.description) where['description'] = ILike(`%${query.description}%`);
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
    console.log('[MenuCalculatorService] createWhere - query:', JSON.stringify(query));
    console.log('[MenuCalculatorService] createWhere - where:', JSON.stringify(where));

    return where;
  }

  async findByCalories(calories: number) {
    const menu = await this.menuRepository.createQueryBuilder('menu')
      .where('menu.minCalories <= :mincalories', { mincalories: calories })
      .andWhere('menu.maxCalories >= :maxcalories', { maxcalories: calories })
      .orderBy('menu.minCalories', 'ASC')
      .getOne();

    if (!menu) {
      const minprox = await this.menuRepository.createQueryBuilder('menu')
        .where('menu.minCalories <= :mincalories', { mincalories: calories })
        .orderBy('menu.minCalories', 'DESC')
        .getOne();

      const maxprox = await this.menuRepository.createQueryBuilder('menu')
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
        throw new NotFoundException('Nenhum menu encontrado para as calorias informadas');
      }
    }

    return menu;
  }
}
