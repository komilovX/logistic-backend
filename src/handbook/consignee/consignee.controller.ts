import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CreateConsigneeDto } from '../dto/create-consignee.dto'
import { Consignee } from '../entities/consignee.entity'
import { ConsigneeService } from './consignee.service'

@ApiBearerAuth()
@ApiTags('Consignee')
@Crud({
  model: {
    type: Consignee,
  },
  dto: {
    create: CreateConsigneeDto,
    update: CreateConsigneeDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('handbook/consignee')
export class ConsigneeController implements CrudController<Consignee> {
  constructor(public service: ConsigneeService) {}
}
