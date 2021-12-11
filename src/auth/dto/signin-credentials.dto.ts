import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsString } from 'class-validator'

export class SignInCredentialsDto {
  @ApiProperty()
  @IsString()
  login: string

  @ApiProperty()
  @IsString()
  password: string
}
