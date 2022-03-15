import { classToPlain, Exclude } from 'class-transformer'
import { Document } from 'src/document/entities/document.entity'
import { Order } from 'src/order/order.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@Unique(['login'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  login: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string

  @ManyToOne(() => Document)
  document: Document[]

  @OneToMany(() => Order, (order) => order.id)
  orders: Order[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedAt: Date;

  toJSON() {
    return classToPlain(this)
  }
}
