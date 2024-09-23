import jwt from 'jsonwebtoken'

export default req => {
	const { authorization } = req.headers

	const token = authorization.slice(7)

	const payload = jwt.verify(token, process.env.JWT_SECRET)

	const { sub: userId } = payload

	return userId
}
