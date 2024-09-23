import context from '../../context'

export default (_users, _posts) => {
	const { users, posts } = context

	const promises = []

	promises.push(users.insertMany(_users))

	if (_posts.length) promises.push(posts.insertMany(_posts))

	return Promise.all(promises)
}
