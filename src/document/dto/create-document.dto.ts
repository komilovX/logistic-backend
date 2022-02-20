import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'
import { IsDocumentTypeExist } from 'src/common/decorators/is-document-type-exist.decorator'
import { IsUserExist } from 'src/common/decorators/is-user-exist.decorator'

export class CreateDocumentDto {
  @ApiProperty()
  @IsNumber()
  @IsUserExist({
    message: 'Executor $value not exists',
  })
  executorId: number

  @ApiProperty()
  @IsNumber()
  @IsDocumentTypeExist({
    message: 'DocumentType $value not exists',
  })
  documentTypeId: number

  @ApiProperty()
  @IsDateString()
  deadline: Date

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string
}
