import type { Request, Response} from 'express'
/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/",
    method: "get",
    action: async (req: Request, res: Response) => {
      res.send("Hello world")
    }
  }
]
