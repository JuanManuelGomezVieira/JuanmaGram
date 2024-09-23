export default req => {
	// const { userId } = req.headers.authorization
	// "Bearer user-id" -> Hacemos slice desde la posición 7 porque es la posición en la que empieza user-id
	const { authorization } = req.headers
	const userId = authorization.slice(7)

	return userId
}
