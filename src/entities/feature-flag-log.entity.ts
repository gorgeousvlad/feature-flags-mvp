import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { FeatureFlag } from './feature-flag.entity';

export enum LogEventType {
  Created = 'created',
  Updated = 'updated',
  Deleted = 'deleted',
}

@Entity()
export class FeatureFlagLog extends BaseEntity {
  @Column({ length: 100, enum: LogEventType })
  event: string;

  @Column()
  comment: string;

  @Column()
  login: string;

  @ManyToOne(() => FeatureFlag, (flag) => flag.logs)
  flag: FeatureFlag;
}
