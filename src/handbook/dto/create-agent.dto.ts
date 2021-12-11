import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsOptional, IsString } from 'class-validator'

export class CreateAgentDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  companyName: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  personalRequisite: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  officalRequisite: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  exportFirm: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  weChat: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  exportCompany: string
}
