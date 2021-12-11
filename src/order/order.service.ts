import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'

@Injectable()
export class OrderService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {
    super(orderRepository)
  }
}
