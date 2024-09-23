import mongoose from 'mongoose'

const {
	Schema,
	Schema: {
		Types: { ObjectId },
	},
	model,
} = mongoose

const paymentMethod = new Schema({
	type: {
		type: String,
		enum: ['credit-card', 'paypal', 'apple-pay', 'google pay', 'crypto'],
	},
	name: {
		type: String,
	},
	number: {
		type: String,
	},
	expiryDate: {
		type: Date,
	},
})

const user = new Schema({
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
	avatar: {
		type: String,
		default: null,
	},
	favs: {
		type: [ObjectId],
		ref: 'post',
		default: [],
	},
	paymentMethods: [paymentMethod],
})

const comment = new Schema({
	author: {
		type: ObjectId,
		ref: 'user',
		required: true,
	},
	text: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
})

const post = new Schema({
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
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	likes: {
		type: [ObjectId],
		ref: 'user',
		default: [],
	},
	comments: {
		type: [comment],
		ref: 'comment',
		default: [],
	},
})

//Este código permite utilizar el modelo de datos que tiene mongoose por defecto, y si no existiera, crearíamos el modelo a mano según nuestra definición
export const User = mongoose.models.User || model('User', user)
export const Post = mongoose.models.Post || model('Post', post)
export const Comment = mongoose.models.Comment || model('Comment', comment)
export const PaymentMethod = mongoose.models.PaymentMethod || model('PaymentMethod', paymentMethod)

/* Este código crea directamente los modelos de datos sin preguntar antes a mongoose si ya existe ese modelo
export const User = model('User', user)
export const Post = model('Post', post)
export const Comment = model('Comment', comment)
export const PaymentMethod = model('PaymentMethod', paymentMethod)
*/
