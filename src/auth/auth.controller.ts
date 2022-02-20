import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignInCredentialsDto } from './dto/signin-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
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

  @Get('me')
  me(@GetUser() user: User) {
    return { user }
  }
}
