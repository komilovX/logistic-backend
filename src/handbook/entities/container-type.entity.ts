import { Order } from 'src/order/order.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ContainerType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  
  @Column({ type: 'float' })
  length: number

  @Column({ type: 'float' })
  width: number

  @Column({ type: 'float' })
  height: number

  @Column({ type: 'float', nullable: true })
  volume: number
  
  @Column({ type: 'float', nullable: true })
  maxLoading: number

  @OneToMany(() => Order, (orders) => orders.containerType)
  orders: Order[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
