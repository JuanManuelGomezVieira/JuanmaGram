import 'dotenv'
import mongoose from 'mongoose'
import authenticateUser from './authenticateUser'
//import { User, Post } from '../data/models'

mongoose
	.connect(process.env.MONGODB_URL)
	//.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
	.then(() => authenticateUser('mon@goose.com', '123123123'))
	.then(console.log)
	.catch(error => console.error(error))
	.finally(() => mongoose.disconnect())
