import { Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { User } from './user.entity'
import { UserService } from './user.service'

@ApiBearerAuth()
@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @HttpCode(200)
  @Delete('/:id')
  async edituser(@Param('id') id: number) {
    return this.service.deleteUser(id)
  }
}
