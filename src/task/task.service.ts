import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'

@Injectable()
export class TaskService extends TypeOrmCrudService<Task> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {
    super(taskRepository)
  }

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.create(dto)
    task.creator = user
    return this.taskRepository.save(task)
  }

  async update(dto: UpdateTaskDto, id: number): Promise<Task> {
    const task = await this.taskRepository.preload({
      id,
      ...dto,
    })
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return this.taskRepository.save(task)
  }
}
