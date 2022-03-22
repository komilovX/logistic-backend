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
import { TransporationType } from 'src/common/enums/transporation-type.enum'

export class CreateOrderDto {
  @ApiProperty()
  @IsDateString()
  loadingDate: Date

  @ApiProperty()
  @IsString()
  loadingAddress: string

  @ApiProperty()
  @IsString()
  shippingAddress: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([
    TransporationType.CONTAINER, 
    TransporationType.AVIA, 
    TransporationType.AUTO, 
    TransporationType.TRAIN
  ])
  transporationType: TransporationType

  @ApiProperty()
  @IsString()
  product: string

  @ApiProperty({ enum: ProductType })
  @IsString()
  @IsIn([ProductType.SAFE, ProductType.UNSAFE])
  productType: ProductType

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight: number

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  volume: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  containerType: string

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  containerCount: number

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
