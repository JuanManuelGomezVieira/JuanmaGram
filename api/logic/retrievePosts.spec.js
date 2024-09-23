import { expect } from 'chai'
import retrievePost from './retrievePost.js'
import { cleanUp, generate, populate } from '../logic/helpers/tests/index.js'

describe('retrievePosts', () => {
	// beforeEach(done => cleanUp(done))
	beforeEach(cleanUp)

	describe('on existing users and posts', () => {
		const users = new Array(5),
			posts = []

		beforeEach(done => {
			for (let i = 0; i < users.length; i++) {
				const user = generate.user()

				users[i] = user

				for (let j = 0; j < posts.length; j++) {
					const post = generate.post(user.id)

					posts.push(post)
				}
			}

			populate(users, posts, done)
		})

		it('succeeds on existing users and posts', done => {
			const user = users[0]
			retrievePost(user.id, (error, posts2) => {
				expect(error).to.be.null

				//expect(JSON.stringify(posts.toReversed())).to.equal(Json.stringify(posts2))
				expect(posts2).to.deep.equal(posts.reverse())
			})
		})
	})
	//after(done => cleanUp(done))
	after(cleanUp)
})
