import { validateUserId } from '../../com/index.js'
import { User, Post } from '../data/models.js'

export default userId => {
	validateUserId(userId)

	return User.findById(userId)
		.lean()
		.then(user => {
			if (!user) throw new Error(`user with id ${userId} not found`)

			//Con populate se rellena automáticamente el contenido de autor gracias a la conexión de esquemas que hemos creado en el data model. Al añadir el "-password -favs -__v" hacemos que nos rellene to-do salvo el password, lista de favs y versión del registro de BD generado automáticamente por Mongoose de author(user)
			return (
				Post.find()
					.sort('-date')
					//.populate('author', '-password -favs -__v -paymentMethods')
					//En la siguiente línea lo que hacemos es traernos únicamente los campos marcados, en este caso name y avatar
					.populate('author', 'name avatar')
					.populate('comments.author', 'name avatar')
					.lean()
					.then(posts => {
						posts.forEach(post => {
							//post.fav = user.favs.some(fav => fav.toString() === post.id) ????????

							post.id = post._id.toString()
							delete post._id

							delete post.__v

							if (post.author._id) {
								post.author.id = post.author._id.toString()
								delete post.author._id
							}
						})

						post.comments.forEach(comment => {
							comment.id = comment._id.toString()
							delete comment._id
							if (comment.author._id) {
								comment.author.id = comment.author._id.toString()
								delete comment.author._id
							}
						})

						return posts
					})
			)
		})
}
