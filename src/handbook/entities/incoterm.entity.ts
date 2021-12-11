import { ApiProperty } from '@nestjs/swagger'
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
export class Incoterm extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column({ default: 'any' })
  type: 'any' | 'sea'

  @ApiProperty()
  @Column({ nullable: true })
  info: string

  @OneToMany(() => Order, (order) => order.incoterm)
  orders: Order[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
