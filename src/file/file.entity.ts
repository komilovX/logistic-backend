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
  url: string

  @Column()
  name: string

  @Column({ nullable: true, type: 'varchar', length: 50 })
  mimetype: string

  @Column({ nullable: true, type: 'int' })
  size: number

  @CreateDateColumn()
  createdDate: Date

  @ManyToOne(() => Document, (document) => document.files)
  document: Document
}
