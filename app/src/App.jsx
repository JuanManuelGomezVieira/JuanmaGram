import { useState } from 'react'
import Login from './view/pages/Login'
import Register from './view/pages/Register'
import Home from './view/pages/Home'
import Alert from './components/Alert'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import isUserLoggedIn from './logic/isUserLoggedIn'

const { Provider } = AppContext

export default function App () {
  console.debug('App -> Render')

  // const [view, setView] = useState( isTokenValid(context.token) && isTokenAlive(context.token) ? 'home' : 'login' )
  // const [view, setView] = useState('home')
  const [feedback, setFeedback] = useState (null)
  const [loader, setLoader] = useState (false)
  const navigate = useNavigate()
/*
  const handleGoToRegister = () => setView('register')
  const handleGoToLogin = () => setView('login')
  const handleGoToHome = () => setView('home')
*/
  const handleAcceptAlert = () => setFeedback(null)

  const alert = (message, level = 'info') => setFeedback({ message, level})
  const freeze = () => setLoader(true)
  const unfreeze = () => setLoader(false)
/*
  const contextValue = useMemo(() => {
    const alert = (message, level = 'info') => setFeedback({ message, level})
    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)

    return {
      alert,
      freeze,
      unfreeze
    }
  }, [setFeedback, setLoader])
  */
  return <Provider value={{ alert, freeze, unfreeze, navigate }}/*{contextValue}*/ >
      {/*view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
      {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
      {view === 'home' && <Home onLoggedOut={handleGoToLogin} />*/}

      <Routes>
        <Route path="/login" element={/*isTokenValid(context.token) && isTokenAlive(context.token)*/ isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
      </Routes>

      {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
      {loader && <Loader />}
  </Provider>
}