import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Tender } from './entities/tender.entity'

@Injectable()
export class TenderService extends TypeOrmCrudService<Tender> {
  constructor(
    @InjectRepository(Tender) private tenderRepository: Repository<Tender>,
  ) {
    super(tenderRepository)
  }
}
