import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsDate, IsString, IsIn, IsNumber } from 'class-validator'
import { IsClientExist } from 'src/common/decorators/is-client-exist.decorator'
import { IsConsigneeExist } from 'src/common/decorators/is-consignee-exist.decorator'
import { IsIncotermExist } from 'src/common/decorators/is-incoterm-exist.decorator'
import { IsUserExist } from 'src/common/decorators/is-user-exist.decorator'
import { ProductType } from 'src/common/enums/product-type.enum'

export class CreateOrderDto {
  @ApiProperty()
  @IsDate()
  loadingDate: Date

  @ApiProperty()
  @IsString()
  product: string

  @ApiProperty({ enum: ProductType })
  @IsString()
  @IsIn([ProductType.SAFE, ProductType.UNSAFE])
  productType: string

  @ApiProperty()
  @IsNumber()
  weight: number

  @ApiProperty()
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
  @IsNumber()
  @IsUserExist({
    message: 'Creator $value not exists',
  })
  creatorId: number

  @ApiProperty()
  @IsNumber()
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
