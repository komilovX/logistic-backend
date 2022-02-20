import { ApiProperty } from '@nestjsx/crud/lib/crud'
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IsUserExist } from 'src/common/decorators/is-user-exist.decorator'
import { TaskStatus } from 'src/common/enums/task-status.enum'

export class UpdateTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsUserExist({
    message: 'Executor $value not exists',
  })
  executorId: number

  @IsString()
  task: string

  @IsString()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus

  @IsDateString()
  deadline: Date

  @IsOptional()
  @IsString()
  comment: string
}
