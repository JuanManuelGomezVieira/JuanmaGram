import context from './context'

export default () =>
	fetch(`${import.meta.env.VITE_API_URL}/users`, {
		headers: {
			Authorization: `Bearer ${context.token}`,
		},
	}).then(res => {
		if (res.status === 200) return res.json()
		return res.json().then(body => {
			throw new Error(body.message)
		})
	})
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
			const user = JSON.parse(json)

			callback(null, user)
		}

		xhr.onerror = () => {
			callback(new Error('connection error'))
		}

		xhr.open('GET', `${import.meta.env.VITE_API_URL}/users`)

		xhr.setRequestHeader('Authorization', `Bearer ${token}`)

		xhr.send()
	} else
	*/
