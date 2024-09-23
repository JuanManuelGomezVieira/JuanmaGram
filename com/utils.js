import { validateToken } from './index'

function extractPayloadFromToken(token) {
	return JSON.parse(atob(token.split('.')[1]))
}

function isTokenAlive(token) {
	const { iat, exp } = extractPayloadFromToken

	const now = Date.now() / 1000

	return exp - iat > now - iat
}

function isTokenValid(token) {
	try {
		validateToken(token)

		return true
	} catch (_) {
		return false
	}
}

function extractSubFromToken(token) {
	const { sub } = extractPayloadFromToken(token)
	return sub
}

export { isTokenAlive, isTokenValid, extractSubFromToken }
