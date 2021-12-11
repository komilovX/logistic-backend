import { Document } from 'src/document/entities/document.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  file: string

  @CreateDateColumn()
  createdDate: Date

  @ManyToOne(() => Document, (document) => document.files)
  document: Document
}
