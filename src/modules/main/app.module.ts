import { Module } from '@nestjs/common';
import { FeatureFlagsModule } from '../feature-flags/feature-flags.module';
import { LayoutModule } from '../layout/layout.module';

@Module({
  imports: [LayoutModule, FeatureFlagsModule],
})
export class AppModule {}
