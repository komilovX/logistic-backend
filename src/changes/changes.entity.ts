import { Order } from 'src/order/order.entity'
import { User } from 'src/user/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({
  orderBy: {
    createdDate: 'DESC',
  },
})
export class Changes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'jsonb' })
  oldData: Order

  @Column({ type: 'jsonb' })
  newData: Order

  @ManyToOne(() => Order, (order) => order.changes)
  order: Order

  @Column()
  orderId: number

  @ManyToOne(() => User, (user) => user.id)
  changer: User

  @Column()
  changerId: number

  @Column({ nullable: true, type: 'varchar', length: 500 })
  comment: string

  @CreateDateColumn()
  createdDate: Date
}
