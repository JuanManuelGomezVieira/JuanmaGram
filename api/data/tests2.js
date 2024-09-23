import mongoose from 'mongoose'
import { User, Post } from './models'

mongoose
	.connect('mongodb://127.0.01:27017/data')
	.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
	.then(() => {
		return User.create({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })
	})
	.then(user => {
		return Post.create({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })
	})
	.catch(error => {
		console.error(error)
	})
	.finally(() => {
		mongoose.disconnect()
	})
