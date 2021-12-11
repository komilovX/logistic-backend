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
  OneToOne,
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

  @ManyToOne(() => User, (user) => user.orders)
  executor: User

  @ManyToOne(() => User, (user) => user.orders)
  creator: User

  @ManyToOne(() => Incoterm, (incoterm) => incoterm.orders)
  incoterm: Incoterm

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client

  @ManyToOne(() => Consignee, (consignee) => consignee.orders)
  consignee: Consignee

  @OneToOne(() => Tender, (tender) => tender.order)
  tender: Tender

  @CreateDateColumn()
  createdDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
