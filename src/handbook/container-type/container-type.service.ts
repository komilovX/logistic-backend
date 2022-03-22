import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ContainerType } from '../entities/container-type.entity';

@Injectable()
export class ContainerTypeService extends TypeOrmCrudService<ContainerType> {
    constructor(
      @InjectRepository(ContainerType) private containerTypeRepository: Repository<ContainerType>
    ) {
      super(containerTypeRepository)
    }
  }
