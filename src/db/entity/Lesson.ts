import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Session } from './Session.js'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column('time without time zone')
  startTime!: string

  @Column('time without time zone')
  endTime!: string

  @Column()
  price!: number

  @Column({ default: false })
  active!: boolean

  @OneToMany(() => Session, (session) => session.lesson)
  sessions!: Session[]
}
