import { validateUserId } from 'com'
import { User, Post, Comment } from '../data/models'

export default (userId, postId, commentId) => {
	validateUserId(userId, 'user id')
	validateUserId(postId, 'post id')
	validateUserId(commentId, 'comment id')

	return Promise.all([User.findById(userId), Post.findById(postId)])
		.then(([user, post]) => {
			if (!user) throw new Error(`user with id ${userId} not found`)
			if (!post) throw new Error(`user with id ${postId} not found`)

			post.comments.findIndex(comment => comment.id === commentId)

			if (index < 0) throw new Error(`comment with id ${commentId} not found in post with id ${postId}`)

			const comment = post.comments[index]

			if (comment.author.toString() !== userId) throw new Error(`comment with id ${commentId} does not belong to user with id ${userId}`)

			post.comments.splice(index, 1)

			return post.save()
		})
		.then(() => {})
}
