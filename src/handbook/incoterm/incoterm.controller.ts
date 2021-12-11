import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CreateIncotermDto } from '../dto/create-incoterm.dto'
import { Incoterm } from '../entities/incoterm.entity'
import { IncotermService } from './incoterm.service'

@ApiBearerAuth()
@ApiTags('Incoterm')
@Crud({
  model: {
    type: Incoterm,
  },
  dto: {
    create: CreateIncotermDto,
    update: CreateIncotermDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('handbook/incoterm')
export class IncotermController implements CrudController<Incoterm> {
  constructor(public service: IncotermService) {}
}
