import { DocumentType } from 'src/document-type/document-type.entity'
import { User } from 'src/user/user.entity'
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { File } from './file.entity'

@Entity()
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => DocumentType, (documentType) => documentType.document)
  documentType: DocumentType

  @ManyToOne(() => User, (user) => user.id)
  executor: User

  @ManyToOne(() => User, (user) => user.id)
  creator: User

  @OneToMany(() => File, (file) => file.document)
  files: File[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
