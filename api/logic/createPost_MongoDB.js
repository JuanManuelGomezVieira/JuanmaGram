import { validateUserId, validateUrl, validateText } from 'com'
import { readFile, writeFile } from 'fs'
import context from './context'

export default (userId, image, text) => {
	validateUserId(userId)
	validateUrl(image)
	validateText(text)

	const { user, post } = context

	readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
		if (error) {
			callback(error)
			return
		}

		const users = JSON.parse(json)

		let user = users.find(user => user.id === userId)

		if (!user) {
			callback(new Error(`User with id ${userId} not found`))
			return
		}

		readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
			if (error) {
				callback(error)
				return
			}

			const posts = JSON.parse(json)

			const lastPost = posts[posts.length - 1]

			let id = 'post-1'

			if (lastPost) id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

			const post = {
				id,
				author: user.id,
				image,
				text,
				date: new Date(),
				likes: [],
			}

			posts.push(post)

			json = JSON.stringify(posts)

			writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
				if (error) {
					callback(error)
					return
				}

				callback(null)
			})
		})
	})
}
