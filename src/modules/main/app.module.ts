import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlagsModule } from '../feature-flags/feature-flags.module';
import { LayoutModule } from '../layout/layout.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    LayoutModule,
    FeatureFlagsModule,
  ],
})
export class AppModule {}
