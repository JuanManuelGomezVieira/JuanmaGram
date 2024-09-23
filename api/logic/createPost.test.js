require('dotenv').config()
import mongoose from 'mongoose'
import createPost from './createPost'

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => createPost('', 'http://image.com/cool', 'smile'))
	.then(() => console.log('created'))
	.catch(console.error)
	.finally(mongoose.disconnect())

/*
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
*/
