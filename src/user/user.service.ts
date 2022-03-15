import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository)
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with #id ${id} not found`)
    }
    return this.usersRepository.softRemove(user)
  }
}
