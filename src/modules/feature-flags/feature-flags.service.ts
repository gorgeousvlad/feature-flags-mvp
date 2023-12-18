import { Injectable } from '@nestjs/common';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { FeatureFlagRepository } from 'src/repositories/feature-flag.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(FeatureFlagRepository)
    private featureFlagRepository: FeatureFlagRepository,
  ) {}

  async create(createFeatureFlagDto: CreateFeatureFlagDto) {
    const date = new Date().toISOString();

    return this.featureFlagRepository.save({
      ...createFeatureFlagDto,
      createdAt: date,
      updatedAt: date,
    });
  }

  findAll() {
    return this.featureFlagRepository.find();
  }

  async findOne(id: number) {
    const result = await this.featureFlagRepository.findOneBy({ id });

    return result;
  }

  remove(id: number) {
    return this.featureFlagRepository.delete(id);
  }

  async update(id: number, updateFeatureFlagDto: UpdateFeatureFlagDto) {
    return this.featureFlagRepository.update(id, updateFeatureFlagDto);
  }
}
