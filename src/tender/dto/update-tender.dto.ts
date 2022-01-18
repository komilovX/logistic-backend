import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IsAgentExist } from 'src/common/decorators/is-agent-exist.decorator'
import { IsOrderExist } from 'src/common/decorators/is-order-exist.decorator'
import { Currency } from 'src/common/enums/currency.enum'
import { TenderStatus } from 'src/common/enums/tender-status.enum'

export class UpdateTenderDto {
  @ApiProperty()
  @IsNumber()
  @IsOrderExist({
    message: 'Order $value not exists',
  })
  orderId: number

  @ApiProperty()
  @IsNumber()
  @IsAgentExist({
    message: 'Agent $value not exists',
  })
  agentId: number

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  ed: Date

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([TenderStatus.REPLIED, TenderStatus.PENDING])
  status: TenderStatus

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([Currency.USD, Currency.CNY, Currency.UZS])
  currency: Currency

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  sendStation: string
}
