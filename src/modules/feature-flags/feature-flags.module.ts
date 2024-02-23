import { Module } from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagsController } from './feature-flags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlag } from '../../entities/feature-flag.entity';
import { FeatureFlagRepository } from 'src/repositories/feature-flag.repository';
import { Service } from 'src/entities/service.entity';
import { FeatureFlagLog } from 'src/entities/feature-flag-log.entity';
import { ServicesModule } from './services/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([FeatureFlag, Service, FeatureFlagLog]),
    ServicesModule,
  ],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagRepository, FeatureFlagsService],
})
export class FeatureFlagsModule {}
