import { errors } from './index.js'

const ContentError = errors.ContentError

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

/**
 * Validates an email
 * @param {string} email An email to validate
 */
function validateEmail(email) {
	if (typeof email !== 'string') throw new TypeError('email is not a string')
	if (!email.trim().length) throw new ContentError('email is empty')
	if (!EMAIL_REGEX.test(email)) throw new ContentError('email is no valid')
}

/**
 * Validates a password
 * @param {string} password A password to validate
 * @param {string} explain An alternative text for the explanation
 */
function validatePassword(password, explain = 'Password') {
	if (typeof password !== 'string') throw new TypeError(`${explain} is not a string`)
	if (password.trim().length < 8) throw new RangeError(`${explain} must be at least 8 characters long`)
}

/**
 * Validate a name
 * @param {string} name A name to validate
 */
function validateName(name) {
	if (typeof name !== 'string') throw new TypeError('name is not a string')
	if (!name.trim().length) throw new ContentError('name is empty')
}

/**
 * Validates an URL
 * @param {url} url A URL to validate
 * @param {string} explain An alternative text for the explanation
 */
function validateUrl(url, explain = 'Url') {
	if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`)
	if (!url.trim().length) throw new ContentError(`${explain} is empty`)
}

/**
 * Validates an user
 * @param {string} id
 * @param {string} explain An alternative text for the explanation
 */
const HEX_DICTIONARY = '0123456789abcdef'
function validateUserId(id, explain = 'id') {
	if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
	if (id.trim().length !== 24) throw new ContentError(`${explain} does not have 24 characters`)
	for (let i = 0; i < id.length; i++) {
		const char = id[i]

		if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not hexadecimal`)
	}
}

/**
 * Validates a text
 * @param {string} text
 * @param {string} explain An alternative text for the explanation
 */
function validateText(text, explain = 'Text') {
	if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
	if (!text.trim().length) throw new ContentError(`${explain} is empty`)
}

/**
 * Validates a callback
 * @param {callback} callback
 * @param {string} explain An alternative text for the explanation
 */
function validateCallback(callback, explain = 'Callback') {
	if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

function validateToken(token, explain = 'token') {
	if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
	if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}

export { validateEmail, validatePassword, validateName, validateUrl, validateUserId, validateText, validateCallback, validateToken }
