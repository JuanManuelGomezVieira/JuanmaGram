import addCommentToPost from '../logic/addCommentToPost.js'
import extractUserId from './helpers/extractUserId.js'
import handleErrors from './helpers/handleErrors.js'

export default handleErrors((req, res) => {
	const userId = extractUserId(req)

	const { postId } = req.params

	const { text } = req.body

	return addCommentToPost(userId, postId, text).then(() => res.status(201).send())
})
