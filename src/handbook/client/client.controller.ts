import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CreateClientDto } from '../dto/create-client.dto'
import { Client } from '../entities/client.entity'
import { ClientService } from './client.service'

@ApiBearerAuth()
@ApiTags('Clients')
@Crud({
  model: {
    type: Client,
  },
  dto: {
    create: CreateClientDto,
    update: CreateClientDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('handbook/client')
export class ClientController implements CrudController<Client> {
  constructor(public service: ClientService) {}
}
