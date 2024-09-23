import { validateToken, validateUserId } from '../../../com/index'

export default function retrievePost(token, postId) {
	validateToken(token)
	validateUserId(postId, 'post id')

	return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then(res => {
		if (res.status !== 200)
			return res.json().then(({ error: message }) => {
				throw new Error(message)
			})
		return res.json()
	})
}
