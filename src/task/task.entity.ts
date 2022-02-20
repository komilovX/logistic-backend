import { User } from 'src/user/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TaskStatus } from 'src/common/enums/task-status.enum'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  executor: User

  @Column()
  executorId: number

  @ManyToOne(() => User, (user) => user.id)
  creator: User

  @Column()
  creatorId: number

  @Column('enum', {
    enum: [
      TaskStatus.ACCEPTED,
      TaskStatus.CANCELED,
      TaskStatus.DONE,
      TaskStatus.IN_PROCESS,
      TaskStatus.OPEN,
    ],
  })
  status: TaskStatus

  @Column()
  task: string

  @Column({ nullable: true, type: 'varchar', length: 255 })
  comment: string

  @Column('time with time zone')
  deadline: Date

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
