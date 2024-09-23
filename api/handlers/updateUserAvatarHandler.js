import updateUserAvatar from '../logic/updateUserAvatar.js'
import extractUserId from './helpers/extractUserId.js'

export default (req, res) => {
	try {
		const userId = extractUserId(req)

		const { avatar } = req.body

		updateUserAvatar(userId, avatar, error => {
			if (error) {
				res.status(400).json({ error: error.message })
				return
			}

			res.status(204).send()
		})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}
