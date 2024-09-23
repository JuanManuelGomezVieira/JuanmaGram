import { validateUserId, validatePassword, validateCallback } from '../../../com/index'
import { saveUser, findUserById } from '../data'

/**
 * Update user's password in Users array
 *
 * @param {string} userId The user's ID
 * @param {string} password Actual user's password
 * @param {string} newPassword Actual user's new password
 * @param {string} newPasswordConfirm Actual user's new password confirmation
 *
 */

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
	validateUserId(userId)
	validatePassword(password)
	validatePassword(password, 'New password')
	if (newPassword === password) throw new Error('New password equals old password')
	validatePassword(password, 'New password confirmation')
	if (newPassword !== newPasswordConfirm) throw new Error('New password and confirmation does not match')
	validateCallback(callback)

	findUserById(userId, user => {
		if (!user) {
			callback(new Error('User not found'))
			return
		}

		if (password !== user.password) {
			callback(new Error('Password does not match'))
			return
		}

		user.password = newPassword

		saveUser(user, () => callback(null))
	})
}
