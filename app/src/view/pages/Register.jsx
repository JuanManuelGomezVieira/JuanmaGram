import { Anchor, Button, Container, Form, Input } from '../library'
import registerUser from '../../../logic/registerUser'
import { useAppContext, useHandleErrors } from '../../hooks/index'
import { Link } from 'react-router-dom'
import { errors } from 'com'

const { DuplicityError, ContentError } = errors

export default function Register (/*{ onLoginClick, onUserRegistered }*/) {
    console.debug('Register -> Render')

    const { alert, navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    /*
    function handleLoginClick (event) {
        event.preventDefault()

        onLoginClick()
    }
    */

    const handleRegister = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

            // registerUser(name, email, password, error => {
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     onUserRegistered()
            // })
            handleErrors(async () => {
                await registerUser(name, email, password)
    
                navigate('/login')
            })
    }

    return <Container tag="main" className="register page">
        <h1 className="title">Register</h1>
        <Form onSubmit={handleRegister}>
            <Input type="text" name="name" placeholder="Name" autoComplete="name" />
            <Input type="email" name="email" placeholder="Email" autoComplete="email" />
            <Input type="password" name="password" placeholder="Password" autoComplete="current-password" />
            <Button type="submit" >Register</Button>
            <Anchor><Link to="/register">Have an account? Go login</Link></Anchor>
        </Form>
    </Container>
}