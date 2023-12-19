import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateFeatureFlagDto } from '../modules/feature-flags/dto/update-feature-flag.dto';
import { FeatureFlag } from '../entities/feature-flag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeatureFlagRepository extends Repository<FeatureFlag> {
  constructor(
    @InjectRepository(FeatureFlag)
    private readonly featureFlagRepository: Repository<FeatureFlag>,
  ) {
    super(
      featureFlagRepository.target,
      featureFlagRepository.manager,
      featureFlagRepository.queryRunner,
    );
  }

  async update(id: number, updateFeatureFlagDto: UpdateFeatureFlagDto) {
    const featureFlag = await this.featureFlagRepository.findOneBy({ id });

    return this.featureFlagRepository.update(id, {
      ...featureFlag,
      ...updateFeatureFlagDto,
      updatedAt: new Date().toISOString(),
    });
  }
}
