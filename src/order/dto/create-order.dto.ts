import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { Type } from 'class-transformer'
import {
  IsString,
  IsIn,
  IsNumber,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator'
import { IsClientExist } from 'src/common/decorators/is-client-exist.decorator'
import { IsConsigneeExist } from 'src/common/decorators/is-consignee-exist.decorator'
import { IsIncotermExist } from 'src/common/decorators/is-incoterm-exist.decorator'
import { IsUserExist } from 'src/common/decorators/is-user-exist.decorator'
import { ProductType } from 'src/common/enums/product-type.enum'

export class CreateOrderDto {
  @ApiProperty()
  @IsDateString()
  loadingDate: Date

  @ApiProperty()
  @IsString()
  loadingAddress: string

  @ApiProperty()
  @IsString()
  product: string

  @ApiProperty({ enum: ProductType })
  @IsString()
  @IsIn([ProductType.SAFE, ProductType.UNSAFE])
  productType: ProductType

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  weight: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  volume: number

  @ApiProperty()
  @IsString()
  pointDestination: string

  @ApiProperty()
  @IsNumber()
  @IsUserExist({
    message: 'Executor $value not exists',
  })
  executorId: number

  @ApiProperty()
  @IsIncotermExist({
    message: 'Incoterm $value not exists',
  })
  incotermId: number

  @ApiProperty()
  @IsNumber()
  @IsClientExist({
    message: 'Client $value not exists',
  })
  clientId: number

  @ApiProperty()
  @IsNumber()
  @IsConsigneeExist({
    message: 'Consignee $value not exists',
  })
  consigneeId: number
}
