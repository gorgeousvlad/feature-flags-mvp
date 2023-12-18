import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeatureFlag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  value: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
