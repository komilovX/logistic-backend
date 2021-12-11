import { Currency } from 'src/common/enums/currency.enum'
import { Tender } from 'src/tender/entities/tender.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class TenderPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'float' })
  price: number

  @Column({ type: 'varchar', length: 6 })
  currency: Currency

  @OneToOne(() => Tender, (tender) => tender.price)
  tender: Tender

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
