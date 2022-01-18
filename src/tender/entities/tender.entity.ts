import { classToPlain, Exclude } from 'class-transformer'
import { TenderStatus } from 'src/common/enums/tender-status.enum'
import { Agent } from 'src/handbook/entities/agent.entitiy'
import { Order } from 'src/order/order.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ default: false })
  isCurrent: boolean

  @OneToOne(() => TenderPrice, (price) => price.tender, { cascade: true })
  @JoinColumn()
  tenderPrice: TenderPrice

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  tenderPriceId: number

  @ManyToOne(() => Order, (order) => order.tender)
  order: Order

  @Column({})
  orderId: number

  @ManyToOne(() => Agent, (agent) => agent.tenders, { eager: true })
  agent: Agent

  @Column({})
  @Exclude({ toPlainOnly: true })
  agentId: number

  @CreateDateColumn()
  createdDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  toJSON() {
    return classToPlain(this)
  }
}
