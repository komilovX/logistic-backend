import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Incoterm } from '../entities/incoterm.entity'

@Injectable()
export class IncotermService extends TypeOrmCrudService<Incoterm> {
  constructor(
    @InjectRepository(Incoterm) private icotermRepository: Repository<Incoterm>,
  ) {
    super(icotermRepository)
  }
}
