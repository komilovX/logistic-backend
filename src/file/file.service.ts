import { Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { File } from './file.entity'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async saveFile(files: Express.Multer.File[]): Promise<File[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd')
    const uploadFolder = `${path}/uploada/${dateFolder}`
    await ensureDir(uploadFolder)
    const res: File[] = []
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
      const newFile = await this.fileRepository
        .create({
          url: `${uploadFolder}/${file.originalname}`,
          name: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        })
        .save()
      res.push(newFile)
    }
    return res
  }
}
