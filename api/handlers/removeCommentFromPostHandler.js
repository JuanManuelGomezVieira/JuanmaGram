import removeCommentFromPost from '../logic/removeCommentFromPost.js'
import extractUserId from './helpers/extractUserId.js'
import handleErrors from './helpers/handleErrors.js'

export default handleErrors((req, res) => {
	const userId = extractUserId(req)

	const { postId, commentId } = req.params

	return removeCommentFromPost(userId, postId, commentId).then(() => res.status(204).send())
})
