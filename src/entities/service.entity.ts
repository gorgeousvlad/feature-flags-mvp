import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { FeatureFlag } from './feature-flag.entity';

@Entity()
export class Service extends BaseEntity {
  @Column({ length: 100, unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  published: true;

  @ManyToMany((type) => FeatureFlag, (featureFlag) => featureFlag.services)
  featureFlags: FeatureFlag[];
}
