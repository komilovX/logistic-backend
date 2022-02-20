import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { File } from 'src/file/file.entity'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { CreateDocumentDto } from './dto/create-document.dto'
import { UpdateDocumentDto } from './dto/update-document.dto'
import { Document } from './entities/document.entity'

@Injectable()
export class DocumentService extends TypeOrmCrudService<Document> {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {
    super(documentRepository)
  }

  async create(dto: CreateDocumentDto, user: User): Promise<Document> {
    const document = await this.documentRepository.create(dto)
    document.creator = user
    return this.documentRepository.save(document)
  }

  async update(dto: UpdateDocumentDto, id: number): Promise<Document> {
    const { files, ...otherData } = dto
    const document = await this.documentRepository.preload({
      id,
      ...otherData,
    })
    if (!document) {
      throw new NotFoundException(`Document with id ${id} not found`)
    }
    if (files) {
      const docFiles = await Promise.all(
        files.map(async (fileId) => {
          const file = await this.fileRepository.findOne(fileId)
          if (!file) {
            throw new NotFoundException(`File with id ${fileId} not found`)
          }
          return file
        }),
      )
      document.files = docFiles
    }
    return this.documentRepository.save(document)
  }
}
