import { expect } from 'chai'
import { writeFile, readFile } from 'fs'
import updateUserAvatar from './updateUserAvatar.js'

describe('updateUserAvatar', () => {
	let id, name, email, password, avatar, newAvatar

	beforeEach(done => {
		id = `user-${Math.round(Math.random() * 100 + 1)}`
		name = `name-${Math.random()}`
		email = `e-${Math.random()}@mail.com`
		password = `password-${Math.random()}`
		avatar = `avatar-${Math.random()}`

		writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
	})

	it('succeeds on existing user and correct id', done => {
		const users = [{ id, name, email, password, avatar }]
		const json = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
			expect(error).to.be.null

			newAvatar = avatar + '-new'

			updateUserAvatar(id, newAvatar, error => {
				expect(error).to.be.null

				readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
					expect(error).to.be.null

					const [{ avatar }] = JSON.parse(json)

					expect(avatar).to.equal(newAvatar)

					done()
				})
			})
		})
	})

	it('fails on existing user but incorrect id', done => {
		const users = [{ id, name, email, password, avatar }]
		const json = JSON.stringify(users)

		writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
			expect(error).to.be.null

			const wrongId = id + '-wrong'
			newAvatar = avatar + '-new'

			updateUserAvatar(wrongId, newAvatar, error => {
				expect(error).to.be.instanceOf(Error)
				expect(error.message).to.equal(`User with id ${wrongId} not found`)

				done()
			})
		})
	})

	after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})
