import { ObjectId } from 'mongodb'
import { validateUserId, ExistenceError } from 'com'
import context from './context'
// import { readFile } from 'fs'

/**
 * Retrieves a user by id
 *
 * @param {string} userId
 *
 * @returns {Promise<Object>}
 */
export default userId => {
	validateUserId(userId)

	const { users } = context

	return users.findOne({ _id: new ObjectId() }).then(user => {
		if (!user) throw new ExistenceError('user not found')

		delete user._id
		delete user.password
		delete user.favs

		return user
	})
	// readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
	// 	if (error) {
	// 		callback(error)
	// 		return
	// 	}

	// 	const users = JSON.parse(json)

	// 	let user = users.find(user => user.id === userId)

	// 	if (!user) {
	// 		callback(new Error(`User with id ${userId} not found`))
	// 		return
	// 	}

	// 	const { name, email, avatar } = user

	// 	const user2 = { name, email, avatar }
	// 	callback(null, user2)
	// })
}
