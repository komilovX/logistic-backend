import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { TaskStatus } from 'src/common/enums/task-status.enum'
import { File } from 'src/file/file.entity'
import { User } from 'src/user/user.entity'
import { getRepository, Repository } from 'typeorm'
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
    const savedDocument = await this.documentRepository.save(document)
    return this.findOneWithRelation(savedDocument.id)
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
    await this.documentRepository.save(document)
    return this.findOneWithRelation(id)
  }

  async deleteDocument(id: number) {
    const document = await this.documentRepository.findOne(id)
    if (!document) {
      throw new NotFoundException(`Document with #id ${id} not found`)
    }
    return this.documentRepository.softRemove(document)
  }

  async findOneWithRelation(id: number) {
    const document = await this.documentRepository.findOne(id)
    if (!document) {
      throw new NotFoundException(`Document with #id ${id} not found`)
    }
    return this.documentRepository.findOne({
      where: { id },
      relations: ['order', 'documentType', 'executor', 'files']
    })
  }

  async findDocumnetsCountWithStatus() {
    const qb = await getRepository(Document).createQueryBuilder("document");
    const OPEN = await qb
      .select('COUNT(*)', TaskStatus.OPEN)
      .where(`document.status = :status`, { status: TaskStatus.OPEN})
      .getRawOne()
    const IN_PROCESS = await qb
      .select('COUNT(*)', TaskStatus.IN_PROCESS)
      .where(`document.status = :status`, { status: TaskStatus.IN_PROCESS})
      .getRawOne()
    const DONE = await qb
      .select('COUNT(*)', TaskStatus.DONE)
      .where(`document.status = :status`, { status: TaskStatus.DONE})
      .getRawOne()
    const CANCELED = await qb
      .select('COUNT(*)', TaskStatus.CANCELED)
      .where(`document.status = :status`, { status: TaskStatus.CANCELED})
      .getRawOne()
    const ACCEPTED = await qb
      .select('COUNT(*)', TaskStatus.ACCEPTED)
      .where(`document.status = :status`, { status: TaskStatus.ACCEPTED})
      .getRawOne()

    return {
      ...OPEN,
      ...IN_PROCESS,
      ...DONE,
      ...CANCELED,
      ...ACCEPTED
    }
  }
}
