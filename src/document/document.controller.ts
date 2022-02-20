import { Controller, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User } from 'src/user/user.entity'
import { DocumentService } from './document.service'
import { CreateDocumentDto } from './dto/create-document.dto'
import { UpdateDocumentDto } from './dto/update-document.dto'
import { Document } from './entities/document.entity'

@ApiBearerAuth()
@ApiTags('Documents')
@Crud({
  model: {
    type: Document,
  },
  dto: {
    create: CreateDocumentDto,
    update: UpdateDocumentDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase'],
  },
})
@Controller('document')
export class DocumentController implements CrudController<Document> {
  constructor(public service: DocumentService) {}

  @Post()
  async create(
    dto: CreateDocumentDto,
    @GetUser() user: User,
  ): Promise<Document> {
    return this.service.create(dto, user)
  }

  @Put('/:id')
  async update(
    dto: UpdateDocumentDto,
    @Param('id') id: number,
  ): Promise<Document> {
    return this.service.update(dto, id)
  }
}
