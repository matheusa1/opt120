import { db } from '../../bd/config.js'

export const getUsers = async (req, res) => {
	try {
		const users = await db.promise().query('SELECT * FROM usuario')

		const usersWithoutPassword = users[0].map((user) => {
			delete user.senha
			return user
		})
		res.status(200).send({ status: 200, users: usersWithoutPassword })
	} catch (err) {
		console.log(err)

		res.status(500).send({
			status: 500,
			message: 'Internal server error',
		})
	}
}

export const getUser = async (req, res) => {
	const { id } = req.params
	const sql = 'SELECT * FROM usuario WHERE id = ?'

	try {
		const user = await db.promise().query(sql, [id])

		if (user[0].length === 0) {
			return res.status(404).send({
				status: 404,
				message: 'User not found',
			})
		}

		delete user[0][0].senha

		res.status(200).send({ status: 200, user: user[0][0] })
	} catch (err) {
		console.log(err)

		res.status(500).send({
			status: 500,
			message: 'Internal server error',
		})
	}
}

export const createUser = async (req, res) => {
	const { nome, email, senha } = req.body
	const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)'
	const values = [nome, email, senha]

	try {
		const user = await db.promise().query(sql, values)

		res.status(201).send({
			status: 201,
			message: 'user created',
			user: { ...req.body, senha: undefined, id: user[0].insertId },
		})
	} catch (err) {
		console.log(err)

		res.status(500).send({
			status: 500,
			message: 'Internal server error',
		})
	}
}

export const validadeInput = (req, res, next) => {
	const { nome, email, senha } = req.body

	if (!nome || !email || !senha) {
		return res.status(400).send({
			status: 400,
			message: 'Missing required fields',
		})
	}

	next()
}

export const userAlreadyExists = async (req, res, next) => {
	const { email } = req.body
	const sql = 'SELECT * FROM usuario WHERE email = ?'

	try {
		const user = await db.promise().query(sql, [email])

		if (user[0].length > 0) {
			return res.status(409).send({
				status: 409,
				message: 'User already exists',
			})
		}
	} catch (error) {
		console.log(err)

		res.status(500).send({
			status: 500,
			message: 'Internal server error',
		})
	}

	next()
}
