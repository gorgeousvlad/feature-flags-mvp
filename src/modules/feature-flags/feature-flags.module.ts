import { Module } from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagsController } from './feature-flags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlag } from '../../entities/feature-flag.entity';
import { FeatureFlagRepository } from 'src/repositories/feature-flag.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([FeatureFlag]),
  ],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagRepository, FeatureFlagsService],
})
export class FeatureFlagsModule {}
