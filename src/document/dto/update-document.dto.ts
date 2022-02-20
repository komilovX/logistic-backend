import { ApiProperty } from '@nestjsx/crud/lib/crud'
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IsDocumentTypeExist } from 'src/common/decorators/is-document-type-exist.decorator'
import { IsUserExist } from 'src/common/decorators/is-user-exist.decorator'
import { TaskStatus } from 'src/common/enums/task-status.enum'

export class UpdateDocumentDto {
  @ApiProperty()
  @IsNumber()
  @IsUserExist({
    message: 'Executor $value not exists',
  })
  executorId: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsDocumentTypeExist({
    message: 'DocumentType $value not exists',
  })
  documentTypeId: number

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  deadline: Date

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  files: number[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string
}
