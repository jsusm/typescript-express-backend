import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Session } from './Session.js'

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  lastName!: string

  @Column({ length: 30 })
  contactNumber!: string

  @Column('date')
  bornDate!: Date

  @Column()
  studyLevel!: string

  @OneToMany(() => Session, (session) => session.student)
  sessions!: Session[]
}
