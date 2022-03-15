import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class SignUpCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'минимальная длина - 3' })
  firstName: string

  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'минимальная длина - 3' })
  lastName: string

  @ApiProperty({
    description: 'Login',
    minimum: 4,
    maximum: 20,
  })
  @IsString()
  @MinLength(4, { message: 'минимальная длина логина - 4' })
  @MaxLength(20, { message: 'максимальная длина логина 20' })
  login: string

  @ApiProperty()
  @IsString()
  @MinLength(4, { message: 'минимальная длина пароля - 4' })
  @MaxLength(20, { message: 'максимальная длина пароля 20' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Пароль слишком слабый',
  })
  password: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: string
}

export class UpdateUserDto extends PartialType(SignUpCredentialsDto) {}