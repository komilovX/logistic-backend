import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { Tender } from './entities/tender.entity'
import { TenderService } from './tender.service'
@ApiBearerAuth()
@ApiTags('Tender')
@Crud({
  model: {
    type: Tender,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('tender')
export class TenderController implements CrudController<Tender> {
  constructor(public service: TenderService) {}
}
