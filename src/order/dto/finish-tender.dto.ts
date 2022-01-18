import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsNumber } from 'class-validator'

export class FinishTenderDto {
  @ApiProperty()
  @IsNumber()
  tenderId: number
}
