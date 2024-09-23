import createPost from '../../../logic/createPost'
import { Button, Container, Input } from '../library'
import {useAppContext} from '../../hooks/index'

export default function AddPostModal({ onPostCreated, onCancel }) {
	console.debug('AddPostModal -> Render')

	const { alert } = useAppContext()

	//Create button
	function handleCreatePost (event) {
		event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
			createPost(image, text)
				.then(onPostCreated)
				// .then(
				// 	document.body.classList.remove('block-scroll')
					
				// 	const homeFooter = document.querySelector('.home').querySelector('.home-footer')
				// 	homeFooter.querySelector('.add-post-button').classList.remove('material-symbols-filled')
				// 	homeFooter.querySelector('.home-button').classList.add('material-symbols-filled')
				// )
				.catch(error => alert(error.message))
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

	function handleUploadFile (event) {
		event.preventDefault()

		const inputFile = document.querySelector('#input-foto')
		const imagePreview = document.querySelector('post-image-preview')
	
		/**
		 * Returns a file in Base64URL format.
		 * 
		 * @param {File} file
		 * @return {Promise<string>}
		 */
		
		async function encodeFileAsBase64URL(file) {
			return new Promise(resolve => {
				const reader = new FileReader()
				reader.addEventListener('loadend', () => {
					resolve(reader.result)
				})
				reader.readAsDataURL(file)
			})
		}
	
		// Eventos
		inputFile.addEventListener('input', async (event) => {
			// Convierto la primera imagen del input en una ruta Base64
			const base64URL = await encodeFileAsBase64URL(inputFile.files[0])
			// Añado la ruta Base64 a la imagen
			imagePreview.setAttribute('src', base64URL)
		})
	}

	return <Container tag="section" className="add-post modal">
		<Container tag="form" className="add-post-form" onSubmit={handleCreatePost}>
			<Input type="file" id="input-foto" />
			<Input type="url" name="image" placeholder="Image url" onClick={handleUploadFile} />
			<img className="post-image-preview" alt='post in upload mode'/>
			<Input name="text" placeholder="Text"/>
			<Button type="submit">Create</Button>
			<Button type="button" onClick={handleCancel}>Cancel</Button>
		</Container>
	</Container>
}