import { Module } from '@nestjs/common'
import { TenderService } from './tender.service'
import { TenderController } from './tender.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tender } from './entities/tender.entity'
import { TenderPrice } from './entities/tender-price.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tender, TenderPrice])],
  providers: [TenderService],
  controllers: [TenderController],
})
export class TenderModule {}
