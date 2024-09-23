import {} from 'dotenv/config'
import { validateEmail, validatePassword, ExistenceError, AuthError } from 'com'
import { User } from '../data/models'
import bcrypt from 'bcryptjs'

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

	/* Promesas sin async await
	return User.findOne({ email }).then(user => {
		if (!user) throw new ExistenceError('user not found')

		if (user.password !== password) throw new AuthError('wrong credentials')

		return user.id
	})
	*/

	/* Promesas con async await
	return (async () => {
		const user = await User.findOne({ email })

		if (!user) throw new ExistenceError('user not found')

		if (user.password !== password) throw new AuthError('wrong credentials')

		return user.id
	})()
	*/

	// Promesas con async await y password encriptada
	return (async () => {
		const user = await User.findOne({ email })

		if (!user) throw new ExistenceError('user not found')

		const match = await bcrypt.compare(password, user.password)

		if (!match) throw new AuthError('wrong credentials')

		return user.id
	})()
}