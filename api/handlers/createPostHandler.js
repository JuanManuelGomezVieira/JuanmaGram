import createPost from '../logic/createPost.js'
import extractUserId from './helpers/extractUserId.js'

export default (req, res) => {
	try {
		const userId = extractUserId(req)

		const { image, text } = req.body

		createPost(userId, image, text)
			.then(() => res.status(201).send())
			.catch(error => res.status(400).json({ error: error.message }))
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}
