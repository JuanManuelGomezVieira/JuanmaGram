import { validateUserId, validateCallback } from './helpers/validators'
import { savePost, findUserById, findPostById } from '../data'

export default function toggleLikePost(userId, postId, callback) {
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

			const index = post.likes.indexOf(userId)

			if (index < 0) {
				post.likes.push(userId)

				document.querySelector('.post-item-quick-actions-like').classList.add('material-symbols-filled')
			} else {
				post.likes.splice(index, 1)

				document.querySelector('.post-item-quick-actions-like').classList.remove('material-symbols-filled')

				if (!post.likes.length) delete post.likes
			}

			savePost(post, () => callback(null))
		})
	})
}
