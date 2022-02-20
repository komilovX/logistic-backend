import { classToPlain, Exclude } from 'class-transformer'
import { Changes } from 'src/changes/changes.entity'
import { OrderStatus } from 'src/common/enums/order-status.enum'
import { ProductType } from 'src/common/enums/product-type.enum'
import { Client } from 'src/handbook/entities/client.entity'
import { Consignee } from 'src/handbook/entities/consignee.entity'
import { Incoterm } from 'src/handbook/entities/incoterm.entity'
import { Tender } from 'src/tender/entities/tender.entity'
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

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: true })
  actualDate: Date

  @Column()
  loadingDate: Date

  @Column()
  loadingAddress: string

  @Column({ nullable: true })
  nds: boolean

  @Column({ type: 'varchar', length: 255 })
  product: string

  @Column({ type: 'varchar', length: 30, default: ProductType.SAFE })
  productType: ProductType

  @Column({ type: 'float' })
  weight: number

  @Column({ type: 'float' })
  volume: number

  @Column({ type: 'varchar', length: 255 })
  pointDestination: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  containerNumber: string

  @Column({ type: 'varchar', length: 25, default: OrderStatus.NEW })
  status: OrderStatus

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  executor: User

  @Column({})
  executorId: number

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  creator: User

  // TODO need remove
  @Column({ nullable: true })
  creatorId: number

  @ManyToOne(() => Incoterm, (incoterm) => incoterm.orders, { eager: true })
  incoterm: Incoterm

  @Column({})
  incotermId: number

  @ManyToOne(() => Client, (client) => client.orders, { eager: true })
  client: Client

  @Column({})
  @Exclude({ toPlainOnly: true })
  clientId: number

  @ManyToOne(() => Consignee, (consignee) => consignee.orders, { eager: true })
  consignee: Consignee

  @Column({})
  consigneeId: number

  @OneToMany(() => Tender, (tender) => tender.order)
  tender: Tender[]

  @OneToMany(() => Changes, (changes) => changes.order)
  changes: Changes[]

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
