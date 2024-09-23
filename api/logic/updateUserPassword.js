import { readFile, writeFile } from 'fs'
import { validateUserId, validatePassword, validateCallback } from 'com'
// import validateUserId from '../../com/index.js'
// import validatePassword from '../../com/index.js'
// import validateCallback from '../../com/index.js'

export default (id, password, newPassword, newPasswordConfirm, callback) => {
	validateUserId(id)
	validatePassword(password)
	validatePassword(newPassword)
	validatePassword(newPasswordConfirm)
	validateCallback(callback)

	if (password === newPassword) throw new Error('New password must be different from previous password')

	// if (newPassword === newPasswordConfirm) throw new Error('New passwords do not match')

	readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
		if (error) {
			callback(error)
			return
		}

		const users = JSON.parse(json)

		const user = users.find(user => user.id === id)

		if (!user) {
			callback(new Error(`User with id ${id} not found`))
			return
		}

		if (user.password !== password) {
			callback(new Error('Password is incorrect'))
			return
		}

		user.password = newPassword

		json = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
			if (error) {
				callback(error)
				return
			}

			callback(null)
		})
	})
}
