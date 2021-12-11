import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsOptional, IsString } from 'class-validator'

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string
}
