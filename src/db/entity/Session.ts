import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Lesson } from "./Lesson.js"
import { Student } from "./Student.js"
import { Payment } from './Payment.js'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column('timestamptz')
  date: Date

  @Column()
  attended: boolean

  @ManyToOne(() => Lesson, (lesson) => lesson.sessions)
  lesson: Lesson

  @ManyToOne(() => Student, (student) => student.sessions)
  student: Student

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment
}
