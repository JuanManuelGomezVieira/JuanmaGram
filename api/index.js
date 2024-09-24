import 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import express from 'express'
import { addCommentToPostHandler, removeCommentFromPostHandler, helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, retrievePostHandler, retrievePostsHandler, updateUserAvatarHandler, updateUserPasswordHandler, createPostHandler } from './handlers/index.js'

const port = process.env.PORT || 4000

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log('Connected to MongoDB Atlas')

		const api = express()

		const jsonBodyParser = bodyParser.json()

		api.use(cors())

		api.get('/', helloApiHandler)

		api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

		api.post('/users', jsonBodyParser, registerUserHandler)

		api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

		api.get('/users/', retrieveUserHandler)

		api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

		api.patch('/users/password/', jsonBodyParser, updateUserPasswordHandler)

		api.post('/posts', jsonBodyParser, createPostHandler)

		api.get('/posts/', retrievePostsHandler)

		api.get('/posts/:postId', retrievePostHandler)

		api.post('/posts/:postId/comments', jsonBodyParser, addCommentToPostHandler)

		api.delete('/posts/:postId/comments/:commentId', removeCommentFromPostHandler)

		api.listen(port, () => console.log(`server running in port ${port}`))
	})
	.catch(error => console.error(error))
