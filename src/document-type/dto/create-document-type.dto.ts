import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsString } from 'class-validator'

export class CreateDocumentTypeDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  number: string
}
