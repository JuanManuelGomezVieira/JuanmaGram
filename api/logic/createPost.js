import { validateUserId, validateUrl, validateText } from 'com'
import { User, Post } from '../data/models'

export default (userId, image, text) => {
	validateUserId(userId)
	validateUrl(image)
	validateText(text)

	return User.findById(userId)
		.then(user => {
			if (!user) throw new Error(`user with id ${userId} not found`)

			return Post.create({
				author: userId,
				image,
				text,
			})
		})
		.then(() => {})
}
