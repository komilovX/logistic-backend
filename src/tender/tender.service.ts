import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { CreateTenderDto } from './dto/create-tender.dto'
import { UpdateTenderDto } from './dto/update-tender.dto'
import { TenderPrice } from './entities/tender-price.entity'
import { Tender } from './entities/tender.entity'

@Injectable()
export class TenderService extends TypeOrmCrudService<Tender> {
  constructor(
    @InjectRepository(Tender) private tenderRepository: Repository<Tender>,
    @InjectRepository(TenderPrice)
    private tenderPriceRepository: Repository<TenderPrice>,
  ) {
    super(tenderRepository)
  }

  async create(dto: CreateTenderDto): Promise<Tender> {
    const data = await this.tenderRepository.create(dto)
    const tender = await this.tenderRepository.save(data)
    return this.tenderRepository.findOne({
      where: { id: tender.id },
      relations: ['agent'],
    })
  }

  async update(dto: UpdateTenderDto, id: number): Promise<Tender> {
    const { price, currency, ...otherData } = dto
    const tender = await this.tenderRepository.preload({
      id,
      ...otherData,
    })
    if (price) {
      const tenderPrice = await this.tenderPriceRepository.create({
        price,
        currency,
      })
      tender.tenderPrice = tenderPrice
    }
    return this.tenderRepository.save(tender)
  }
}
