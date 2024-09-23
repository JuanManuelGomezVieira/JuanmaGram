import mongodb from 'mongodb'

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017')

client
	.connect()
	.then(connection => {
		const users = connection.db().collection('users')

		return users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })
	})
	.then(result => {
		console.log(result)
	})
	.catch(error => {
		console.error(error)
	})
