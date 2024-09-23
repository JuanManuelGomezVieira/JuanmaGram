import retrieveUser from '../logic/retrieveUser.js'
import extractUserId from './helpers/extractUserId.js'
import handleErrors from './helpers/handleErrors.js'

export default handleErrors((req, res) => {
	const userId = extractUserId(req)

	retrieveUser(userId).then(user => res.json(user))
})

/*
export default (req, res) => {
	try {
		const userId = extractUserId(req)

		retrieveUser(userId)
			.then(user => res.json(user))
			.catch(error => {
				let status = 500

				if (error instanceof ExistenceError) status = 404

				res.status(400).json({ error: error.message })
			})
	} catch (error) {
		let status = 500

		if (error instanceof TypeError || error instanceof ContentError) status = 406

		res.status(400).json({ error: error.message })
	}
}
*/
