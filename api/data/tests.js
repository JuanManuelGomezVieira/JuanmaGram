import mongoose from 'mongoose'

const {
	Schema,
	Schema: {
		Types: { ObjectId },
	},
	model,
} = mongoose

const user = new schema({
	user: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 8,
	},
})

const post = new schema({
	author: {
		type: ObjectId,
		ref: 'user',
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	data: {
		type: Date,
		required: true,
		default: Date.now,
	},
})

const User = model('User', user)
const Post = model('Post', post)

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
