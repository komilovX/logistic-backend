import { DocumentType } from 'src/document-type/document-type.entity'
import { User } from 'src/user/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { File } from 'src/file/file.entity'
import { TaskStatus } from 'src/common/enums/task-status.enum'
import { Order } from 'src/order/order.entity'

@Entity()
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => DocumentType, (documentType) => documentType.document)
  documentType: DocumentType

  @Column()
  documentTypeId: number

  @ManyToOne(() => User, (user) => user.id)
  executor: User

  @Column()
  executorId: number

  @ManyToOne(() => Order, (order) => order.documents)
  order: Order

  @Column()
  orderId: number

  @ManyToOne(() => User, (user) => user.id)
  creator: User

  @OneToMany(() => File, (file) => file.document, { cascade: true })
  files: File[]

  @Column('enum', {
    enum: [
      TaskStatus.ACCEPTED,
      TaskStatus.CANCELED,
      TaskStatus.DONE,
      TaskStatus.IN_PROCESS,
      TaskStatus.OPEN,
    ],
    default: TaskStatus.OPEN
  })
  status: TaskStatus

  @Column()
  deadline: Date

  @Column({ nullable: true, type: 'varchar', length: 255 })
  comment: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date
}
