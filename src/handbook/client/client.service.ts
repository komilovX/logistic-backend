import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Client } from '../entities/client.entity'

@Injectable()
export class ClientService extends TypeOrmCrudService<Client> {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {
    super(clientRepository)
  }
}
