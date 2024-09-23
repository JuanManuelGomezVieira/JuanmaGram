import updateUserPassword from '../logic/updateUserPassword.js'
import extractToken from '../helpers/extractToken.js'

export default (req, res) => {
	try {
		const userId = extractToken(req)

		const { password, newPassword, newPasswordConfirm } = req.body

		updateUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
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
