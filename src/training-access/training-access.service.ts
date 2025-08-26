import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingAccess } from './entities/training-access.entity';

@Injectable()
export class TrainingAccessService {
  constructor(
    @InjectRepository(TrainingAccess)
    private repo: Repository<TrainingAccess>,
  ) {}

  async create(clientId: string, trainingId: string) {
    const rec = this.repo.create({ clientId, trainingId });
    return await this.repo.save(rec);
  }

  async top5Today() {
    // Simple aggregation: return trainingId and count for today (frontend will enrich heuristically).
    const rows = await this.repo
      .createQueryBuilder('t')
      .select('t.trainingId', 'trainingId')
      .addSelect('COUNT(t.id)', 'count')
      .where('DATE(t.createdAt) = CURRENT_DATE')
      .groupBy('t.trainingId')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    return rows.map((r) => ({
      trainingId: r.trainingId,
      count: Number(r.count),
    }));
  }
}
