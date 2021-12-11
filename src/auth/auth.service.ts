import * as bcrypt from 'bcrypt'
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { User } from '../user/user.entity'
import {
  ALREADY_REGISTERED_ERROR,
  USER_NOT_FOUND_ERROR,
} from './auth.constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpCredentialsDto) {
    const user = new User()
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.login = dto.login
    user.salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(dto.password, user.salt)
    try {
      await user.save()
    } catch (e) {
      if (+e.code === 23505) {
        throw new ConflictException(ALREADY_REGISTERED_ERROR)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async signin(login: string) {
    const payload = { login }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  findUser(login: string) {
    return this.usersRepository.findOne({ login })
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Pick<User, 'login'>> {
    const user = await this.findUser(login)
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }
    return { login: user.login }
  }
}
