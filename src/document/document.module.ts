import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'
import { Document } from './entities/document.entity'
import { File } from './entities/file.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Document, File])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
