import context from '../../context'

export default () => {
	const { users, posts } = context

	return Promise.all([users.deleteMany({}), posts.deleteMany({})])
}
