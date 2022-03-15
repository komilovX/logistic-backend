import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignInCredentialsDto } from './dto/signin-credentials.dto'
import { SignUpCredentialsDto, UpdateUserDto } from './dto/signup-credentials.dto'
import { User } from '../user/user.entity'

@ApiTags('Authorization')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(public service: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: SignUpCredentialsDto) {
    const oldUser = await this.service.findUser(dto.login)
    if (oldUser) {
      throw new BadRequestException()
    }
    return this.service.signup(dto)
  }

  @Public()
  @HttpCode(200)
  @Post('signin')
  async signin(@Body() dto: SignInCredentialsDto) {
    const payload = await this.service.validateUser(dto.login, dto.password)
    return this.service.signin(payload)
  }

  @Public()
  @HttpCode(200)
  @Put('edit/:id')
  async edituser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.service.updateUser(id, dto)
  }

  @Get('me')
  me(@GetUser() user: User) {
    return { user }
  }
}
