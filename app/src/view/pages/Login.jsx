import { Anchor, Button, Container, Form, Input } from '../library'
import loginUser from '../../logic/loginUser'
import { useAppContext, useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'

export default function Login (/*{onRegisterClick, onUserLoggedIn}*/) {
    console.debug('Login -> Render')

    const { alert, navigate } = useAppContext()

    /*
    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }
    */
    
    const handleErrors = useHandleErrors()

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value


        handleErrors(async () => {
            await loginUser(email, password)
            navigate('/')
        })
        /*
        try {
            // authenticateUser(email, password, (error, token) => {
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     context.token = token
                
            //     onUserLoggedIn()
            // })
            await loginUser(email, password)

            navigate('/')
        } catch (error) {
            alert(error.message, 'warn')
        }
            */
    }

    return <Container tag="main" className="login page">
        <h1 className="title">Login</h1>
        <Form onSubmit={handleLogin}>
            <Input type="email" name="email" placeholder="Email" autoComplete="email" />
            <Input type="password" name="password" placeholder="Password" autoComplete="current-password" />
            <Button type="submit">Login</Button>
            <Anchor><Link to="/register">Don&apos;t have an account? Register now</Link></Anchor>  
        </Form>
    </Container>
}