import { validateName, validateEmail, validatePassword, DuplicityError } from 'com'
import context from './context'

export default (name, email, password) => {
	validateName(name)
	validateEmail(email)
	validatePassword(password)

	const { users } = context

	return users.insertOne({ name, email, password, avatar: null, favs: [] }).catch(error => {
		if (error.message.includes('E1100')) throw new DuplicityError(`User with email ${email} already exists`)
		throw error
	})

	// readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
	// 	if (error) {
	// 		callback(error)
	// 		return
	// 	}

	// 	const users = JSON.parse(json)

	// 	let user = users.find(user => user.email === email)

	// 	if (user) {
	// 		callback(new Error(`User with email ${name} already exists`))
	// 		return
	// 	}

	// 	let id = 'user-1'

	// 	const lastUser = users[users.length - 1]

	// 	if (lastUser) id = `user-${parseInt(lastUser.id.slice(5)) + 1}`

	// 	user = {
	// 		id,
	// 		name,
	// 		email,
	// 		password,
	// 		avatar: null,
	// 		favs: [],
	// 	}

	// 	users.push(user)

	// 	json = JSON.stringify(users, null, 4)

	// 	writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
	// 		if (error) {
	// 			callback(error)
	// 			return
	// 		}

	// 		callback(null)
	// 	})
	// })
}
