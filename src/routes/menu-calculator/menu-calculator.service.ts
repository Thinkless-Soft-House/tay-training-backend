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
