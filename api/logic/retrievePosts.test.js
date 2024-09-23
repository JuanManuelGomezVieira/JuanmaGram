import 'dotenv'
import mongoose from 'mongoose'
import retrievePosts from './retrievePosts'

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => retrievePosts('userId'))
	.then(posts => console.log(posts))
	.catch(console.error)
	.finally(mongoose.disconnect())
