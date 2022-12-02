import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { Routes } from './routes.js';
import { AppDataSource } from "./data-source.js";

AppDataSource.initialize().then(async () => {
  const app = express()
  app.use(bodyParser.json())

  loadRoutes(app)

  app.listen(3000, () => console.log('Listen on port 3000'))
})

// register express routes from defined application routes
function loadRoutes(app: ReturnType<typeof express>) {
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new route.controller as any)[route.action](req, res, next)
      if(result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined )
      }else if(result !== null && result !== undefined) {
        res.json(result)
      }
    })
  })
}
