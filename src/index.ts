import express, {Request, Response} from 'express'
import { AppRoutes } from './routes.js';
import { AppDataSource } from "./data-source.js";

function loadRoutes(app: ReturnType<typeof express>) {
  AppRoutes.forEach(route => {
    app[route.method](route.path, (req: Request, res: Response, next: Function) => {
      route.action(req, res)
        .then(() => next)
        .catch(err => next(err))
    })
  })
}

AppDataSource.initialize().then(async () => {
  const app = express()

  loadRoutes(app)

  app.listen(3000, () => console.log('Listen on port 3000'))
})
