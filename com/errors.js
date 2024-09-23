class DuplicityError extends Error {
	constructor(message) {
		super(message)
		// this.name = DuplicityError.name
	}
	get name() {
		return DuplicityError.name
	}
}

class ContentError extends Error {
	constructor(message) {
		super(message)
		// this.name = ContentError.name
	}
	get name() {
		return ContentError.name
	}
}

class ExistenceError extends Error {
	constructor(message) {
		super(message)
		// this.name = ContentError.name
	}
	get name() {
		return ExistenceError.name
	}
}

class AuthError extends Error {
	constructor(message) {
		super(message)
		// this.name = ContentError.name
	}
	get name() {
		return AuthError.name
	}
}

module.exports = { DuplicityError, ContentError, ExistenceError, AuthError }
