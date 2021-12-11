import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsString } from 'class-validator'

enum IncotermEnum {
  ANY = 'ANY',
  SEA = 'SEA',
}
export class CreateIncotermDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ enum: IncotermEnum })
  @IsString()
  type: IncotermEnum

  @ApiProperty()
  @IsString()
  info: string
}
