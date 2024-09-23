import { validateUrl, validateText } from '../../../com/index'
import context from './context'

export default (image, text) => {
	validateUrl(image, 'Image url')
	validateText(text)

	return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${context.token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ image, text }),
	}).then(res => {
		if (res.status === 201) return
		return res.json().then(body => {
			throw new Error(body.message)
		})
	})
	/*
	const xhr = new XMLHttpRequest()

	xhr.onload = () => {
		const { status } = xhr

		if (status !== 201) {
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

	xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

	xhr.setRequestHeader('Authorization', `Bearer ${context.token}`)
	xhr.setRequestHeader('Content-Type', 'application/json')

	const user = { image, text }
	const json = JSON.stringify(user)

	xhr.send(json)
	*/
}
