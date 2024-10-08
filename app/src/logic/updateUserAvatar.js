import { validateUserId, validateUrl, validateCallback } from '../../../com/index'

/**
 * Update user's avatar in Users array
 *
 * @param {string} userId The user's ID
 * @param {string} avatar URL for new avatar
 *
 */

export default (userId, avatar, callback) => {
	validateUserId(userId, 'User id')
	validateUrl(avatar, 'Avatar url')
	validateCallback(callback)

	const xhr = new XMLHttpRequest()

	xhr.onload = () => {
		const { status } = xhr

		if (status !== 204) {
			const { response: json } = xhr
			const { error } = JSON.parse(json)

			callback(new Error(error))

			return
		}

		callback(null)
	}

	xhr.onerror = () => {
		callback(new Error('connection error'))
	}

	xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}`)

	xhr.setRequestHeader('Content-Type', 'application/json')

	const data = { avatar }
	const json = JSON.stringify(data)

	xhr.send(json)
}
