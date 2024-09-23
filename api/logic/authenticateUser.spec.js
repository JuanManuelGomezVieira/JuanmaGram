import { expect } from 'chai'
import authenticateUser from './authenticateUser.js'
import { cleanUp, generate, populate } from '../logic/helpers/tests/index.js'

describe('authenticateUser', () => {
	let user

	beforeEach(done => {
		user = generate.user()
		cleanUp(done)
	})

	it('succeeds on existing user', done => {
		const users = [user]

		populate(users, [], error => {
			if (error) {
				done(error)
				return
			}
		})

		authenticateUser(user.email, user.password, (error, userId) => {
			expect(error).to.be.null
			expect(userId).to.equal(user.id)

			done()
		})
	})

	it('fails on non-existing user', done => {
		authenticateUser(user.email, user.password, (error, userId) => {
			expect(error).to.be.instanceOf(Error)
			expect(error.message).to.equal(`User with email ${user.email} not found`)
			expect(userId).to.be.undefined

			done()
		})
	})

	it('fails on existing user but wrong password', done => {
		const users = [user]

		populate(users, [], error => {
			if (error) {
				done(error)
				return
			}
		})

		user.password += '-wrong'

		authenticateUser(user.email, user.password, (error, userId) => {
			expect(error).to.be.instanceOf(Error)
			expect(error.message).to.equal(`Wrong password`)
			expect(userId).to.be.undefined

			done()
		})
	})

	it('fails on empty email', () => {
		expect(() => authenticateUser('', user.password, () => {})).to.throw(Error, 'email is empty')
	})

	it('fails on empty password', () => {
		expect(() => authenticateUser(user.email, '', () => {})).to.throw(Error, 'Password must be at least 8 characters long')
	})

	it('fails on non-callback', () => {
		expect(() => authenticateUser(user.email, user.password)).to.throw(Error, 'Callback is not a function')
	})

	after(cleanUp)
})
