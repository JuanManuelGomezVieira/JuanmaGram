import { validateEmail, validatePassword, errors } from '../../../com/index'
import context from './context'

/**
 * Authenticate a user by email and password and keeps the session token in context
 *
 * @param {string} email The user's email
 * @param {string} password The user's password
 *
 * @returns {string} The user's id
 */

export default (email, password) => {
	validateEmail(email)
	validatePassword(password)

	/*
	return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
		.then(res => {
			if (res.status !== 200) return res.json()
			return res.json().then(body => {
				throw new Error(body.message)
			})
		})
		.then(token => {
			context.token = token
		})
	*/
	/*
	if (callback) {
		validateCallback(callback)

		const xhr = new XMLHttpRequest()

		xhr.onload = () => {
			const { status } = xhr

			if (status !== 200) {
				const { response: json } = xhr
				const { error } = JSON.parse(json)

				callback(new Error(error))

				return
			}

			const { response: json } = xhr
			const token = JSON.parse(json)

			callback(null, token)
		}

		xhr.onerror = () => {
			callback(new Error('connection error'))
		}

		xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

		xhr.setRequestHeader('Content-Type', 'application/json')

		const user = { email, password }
		const json = JSON.stringify(user)

		xhr.send(json)
	} else
		return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		}).then(res => {
			if (res.status !== 200)
				return res.json().then(({ error: message }) => {
					throw new Error(message)
				})

			return res.json()
		})
	*/
	return async () => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})
		if (res.status === 200) {
			const token = await res.json()
			context.token = token
			return
		}

		const { type, message } = await res.json()

		const clazz = errors[type]

		throw new clazz(message)
	}
}
