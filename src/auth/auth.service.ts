import * as bcrypt from 'bcrypt'
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SignUpCredentialsDto, UpdateUserDto } from './dto/signup-credentials.dto'
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

  async signin(payload: Pick<User, 'login' | 'id'>) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  findUser(login: string) {
    return this.usersRepository.findOne({ login })
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const {
      role,
      password,
      ...otherData
    } = updateUserDto

    const user = await this.usersRepository.preload({
      id,
      ...otherData,
    })
    if (!user) {
      throw new NotFoundException(`User with #${id} not found`)
    }
    if (password) {
      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, user.salt)
    }
    try {
      await user.save()
    } catch (e) {
      if (+e.code === 23505) {
        throw new ConflictException('User already exist')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Pick<User, 'login' | 'id'>> {
    const user = await this.findUser(login)
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }
    return { login: user.login, id: user.id }
  }
}
