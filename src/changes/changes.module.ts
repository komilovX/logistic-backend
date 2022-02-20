import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/order/order.entity'
import { User } from 'src/user/user.entity'
import { ChangesController } from './changes.controller'
import { Changes } from './changes.entity'
import { ChangesService } from './changes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Changes, Order, User])],
  controllers: [ChangesController],
  providers: [ChangesService],
  exports: [ChangesService],
})
export class ChangesModule {}
