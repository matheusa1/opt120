import { Router } from 'express'
import { userRouter } from './user/userRouter.js'

export const appRouter = Router()

appRouter.use('/user', userRouter)
