import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileController } from './file.controller'
import { File } from './file.entity'
import { FileService } from './file.service'
import { path } from 'app-root-path'

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
