import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { OrderStatus } from 'src/common/enums/order-status.enum'
import { Tender } from 'src/tender/entities/tender.entity'
import { getRepository, Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { FinishTenderDto } from './dto/finish-tender.dto'
import { Order } from './order.entity'

@Injectable()
export class OrderService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {
    super(orderRepository)
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create(dto)
    return this.orderRepository.save(order)
  }

  async update(dto: CreateOrderDto, id: number): Promise<Order> {
    const order = await this.orderRepository.preload({
      id,
      ...dto,
    })
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`)
    }
    return this.orderRepository.save(order)
  }

  async finishTender(dto: FinishTenderDto, id: number): Promise<Order> {
    const foundTender = await getRepository(Tender).preload({
      id: dto.tenderId,
      isCurrent: true,
    })
    if (!foundTender) {
      throw new NotFoundException(`Tender with id ${dto.tenderId} not found`)
    }
    await getRepository(Tender).save(foundTender)

    const order = await this.orderRepository.preload({
      id,
      status: OrderStatus.ACTIVE,
    })
    return this.orderRepository.save(order)
  }
}
