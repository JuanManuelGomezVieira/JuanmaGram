import { validators, errors } from 'com'
import { User } from '../data/models'
import bcrypt from 'bcryptjs'

const { validateName, validateEmail, validatePassword } = validators
const { DuplicityError } = errors

export default (name, email, password) => {
	validateName(name)
	validateEmail(email)
	validatePassword(password)

	/* Promesas sin async await
		return User.create({ name, email, password, avatar: null, favs: [] })
			.then(() => {})
			.catch(error => {
				if (error.message.includes('E1100')) throw new DuplicityError(`User with email ${email} already exists`)
				throw error
		})
	*/

	/* Promesas con async await sin encriptar pass
	return (async () => {
		try {
			await User.create({ name, email, password, avatar: null, favs: [] })
		} catch (error) {
			if (error.message.includes('E1100')) throw new DuplicityError(`User with email ${email} already exists`)
			throw error
		}
	})()
	*/

	// Promesas con async await y password encriptada
	return (async () => {
		try {
			const hash = await bcrypt.hash(password, 10)

			await User.create({ name, email, password: hash, avatar: null, favs: [] })
		} catch (error) {
			if (error.message.includes('E1100')) throw new DuplicityError(`User with email ${email} already exists`)
			throw error
		}
	})()
}
