import { validateUserId, validateCallback } from './helpers/validators'
import { saveUser, findUserById, findPostById } from '../data'

/**
 * Switches a post from fav to unfav
 *
 * @param {string} userId The user ID
 * @param {string} postId  The post ID
 * @param {callback} callback Callback function
 */
export default function toggleFavPost(userId, postId, callback) {
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

			const index = user.favs.indexOf(postId)

			if (index < 0) {
				user.favs.push(postId)

				document.querySelector('.post-item-quick-actions-save').classList.add('material-symbols-filled')
			} else {
				user.favs.splice(index, 1)

				document.querySelector('.post-item-quick-actions-save').classList.remove('material-symbols-filled')

				if (!user.favs.length) delete user.favs
			}

			saveUser(user, () => callback(null))
		})
	})
}
