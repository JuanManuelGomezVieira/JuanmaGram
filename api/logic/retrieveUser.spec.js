import { expect } from 'chai'
import { writeFile } from 'fs'

import retrieveUser from './retrieveUser.js'

describe('retrieveUser', () => {
	let id, name, email, password, avatar

	beforeEach(done => {
		id = `user-${Math.round(Math.random() * 100 + 1)}`
		name = `name-${Math.random()}`
		email = `e-${Math.random()}@mail.com`
		password = `password-${Math.random()}`
		avatar = `avatar-${Math.random()}`

		writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
	})

	it('succeeds on existing user and correct id', done => {
		const users = [{ id, name, email, password, avatar }]
		const json = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
			expect(error).to.be.null

			retrieveUser(id, (error, user) => {
				expect(error).to.be.null
				expect(user.name).to.equal(name)
				expect(user.avatar).to.equal(avatar)

				done()
			})
		})
	})

	it('succeeds on existing user with no avatar and correct id', done => {
		const users = [{ id, name, email, password, avatar: null }]
		const json = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
			expect(error).to.be.null

			retrieveUser(id, (error, user) => {
				expect(error).to.be.null
				expect(user.name).to.equal(name)
				expect(user.avatar).to.be.null

				done()
			})
		})
	})

	it('fails on existing user and incorrect id', done => {
		const users = [{ id, name, email, password, avatar }]
		const json = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
			expect(error).to.be.null

			const wrongId = id + '-wrong'

			retrieveUser(wrongId, (error, user) => {
				expect(error).to.be.instanceOf(Error)
				expect(error.message).to.equal(`User with id ${wrongId} not found`)
				expect(user).to.be.undefined

				done()
			})
		})
	})

	after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})
