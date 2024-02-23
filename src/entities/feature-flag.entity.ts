import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
import { FeatureFlagLog } from './feature-flag-log.entity';

@Entity()
export class FeatureFlag extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ nullable: true })
  value: boolean;

  @Column({ nullable: true })
  deleted: boolean;

  // @ManyToMany((type) => Service, (service) => service.flags, { eager: true })
  @ManyToMany((type) => Service, (service) => service.featureFlags, {
    cascade: true,
  })
  @JoinTable({
    name: 'feature_flags_services',
    joinColumn: { name: 'featureFlagId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'serviceId' },
  })
  services: Service[];

  @OneToMany(() => FeatureFlagLog, (log) => log.flag)
  logs: FeatureFlagLog[];
}
