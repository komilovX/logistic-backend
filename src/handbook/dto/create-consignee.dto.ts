import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsOptional, IsString } from 'class-validator'

export class CreateConsigneeDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string
}
