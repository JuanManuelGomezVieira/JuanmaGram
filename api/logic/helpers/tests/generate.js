export default {
	user: () => ({
		name: `name-${Math.random()}`,
		email: `email-${Math.random()}@${Math.random()}.${Math.random()}`,
		password: `password-${Math.random()}`,
	}),

	post: userId => ({
		author: userId,
		image: `image-${Math.random()}`,
		text: `text-${Math.random()}`,
		date: new Date(),
		likes: [],
	}),
}
