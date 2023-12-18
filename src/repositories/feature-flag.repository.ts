import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FeatureFlag } from 'src/entities/feature-flag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFeatureFlagDto } from 'src/modules/feature-flags/dto/update-feature-flag.dto';

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
