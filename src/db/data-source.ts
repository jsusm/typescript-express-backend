import "reflect-metadata"
import { DataSource } from 'typeorm'
import { Session } from './entity/Session.js'
import { Lesson } from './entity/Lesson.js'
import { Student } from './entity/Student.js'
import { Payment } from "./entity/Payment.js"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: 'jsus',
  password: "password123",
  database: "studentms",
  synchronize: false,
  logging: ['query', 'error'],
  entities: [Lesson, Student, Session, Payment],
  migrations: ['src/db/migrations/*.js'],
  subscribers: [],
})

