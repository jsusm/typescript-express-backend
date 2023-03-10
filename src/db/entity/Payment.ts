import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  reference!: string

  @Column('timestamptz')
  at!: Date
}
