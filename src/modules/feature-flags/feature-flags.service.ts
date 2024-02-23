import { Injectable } from '@nestjs/common';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { FeatureFlagRepository } from '../../repositories/feature-flag.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';
import { FeatureFlag } from 'src/entities/feature-flag.entity';
import { Service } from 'src/entities/service.entity';

export interface FindAllFilters {
  services?: string[];
  take?: number;
  skip?: number;
}

const PAGE_SIZE = 5;

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(FeatureFlagRepository)
    private featureFlagRepository: FeatureFlagRepository,
    private dataSource: DataSource,
  ) {}

  async create(createFeatureFlagDto: CreateFeatureFlagDto) {
    const { services: serviceSlugs, ...data } = createFeatureFlagDto;
    const date = new Date().toISOString();
    let services = [];

    if (serviceSlugs) {
      //DataSource working example
      services = await this.dataSource.getRepository(Service).find({
        where: {
          slug: In(serviceSlugs),
        },
      });
    }

    return this.featureFlagRepository.save({
      ...data,
      services,
      createdAt: date,
      updatedAt: date,
    });
  }

  async findAll(filters: FindAllFilters = {}) {
    const { services, take = PAGE_SIZE, skip = 0 } = filters;
    let where = {};

    if (services) {
      where = {
        services: {
          slug: In(services),
        },
      };
    }

    const [list, count] = await this.featureFlagRepository.findAndCount({
      take,
      skip,
      select: {
        id: true,
        name: true,
        value: true,
      },
      relations: {
        services: true,
      },
      where,
    });

    return {
      list,
      count,
    };
  }

  async findOne(id: number) {
    // Query builder example
    // const result = await this.dataSource
    //   .getRepository(FeatureFlag)
    //   .createQueryBuilder('feature_flag')
    //   .leftJoinAndSelect(
    //     'feature_flag.services',
    //     'services',
    //     'services.published = true',
    //   )
    //   .where('feature_flag.id = :id', { id })
    //   .getOne();

    const result = await this.featureFlagRepository.findOne({
      where: {
        id,
      },
      relations: {
        services: true,
      },
    });

    return result;
  }

  remove(id: number) {
    return this.featureFlagRepository.delete(id);
  }

  async update(id: number, updateFeatureFlagDto: UpdateFeatureFlagDto) {
    const { services: serviceSlugs, ...newData } = updateFeatureFlagDto;
    const resultData: Partial<FeatureFlag> = { ...newData };

    //transaction example
    const result = await this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const featureFlagRepository =
          transactionalEntityManager.getRepository(FeatureFlag);

        if (serviceSlugs) {
          const currentFlag = await featureFlagRepository.findOne({
            where: { id },
            relations: { services: true },
          });

          //entity manager example
          const services = await transactionalEntityManager.find(Service, {
            where: {
              slug: In(serviceSlugs),
            },
          });

          await featureFlagRepository
            .createQueryBuilder()
            .relation(FeatureFlag, 'services')
            .of(currentFlag)
            .addAndRemove(services, currentFlag.services);
        }

        return featureFlagRepository.update(id, resultData);
      },
    );

    return result;
  }
}
