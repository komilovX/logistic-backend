import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './order.entity'
import { ChangesModule } from 'src/changes/changes.module'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ChangesModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
