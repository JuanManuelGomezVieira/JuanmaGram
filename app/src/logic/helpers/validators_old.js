import { ContentError } from '../../../../com/index.js'

/**
 * Validates an email
 *
 * @param {string} email An email to validate
 */
export function validateEmail(email) {
	if (typeof email !== 'string') throw new TypeError('email is not a string')
	if (!email.trim().length) throw new ContentError('email is empty')
	const regex = /^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9_.+-])+\.([a-zA-Z0-9_.+-])+$/
	if (!regex.test(email)) throw new ContentError('Invalid email format')
}

/**
 * Validates a password
 *
 * @param {string} password A password to validate
 * @param {string} explain An alternative text for the explanation
 */
export function validatePassword(password, explain = 'Password') {
	if (typeof password !== 'string') throw new TypeError(`${explain} is not a string`)
	if (password.trim().length < 8) throw new ContentError(`${explain} must be at least 8 characters long`)
}

/**
 * Validate a name
 *
 * @param {string} name A name to validate
 */
export function validateName(name) {
	if (typeof name !== 'string') throw new TypeError('name is not a string')
	if (!name.trim().length) throw new ContentError('name is empty')
}

/**
 * Validates an URL
 *
 * @param {url} url A URL to validate
 * @param {string} explain An alternative text for the explanation
 */
export function validateUrl(url, explain = 'Url') {
	if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`)
	if (!url.trim().length) throw new ContentError(`${explain} is empty`)
}

/**
 * Validates an user
 *
 * @param {string} id
 * @param {string} explain An alternative text for the explanation
 */
export function validateUserId(id, explain = 'id') {
	if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
	if (!id.trim().length) throw new Error(`${explain} is empty`)
}

/**
 * Validates a text
 *
 * @param {string} text
 * @param {string} explain An alternative text for the explanation
 */
export function validateText(text, explain = 'Text') {
	if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
	if (!text.trim().length) throw new ContentError(`${explain} is empty`)
}

/**
 * Validates a callback
 *
 * @param {callback} callback
 * @param {string} explain An alternative text for the explanation
 */
export function validateCallback(callback, explain = 'Callback') {
	if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

export function validateToken(token, explain = 'token') {
	if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
	if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}
