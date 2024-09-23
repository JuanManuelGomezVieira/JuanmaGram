import { validateUserId, validateUrl, validateText, validateCallback } from '../../../com/index'
import { savePost, findUserById, findPostById } from '../data'

export default function updatePost(userId, postId, image, text, callback) {
	validateUserId(userId, 'User ID')
	validateUserId(postId, 'Post ID')
	validateUrl(image, 'Image URL')
	validateText(text)
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

			post.image = image
			post.text = text
			post.date = new Date()

			savePost(post, () => callback(null))
		})
	})
}
