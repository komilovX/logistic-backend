import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User } from 'src/user/user.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { FinishTenderDto } from './dto/finish-tender.dto'
import { updateActiveOrder } from './dto/update-active-order.dto'
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
    update: CreateOrderDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    join: {
      incoterm: {
        eager: true,
        persist: ['name'],
        allow: ['id', 'name'],
      },
      client: {
        eager: true,
        persist: ['name'],
        allow: ['id', 'name'],
      },
      consignee: {
        eager: true,
        persist: ['name'],
        allow: ['id', 'name'],
      },
      executor: {
        eager: true,
        persist: ['firstName'],
        allow: ['id', 'firstName', 'lastName'],
      },
      containerType: {
        eager: true,
        persist: ['name'],
        allow: ['id', 'name'],
      },
    },
  },
})
@Controller('order')
export class OrderController implements CrudController<Order> {
  constructor(public service: OrderService) {}

  @Post()
  createOne(@Body() dto: CreateOrderDto) {
    return this.service.create(dto)
  }

  @Put('/:id')
  updateOne(@Body() dto: CreateOrderDto, @Param('id') id: number) {
    return this.service.update(dto, id)
  }

  @Put('/active/:id')
  updateActiveOrder(
    @Body() dto: updateActiveOrder,
    @Param('id') id: number,
    @GetUser() user: User,
  ) {
    console.log('user', user)
    return this.service.updateActiveOrder(dto, id, user)
  }

  @Post('finish-tender/:id')
  finishTender(@Body() dto: FinishTenderDto, @Param('id') id: number) {
    return this.service.finishTender(dto, id)
  }
}
