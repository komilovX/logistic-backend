import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { DocumentType } from './document-type.entity'

@Injectable()
export class DocumentTypeService extends TypeOrmCrudService<DocumentType> {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {
    super(documentTypeRepository)
  }
}
