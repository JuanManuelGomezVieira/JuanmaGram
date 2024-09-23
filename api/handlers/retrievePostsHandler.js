import retrievePosts from '../logic/retrievePosts.js'
import extractUserId from './helpers/extractUserId.js'
import handleErrors from './helpers/handleErrors.js'

export default handleErrors((req, res) => {
	const userId = extractUserId(req)

	return retrievePosts(userId).then(posts => res.json(posts))
})
