import { validateUserId } from 'com'
import { User, Post } from '../data/models'

export default (userId, postId) => {
	validateUserId(userId)
	validateUserId(postId)

	return Promise.all([User.findByIdAndUpdate(userId).lean(), Post.findByIdAndUpdate(postId, '-__v -likes -date -author').lean()]).then(([user, post]) => {
		if (!user) throw new Error(`user with id ${userId} not found`)
		if (!post) throw new Error(`user with id ${postId} not found`)

		return post
	})
}
