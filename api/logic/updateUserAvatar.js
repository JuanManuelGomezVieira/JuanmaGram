import { readFile, writeFile } from 'fs'
import { validateUserId, validateUrl } from '../../com/index.js'
import { User } from '../data/models.js'

export default (id, avatar) => {
	validateUserId(id)
	validateUrl(avatar)

	return async () => {
		const user = await User.findById(id)

		if (!user) throw new ExistenceError('user not found')

		user.avatar = avatar
	}

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

	/*

	import { readFile, writeFile } from 'fs'
	import { validateUserId, validateCallback, validateUrl } from '../../com/index.js'

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
	*/
}
