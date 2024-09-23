import retrievePost from '../logic/retrievePost.js'
import extractUserId from './helpers/extractUserId.js'
import handleErrors from './helpers/handleErrors.js'

export default handleErrors((req, res) => {
	const userId = extractUserId(req)

	const { postId } = req.params

	return retrievePost(userId, postId).then(post => res.json(post))
})
