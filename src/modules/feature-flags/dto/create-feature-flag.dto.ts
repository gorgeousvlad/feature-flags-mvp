import { Service } from 'src/entities/service.entity';

export class CreateFeatureFlagDto {
  id: number;
  name: string;
  value: boolean;
  createdAt: Date;
  updatedAt: Date;
  services?: Service[];
}
