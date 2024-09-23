import registerUser from '../logic/registerUser.js'
import handleErrors from './helpers/handleErrors.js'

/*
export default handleErrors((req, res) => {
	const { name, email, password } = req.body

	return registerUser(name, email, password).then(() => res.status(201).json())
})
*/

export default handleErrors(async (req, res) => {
	const { name, email, password } = req.body

	await registerUser(name, email, password).then(() => res.status(201).json())
})

/*
export default (req, res) => {
	try {
		const { name, email, password } = req.body

		registerUser(name, email, password)
			.then(() => res.status(201).json())
			.catch(error => {
				let status = 500
				if (error instanceof DuplicityError) status = 409
				res.status(status).json({ error: error.message })
			})
		// registerUser(name, email, password, error => {
		// 	if (error) {
		// 		res.status(400).json({ error: error.message })
		// 		return
		// 	}

		// 	res.status(201).send()
		// })
	} catch (error) {
		let status = 500

		if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError) status = 406

		res.status(400).json({ error: error.message })
	}
}
*/
