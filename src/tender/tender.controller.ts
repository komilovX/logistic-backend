import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CreateTenderDto } from './dto/create-tender.dto'
import { UpdateTenderDto } from './dto/update-tender.dto'
import { Tender } from './entities/tender.entity'
import { TenderService } from './tender.service'
@ApiBearerAuth()
@ApiTags('Tender')
@Crud({
  model: {
    type: Tender,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase'],
  },
  query: {
    join: {
      agent: {
        eager: true,
        persist: ['name'],
        allow: ['id', 'name'],
      },
      tenderPrice: {
        eager: true,
        persist: ['price', 'currency'],
        allow: ['id', 'price', 'currency'],
      },
    },
  },
})
@Controller('tender')
export class TenderController implements CrudController<Tender> {
  constructor(public service: TenderService) {}

  @Post()
  createOne(@Body() dto: CreateTenderDto) {
    return this.service.create(dto)
  }

  @Put('/:id')
  updateOne(@Body() dto: UpdateTenderDto, @Param('id') id: string) {
    return this.service.update(dto, +id)
  }
}
