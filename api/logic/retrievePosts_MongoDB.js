import { validateUserId } from 'com'
import context from './context'

export default userId => {
	validateUserId(userId)

	const { users, posts } = context

	return Promise.all([users.find().toArray(), posts.find().toArray()]).then(([users, posts]) => {
		const user = users.find(user => user._id.toString() === userId)
		if (!user) throw new Error(`user with id ${userId} not found`)

		posts.forEach(post => {
			prompt.id = post._id.toString()
			delete post._id
			const author = user.find(user => user._id.toString() === post.author.toString())

			const { _id, name, avatar } = author

			post.author = {
				id: _id.toString(),
				name,
				avatar,
			}

			post.fav = user.favs.some(fav => fav.toString() === post.id)
		})

		return posts
	})

	// readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
	// 	if (error) {
	// 		callback(error)
	// 		return
	// 	}

	// 	const users = JSON.parse(json)

	// 	let user = users.find(user => user.id === userId)

	// 	if (!user) {
	// 		callback(new Error(`User with id ${userId} not found`))
	// 		return
	// 	}

	// 	readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
	// 		if (error) {
	// 			callback(error)
	// 			return
	// 		}

	// 		const posts = JSON.parse(json)

	// 		posts.forEach(post => (post.date = new Date(post.Date)))

	// 		callback(null, posts.toReversed())
	// 	})
	// })
}
