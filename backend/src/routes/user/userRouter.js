import { Router } from 'express'
import {
	createUser,
	getUser,
	getUsers,
	userAlreadyExists,
	validadeInput,
} from './controller.js'

export const userRouter = Router()

userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)
userRouter.post('/', validadeInput, userAlreadyExists, createUser)
