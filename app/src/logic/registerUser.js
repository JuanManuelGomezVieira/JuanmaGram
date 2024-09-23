import { validateName, validateEmail, validatePassword, errors } from '../../../com/index'

// import { validateName, validateEmail, validatePassword, errors } from 'com'

export default (name, email, password) => {
	validateName(name)
	validateEmail(email)
	validatePassword(password)
	/*
	if (callback) {
		validateCallback(callback)

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

		xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

		xhr.setRequestHeader('Content-Type', 'application/json')

		const user = { name, email, password }
		const json = JSON.stringify(user)

		xhr.send(json)
	} else
	 */
	/* código con promesas sin async await
	return fetch(`${import.meta.env.VITE_API_URL}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password }),
	}).then(res => {
		if (res.status === 201) return
		return res.json().then(({ type, message }) => {
			throw new errors[type](message)
		})
	})
		*/
	return (async () => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		})
		if (res.status === 201) return
		const { type, message } = await res.json()
		const clazz = errors[type]

		throw new clazz(message)
	})()
}
