import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsObject, IsOptional } from 'class-validator'
import { IsOrderExist } from 'src/common/decorators/is-order-exist.decorator'

export class CreateChangesDto {
  @ApiProperty()
  @IsOrderExist({
    message: 'Order $value not exists',
  })
  orderId: number

  @ApiProperty()
  @IsObject()
  oldData: any

  @ApiProperty()
  @IsObject()
  newData: any

  @ApiProperty()
  @IsOptional()
  comment: string
}
