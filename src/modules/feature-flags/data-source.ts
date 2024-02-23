import { DataSource, DataSourceOptions } from 'typeorm';
import { FeatureFlag } from '../../entities/feature-flag.entity';
import { Service } from '../../entities/service.entity';
import { FeatureFlagLog } from '../../entities/feature-flag-log.entity';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
};

export default new DataSource({
  ...dbConfig,
  entities: [FeatureFlag, Service, FeatureFlagLog],
  migrations: ['src/modules/feature-flags/migrations/**/*.ts'],
});
