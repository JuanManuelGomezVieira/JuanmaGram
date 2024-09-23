import { validateUserId, validateText } from '../../com/index.js'

import { User, Post, Comment } from '../data/models.js'

export default (userId, postId, text) => {
	validateUserId(userId)
	validateUserId(postId, 'post id')
	validateText(text)

	return Promise.all([User.findById(userId), Post.findById(postId)])
		.then(([user, post]) => {
			if (!user) throw new Error(`user with id ${userId} not found`)
			if (!post) throw new Error(`user with id ${postId} not found`)

			const comment = new Comment({
				author: userId,
				text,
			})

			post.comments.push(comment)

			return post.save()
		})
		.then(() => {})
}
