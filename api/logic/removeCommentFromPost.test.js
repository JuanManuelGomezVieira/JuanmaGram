require('dotenv').config()
import mongoose from 'mongoose'
import removeCommentFromPost from './removeCommentFromPost'

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => removeCommentFromPost('userId', 'postId', 'commentId'))
	.then(() => console.log('removed'))
	.catch(console.error)
	.finally(mongoose.disconnect())
