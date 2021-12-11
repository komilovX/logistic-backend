import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CreateAgentDto } from '../dto/create-agent.dto'
import { Agent } from '../entities/agent.entitiy'
import { AgentService } from './agent.service'

@ApiBearerAuth()
@ApiTags('Agents')
@Crud({
  model: {
    type: Agent,
  },
  dto: {
    create: CreateAgentDto,
    update: CreateAgentDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('handbook/agent')
export class AgentController implements CrudController<Agent> {
  constructor(public service: AgentService) {}
}
