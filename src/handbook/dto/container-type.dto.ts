import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateContainerTypeDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  length: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  width: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  height: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  volume: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  maxLoading: number
}
