import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Consignee } from '../entities/consignee.entity'

@Injectable()
export class ConsigneeService extends TypeOrmCrudService<Consignee> {
  constructor(
    @InjectRepository(Consignee)
    private consigneeRepository: Repository<Consignee>,
  ) {
    super(consigneeRepository)
  }
}
