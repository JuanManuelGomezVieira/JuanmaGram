import jwt from 'jsonwebtoken'
import authenticateUser from '../logic/authenticateUser.js'
import handleErrors from './helpers/handleErrors.js'

export default handleErrors((req, res) => {
	const { email, password } = req.body

	return authenticateUser(email, password).then(userId => {
		const payload = { sub: userId }

		const { JWT_SECRET, JWT_EXPIRATION } = process.env

		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

		res.json(token)
	})
})

/*
export default (req, res) => {
	try {
		const { email, password } = req.body

		authenticateUser(email, password)
			.then(userId => {
				const payload = { sub: userId }

				const { JWT_SECRET, JWT_EXPIRATION } = process.env
				const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

				res.json(token)
			})
			.catch(error => {
				let status = 500

				if (error instanceof ExistenceError) status = 404
				if (error instanceof AuthError) status = 401

				res.status(400).json({ error: error.message })
			})
	} catch (error) {
		let status = 500

		if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError) status = 406

		res.status(400).json({ error: error.message })
	}
}
*/
