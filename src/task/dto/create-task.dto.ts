import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'
import { IsUserExist } from 'src/common/decorators/is-user-exist.decorator'

export class CreateTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsUserExist({
    message: 'Executor $value not exists',
  })
  executorId: number

  @IsString()
  task: string

  @IsDateString()
  deadline: Date

  @IsOptional()
  @IsString()
  comment: string
}
