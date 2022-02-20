import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { Changes } from './changes.entity'
import { ChangesService } from './changes.service'
import { CreateChangesDto } from './dto/create-changes.dto'

@ApiBearerAuth()
@ApiTags('Changes')
@Crud({
  model: {
    type: Changes,
  },
  dto: {
    create: CreateChangesDto,
    // update: CreateOrderDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    join: {
      order: {
        persist: ['id'],
      },
      changer: {
        persist: ['id'],
      },
    },
  },
})
@Controller('changes')
export class ChangesController implements CrudController<Changes> {
  constructor(public service: ChangesService) {}
}
