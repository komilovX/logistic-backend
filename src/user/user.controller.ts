import { Controller } from '@nestjs/common'
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
    only: ['getManyBase', 'getOneBase', 'deleteOneBase'],
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
