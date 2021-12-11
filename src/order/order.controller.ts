import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './order.entity'
import { OrderService } from './order.service'

@ApiBearerAuth()
@ApiTags('Order')
@Crud({
  model: {
    type: Order,
  },
  dto: {
    create: CreateOrderDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'createOneBase'],
  },
})
@Controller('order')
export class OrderController implements CrudController<Order> {
  constructor(public service: OrderService) {}
}
