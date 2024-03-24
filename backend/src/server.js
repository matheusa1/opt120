import express from 'express'
import { appRouter } from './routes/index.js'

const app = express()

app.use(express.json())

app.use(appRouter)

app.get('/', (req, res) => {
	console.log(req.body)
	res.send('Hello World!')
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
