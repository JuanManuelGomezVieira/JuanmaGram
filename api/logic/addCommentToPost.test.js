require('dotenv').config()
import mongoose from 'mongoose'
import addCommentToPost from './addCommentToPost'

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => addCommentToPost('userId', 'postId', 'comment'))
	.then(() => console.log('created'))
	.catch(console.error)
	.finally(mongoose.disconnect())
