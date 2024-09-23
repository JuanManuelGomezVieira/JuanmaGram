import { Button, Container, Form, Input } from '../library'
import {useAppContext} from '../hooks/index'
import { context } from '../../ui'
import updateUserAvatar from '../../logic/updateUserAvatar'
import updateUserPassword from '../../logic/updateUserPassword'

export default function Profile({ onUserAvatarUpdated, onUserPasswordUpdated, onLoggedOut }) {
	console.debug('Profile -> Render')

	const { alert } = useAppContext()

	const handleUpdateAvatar = event => {
		event.preventDefault()

		const avatar = event.target.url.value

		try {
			updateUserAvatar(context.userId, avatar, error => {
				if (error) {
                    alert(error.message)
                    return
                }
				alert('Avatar updated')

                onUserAvatarUpdated()
			})
		} catch (error) {
			alert(error.message)
		}
	}

	const handleUpdatePassword = event => {
		event.preventDefault()

		const password = event.target.password.value
		const newpassword = event.target.newpassword.value
		const newpasswordconfirm = event.target.newpasswordconfirm.value

		try {
			updateUserPassword(context.userId, password, newpassword, newpasswordconfirm, error => {
				if (error) {
					alert(error.message)
                    return
				}
				alert('password updated successfully')

				onUserPasswordUpdated()
			})
		} catch (error) {
			alert(error.message)
		}
	}

	const handleLogout = event => {
		event.preventDefault()

		onLoggedOut()
	}

	const handleSwitchMode = () => {
		document.querySelector('html').classList.toggle('dark')
	}

	return (
		<Container tag="section" className='profile panel'>
			<h2 className='title'>Change color theme</h2>
			<Button className='material-symbols-outlined' onClick={handleSwitchMode}>
				{' '}
				switch{' '}
			</Button>

			<h2 className='title'>Update avatar</h2>
			<Form onSubmit={handleUpdateAvatar}>
				<Input type='url' name='url' placeholder='URL' />
				<Button className='submit button' type='submit'>Update</Button>
			</Form>

			<h2 className='title'>Update password</h2>
			<Form onSubmit={handleUpdatePassword}>
				<Input type='password' name='password' placeholder='password' autoComplete='current-password' />
				<Input type='password' name='newpassword' placeholder='new password' autoComplete='new-password' />
				<Input type='password' name='newpasswordconfirm' placeholder='new password confirmation' autoComplete='new-password' />
				<Button type='submit'>Update</Button>
			</Form>

			<Button onClick={handleLogout}>Logout</Button>
		</Container>
	)
}
