import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User } from 'src/user/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'
import { TaskService } from './task.service'

@ApiBearerAuth()
@ApiTags('Tasks')
@Crud({
  model: {
    type: Task,
  },
  dto: {
    create: CreateTaskDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase'],
  },
})
@Controller('task')
export class TaskController implements CrudController<Task> {
  constructor(public service: TaskService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto, @GetUser() user: User) {
    return this.service.create(dto, user)
  }

  @Put('/:id')
  async update(@Body() dto: UpdateTaskDto, @Param('id') id: number) {
    return this.service.update(dto, id)
  }
}
