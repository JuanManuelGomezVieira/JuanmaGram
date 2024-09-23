import {} from 'dotenv/config'
import { validateEmail, validatePassword, ExistenceError, AuthError } from 'com'
import context from './context'

/**
 * Authenticate a user against their credentials
 *
 * @param {string} email The user email
 * @param {string} password The user password
 *
 * @returns {Promise<string>} The user id
 *
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty email
 * @throws {RangeError} On password length lower than 8 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */
export default (email, password) => {
	validateEmail(email)
	validatePassword(password)

	const { users } = context
	return users.findOne({ email }).then(user => {
		if (!user) throw new ExistenceError('user not found')

		if (user.password !== password) throw new AuthError('wrong credentials')

		return user._id.toString()
	})

	// readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
	// 	if (error) {
	// 		callback(error)
	// 		return
	// 	}

	// 	const users = JSON.parse(json)

	// 	let user = users.find(user => user.email === email)

	// 	if (!user) {
	// 		callback(new Error(`User with email ${email} not found`))
	// 		return
	// 	}

	// 	if (user.password !== password) {
	// 		callback(new Error('Wrong password'))
	// 		return
	// 	}

	// 	callback(null, user.id)
	// })
}
