import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { Changes } from './changes.entity'
import { CreateChangesDto } from './dto/create-changes.dto'

@Injectable()
export class ChangesService extends TypeOrmCrudService<Changes> {
  constructor(
    @InjectRepository(Changes) private changesRepository: Repository<Changes>,
  ) {
    super(changesRepository)
  }

  async create(dto: CreateChangesDto, user: User): Promise<Changes> {
    const change = this.changesRepository.create({
      ...dto,
      changerId: user.id,
    })
    return this.changesRepository.save(change)
  }

  async update(dto: CreateChangesDto, id: number): Promise<Changes> {
    const change = await this.changesRepository.preload({
      id,
      ...dto,
    })
    if (!change) {
      throw new Error('Change not found')
    }
    return this.changesRepository.save(change)
  }
}
