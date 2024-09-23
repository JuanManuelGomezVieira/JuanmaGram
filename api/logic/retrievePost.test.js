import 'dotenv'
import mongoose from 'mongoose'
import retrievePost from './retrievePost'

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => retrievePost('userId', 'postId'))
	.then(posts => console.log(post))
	.catch(console.error)
	.finally(mongoose.disconnect())
