import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Agent } from '../entities/agent.entitiy'

@Injectable()
export class AgentService extends TypeOrmCrudService<Agent> {
  constructor(
    @InjectRepository(Agent) private agentRepository: Repository<Agent>,
  ) {
    super(agentRepository)
  }
}
