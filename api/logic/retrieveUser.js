import { validateUserId, ExistenceError } from 'com'
import { User } from '../data/models'

/**
 * Retrieves a user by id
 *
 * @param {string} userId
 *
 * @returns {Promise<Object>}
 */
export default userId => {
	validateUserId(userId)

	return (async () => {
		const user = await User.findById(userId, 'name avatar'.lean())

		if (!user) throw new ExistenceError('user not found')

		delete user._id
		// delete user.__v

		return user
	})()
}
