import { useState, useEffect } from 'react'
import Posts from '../components/Posts'
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'
import retrieveUser from '../../../logic/retrieveUser'
import EditPostModal from '../components/EditPostModal'
import {useAppContext} from '../../hooks/index'
import './Home.css'
import logoutUser from '../../../logic/logoutUser'

export default function Home (/*{ onLoggedOut }*/) {
    console.debug('Home -> Render')

    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    const [user, setUser] = useState()
    const { alert, navigate } = useAppContext()

    useEffect(() => {
        try {
            // retrieveUser(context.token, (error, user) => {
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     setUser(user)
            // })
            retrieveUser()
                // .then(user => setUser(user))
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])


    const handleGoToPosts = () => {
        setView('posts')

        document.querySelector('.home').querySelector('.home-footer').querySelector('.home-button').classList.add('material-symbols-filled')
    }


    const handlePostUpdated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

    const handleOpenAddPostModal = event => {
        event.preventDefault()
        
        setModal('add-post')
        setView('posts')

        document.body.classList.add('block-scroll')
        
        const homeFooter = document.querySelector('.home').querySelector('.home-footer')
        homeFooter.querySelector('.add-post-button').classList.add('material-symbols-filled')
		homeFooter.querySelector('.home-button').classList.remove('material-symbols-filled')
    }

    const handleOpenEditPostModal = postId => {
        setModal('edit-post')
        setPostId(postId)
        
        document.body.classList.add('block-scroll')
    }

    const handleCloseModal = () => {
        setModal(null)
        setView('posts')

        document.body.classList.remove('block-scroll')
    }
    
    const handleGoToProfile = event => {
        event.preventDefault()
        
        setView('profile')
        setModal(null)
        
		document.querySelector('.home').querySelector('.home-footer').querySelector('.home-button').classList.remove('material-symbols-filled')
    }
    
    const handleUserUpdated = () => {
        try {
            retrieveUser()
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLogout = () => {
        // delete context.token

        /*
        onLoggedOut()
        */

        logoutUser()

        navigate('/login')
    }

    console.debug('Home -> Render')

    return <section className="home">
        <header className="home-header bg-basebgcolor">
            <button className="material-symbols-outlined button nav-icon"> for_you </button>
            <button className="material-symbols-outlined button nav-icon"> group </button>
            <button className="material-symbols-outlined button nav-icon"> star </button>
            <button className="material-symbols-outlined button nav-icon"> favorite </button>
            <button className="material-symbols-outlined button nav-icon"> chat </button>
        </header>

        <main className="post-list">
            {view === 'posts' && <Posts 
                onEditPost={handleOpenEditPostModal} 
                lastPostsUpdate={lastPostsUpdate} 
            />}

            {modal === 'add-post' && <AddPostModal 
                onCancel={handleCloseModal} 
                onPostCreated={handlePostUpdated} 
            />}

            {modal === 'edit-post' && <EditPostModal 
                onCancel={handleCloseModal} 
                onPostUpdated={handlePostUpdated} 
                postId={postId}
            />}

            {view === 'profile' && <Profile 
                onUserAvatarUpdated={handleUserUpdated} 
                onUserPasswordUpdated={handleUserUpdated} 
                onLoggedOut={handleLogout}
            />}
        </main>

        <div className="push"></div>

        <nav className="home-footer bg-basebgcolor">
            <button className="material-symbols-outlined material-symbols-filled nav-icon home-button" onClick={handleGoToPosts}>home</button>
            <button className="material-symbols-outlined nav-icon search-button">search</button>
            <button className="material-symbols-outlined nav-icon add-post-button" onClick={handleOpenAddPostModal}>add_circle</button>
            <button className="material-symbols-outlined nav-icon videos-button">movie</button>
            {user && <button className="home-footer-avatar-icon nav-icon" onClick={handleGoToProfile}><img className="home-footer-avatar" alt="avatar" src={user.avatar ? user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg'} /></button>}
        </nav>
    </section>
}