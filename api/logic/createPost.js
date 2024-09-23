import { validateUserId, validateUrl, validateText } from '../../com/index.js'
// import validateUserId from '../../com/index.js'
// import validateUrl from '../../com/index.js'
// import validateText from '../../com/index.js'

import { User, Post } from '../data/models.js'

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
