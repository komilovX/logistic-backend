import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsNumber } from 'class-validator'
import { IsAgentExist } from 'src/common/decorators/is-agent-exist.decorator'
import { IsOrderExist } from 'src/common/decorators/is-order-exist.decorator'

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
}
