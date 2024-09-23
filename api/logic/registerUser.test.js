import 'dotenv'
import mongoose from 'mongoose'
import registerUser from './registerUser'
import { User, Post } from '../data/models'

/* Promesas sin async await
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
	.then(() => registerUser('Mon Goose', 'mon@goose.com', '123123123'))
	.catch(error => console.error(error))
	.finally(() => mongoose.disconnect())
*/
;(async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		await Promise.all([User.deleteMany(), Post.deleteMany()])
		await registerUser('Mon Goose', 'mon@goose.com', '123123123')
	} catch (error) {
		console.error(error)
	} finally {
		mongoose.disconnect()
	}
})()
