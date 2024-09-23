import { validateUserId, validateCallback } from '../../../com/index'
import { savePosts, loadPosts, findUserById, findPostById } from '../data'

export default function deletePost(userId, postId, callback) {
	validateUserId(userId, 'User ID')
	validateUserId(postId, 'Post ID')
	validateCallback(callback)

	findUserById(userId, user => {
		if (!user) {
			callback(new Error(`User with ID ${userId} not found`))
			return
		}

		findPostById(postId, post => {
			if (!post) {
				callback(new Error(`Post with ID ${postId} not found`))
				return
			}

			if (post.author !== userId) {
				callback(new Error(`Post with ID ${postId} does not belong to user with id ${userId}`))

				return
			}

			loadPosts(posts => {
				const index = posts.findIndex(post => post.id === postId)

				posts.splice(index, 1)

				savePosts(posts, () => callback(null))
			})
		})
	})
}
