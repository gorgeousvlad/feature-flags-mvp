import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '../../../../entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.create(createServiceDto);
  }

  findAll() {
    // const builder = this.serviceRepository.createQueryBuilder
    return this.serviceRepository.find({
      select: {
        title: true,
        slug: true,
        published: true,
      },
    });
  }

  findOne(id: number) {
    return this.serviceRepository.findOneBy({ id });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepository.update(+id, updateServiceDto);
  }

  // remove(id: number) {
  //   return this.serviceRepository.remove([{ id }]);
  // }
}
