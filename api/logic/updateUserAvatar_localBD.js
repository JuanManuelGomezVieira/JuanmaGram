import { readFile, writeFile } from 'fs'
import { validateUserId, validateCallback, validateUrl } from 'com'

export default (id, avatar, callback) => {
	validateUserId(id)
	validateUrl(avatar)
	validateCallback(callback)

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

		user.avatar = avatar

		const json2 = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json2, error => {
			if (error) {
				callback(error)
				return
			}

			callback(null)
		})
	})
}
