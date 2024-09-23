import { context } from '../../ui'
import updatePost from '../../logic/updatePost'
import retrievePost from '../../logic/retrievePost'
import { useState, useEffect } from 'react'
import { Button, Container, Input } from '../library'
import {useAppContext} from '../hooks/index'

export default function EditPostModal({ onPostUpdated, onCancel, postId }) {
	console.debug('EditPostModal -> Render')
	
	const [post, setPost] = useState(null)
	const { alert } = useAppContext()

	//Update button
	function handleUpdatePost (event) {
		event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
			updatePost(context.userId, postId, image, text, error => {
				if (error) {
                    alert(error.message)
                    return
                }
				document.body.classList.remove('block-scroll')
			
				onPostUpdated()
			})
		} catch (error) {
			alert(error.message)
		}
	}
	
	// Cancel button
	function handleCancel (event) {
		event.preventDefault()

		const homeFooter = document.querySelector('.home').querySelector('.home-footer')

		homeFooter.querySelector('.add-post-button').classList.remove('material-symbols-filled')
		homeFooter.querySelector('.home-button').classList.add('material-symbols-filled')

        onCancel()
	}

	useEffect (() => {
		try {
			retrievePost(context.token, postId)
				//.then(post => setPost(post))
				.then(setPost)
				.catch(error => alert(error.message))
		} catch(error) {
			alert(error.message)
		}
	}, [postId])

		return <>
			{post && <Container tag="section" className="edit-post modal">
				<Container tag="form" className="edit-post-form">
					<Input type="hidden" name="postId" />
					<Input type="url" name="image" placeholder="Image url" defaultValue={post.image}/>
					<Input type="file" id="input-foto" />
					<img className="post-image-preview" src={post.image} alt='post in edit mode'/>
					<Input name="text" placeholder="Text" defaultValue={post.text}/>
					<Button type="submit" onClick={handleUpdatePost}>Update</Button>
					<Button type="button" onClick={handleCancel}>Cancel</Button>
				</Container>
			</Container>}
		</>
}