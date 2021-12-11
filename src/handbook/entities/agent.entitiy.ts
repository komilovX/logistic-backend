import { Tender } from 'src/tender/entities/tender.entity'
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
export class Agent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  companyName: string

  @Column({ nullable: true })
  personalRequisite: string

  @Column({ nullable: true })
  officalRequisite: string

  @Column({ nullable: true })
  exportFirm: string

  @Column({ nullable: true })
  weChat: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  exportCompany: string

  @OneToMany(() => Tender, (tender) => tender.agent)
  tenders: Tender[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
