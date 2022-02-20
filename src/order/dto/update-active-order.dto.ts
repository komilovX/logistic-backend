import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator'
import { CreateOrderDto } from './create-order.dto'

export class updateActiveOrder extends CreateOrderDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  containerNumber: string

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  actualDate: Date

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  nds: boolean

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string
}
