require('dotenv').config()
import { expect } from 'chai'
import createPost from './createPost.js'
import { cleanUp, generate, populate } from '../logic/helpers/tests/index.js'
import { MongoClient } from 'mongodb'
import context from './context'

let client = new MongoClient(process.env.MONGODB_URL)

client
	.connect()
	.then(connection => {
		const db = connection.db()

		context.users = db.collection('users')
		context.posts = db.collection('posts')

		return createPost(userId, image, text)
	})
	.then(() => client.close())
	.catch(console.error)
