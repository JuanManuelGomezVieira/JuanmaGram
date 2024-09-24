import { errors } from '../../../com/index.js'

const { DuplicityError, ContentError, ExistenceError, AuthError, TypeError, RangeError } = errors

export default callback => {
	return (req, res) => {
		try {
			const promise = callback(req, res)

			;(async () => {
				try {
					await promise
				} catch (error) {
					respondError(error, res)
				}
			})()
		} catch (error) {
			respondError(error, res)
		}
	}
}

function respondError(error, res) {
	let status = 500

	if (error instanceof DuplicityError) status = 409
	else if (error instanceof ExistenceError) status = 404
	else if (error instanceof AuthError) status = 401
	// else if (error instanceof ContentError || error instanceof TypeError || error instanceof RangeError) status = 406

	res.status(status).json({ message: error.message, type: error.constructor.name })
}
/* promesas sin async await
export default callback => {
	return (req, res) => {
		try {
			callback(req, res).catch(error => {
				let status = 500
				if (error instanceof DuplicityError) status = 409
				if (error instanceof ExistenceError) status = 404
				if (error instanceof AuthError) status = 401
				res.status(status).json({ message: error.message, type: error.constructor.name })
			})
		} catch (error) {
			let status = 500

			if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError) status = 406

			res.status(400).json({ message: error.message, type: error.constructor.name })
		}
	}
}
	*/
