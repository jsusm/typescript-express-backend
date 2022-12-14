import express from 'express'
import bodyParser from 'body-parser'
import { loadControllers, controllers  } from './controllers/index.js'
import { AppDataSource } from "./db/data-source.js";
import { 
  controllerErrorHandler,
  serviceErrorHandler,
  joiErrorHandler,
  errorHandler,
  zodErrorHandler,
} from './middlewares/error.handler.js'

AppDataSource.initialize().then(async () => {
  const app = express()
  app.use(bodyParser.json())

  app.use('/api/v1', loadControllers(controllers))

  // Error handling
  app.use(controllerErrorHandler)
  app.use(serviceErrorHandler)
  app.use(zodErrorHandler)
  app.use(joiErrorHandler)
  app.use(errorHandler)

  app.listen(3000, () => console.log('Listen on port 3000'))
})
