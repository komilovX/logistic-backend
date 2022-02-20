import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { ChangesService } from 'src/changes/changes.service'
import { OrderStatus } from 'src/common/enums/order-status.enum'
import { Client } from 'src/handbook/entities/client.entity'
import { Consignee } from 'src/handbook/entities/consignee.entity'
import { Incoterm } from 'src/handbook/entities/incoterm.entity'
import { Tender } from 'src/tender/entities/tender.entity'
import { User } from 'src/user/user.entity'
import { getRepository, Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { FinishTenderDto } from './dto/finish-tender.dto'
import { updateActiveOrder } from './dto/update-active-order.dto'
import { Order } from './order.entity'

@Injectable()
export class OrderService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private changesService: ChangesService,
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

  async updateActiveOrder(
    dto: updateActiveOrder,
    id: number,
    user: User,
  ): Promise<Order> {
    const {
      comment,
      incotermId,
      clientId,
      executorId,
      consigneeId,
      ...otherData
    } = dto

    const oldOrder = await this.orderRepository.findOne(id)
    if (!oldOrder) {
      throw new NotFoundException(`Order with id ${id} not found`)
    }
    const newOrder = await this.orderRepository.preload({
      id,
      ...otherData,
    })

    if (incotermId) {
      const incoterm = await getRepository(Incoterm).findOne(incotermId)
      newOrder.incoterm = incoterm
      newOrder.incotermId = incotermId
    }
    if (clientId) {
      const client = await getRepository(Client).findOne(clientId)
      newOrder.client = client
      newOrder.clientId = clientId
    }
    if (executorId) {
      const executor = await getRepository(User).findOne(executorId)
      newOrder.executor = executor
      newOrder.executorId = executorId
    }
    if (consigneeId) {
      const consignee = await getRepository(Consignee).findOne(consigneeId)
      newOrder.consignee = consignee
      newOrder.consigneeId = consigneeId
    }

    await this.changesService.create(
      {
        oldData: oldOrder,
        newData: newOrder,
        orderId: id,
        comment,
      },
      user,
    )
    return this.orderRepository.save(newOrder)
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
