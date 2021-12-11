import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { DocumentType } from './document-type.entity'
import { DocumentTypeService } from './document-type.service'
import { CreateDocumentTypeDto } from './dto/create-document-type.dto'

@ApiBearerAuth()
@ApiTags('Document-Types')
@Crud({
  model: {
    type: DocumentType,
  },
  dto: {
    create: CreateDocumentTypeDto,
    update: CreateDocumentTypeDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('document-type')
export class DocumentTypeController implements CrudController<DocumentType> {
  constructor(public service: DocumentTypeService) {}
}
