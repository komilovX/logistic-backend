import { TenderStatus } from 'src/common/enums/tender-status.enum'
import { Agent } from 'src/handbook/entities/agent.entitiy'
import { Order } from 'src/order/order.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TenderPrice } from './tender-price.entity'

@Entity()
export class Tender extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  ed: Date

  @Column({ type: 'varchar', default: TenderStatus.PENDING, length: 15 })
  status: TenderStatus

  @Column({ nullable: true, type: 'varchar', length: 255 })
  sendStation: string

  @Column({ nullable: true, type: 'varchar', length: 255 })
  comment: string

  @OneToOne(() => TenderPrice, (price) => price.tender)
  price: TenderPrice

  @OneToOne(() => Order, (order) => order.tender)
  order: Order

  @ManyToOne(() => Agent, (agent) => agent.tenders)
  agent: Agent

  @CreateDateColumn()
  createdDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
