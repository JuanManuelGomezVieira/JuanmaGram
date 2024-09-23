import { Button, Container } from '../library'

export default function Alert({ message, level, onAccept }) {
	console.debug('Alert -> Render')

	console[level](message)

	let color = 'dodgerblue'

	if(level === 'warn')
		color = 'gold'
	else if (level === 'error')
		color = 'tomato'

		return <Container tag="section" className='edit-post modal'>
			<p style={{backgroundColor: color}}>{message}</p>
			<Button onClick={onAccept}>Accept</Button>
		</Container>
}