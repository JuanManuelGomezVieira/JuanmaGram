import { useState, useEffect } from 'react'
import retrieveUser from '../../logic/retrieveUser'
import toggleLikePost from '../../logic/toggleLikePost'
import deletePost from '../../logic/deletePost'
import toggleFavPost from '../../logic/toggleFavPost'
import isCurrentUser from '../../logic/isCurrentUser'
import getUserId from '../../logic/getUserId'
import { context } from '../../ui'
import { Container } from '../library'
import {useAppContext} from '../hooks/index'

export default function Post({ post: {id, image, text, date, likes, author, fav}, onEditPost, onToggledLikePost, onPostDeleted, onToggledFavPost }) {
    console.debug('Post -> Render')
    
    const { alert, freeze, unfreeze } = useAppContext()

    const [user, setUser] = useState()


    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)
                    return
                }

                setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()

            toggleLikePost(context.userId, id, error => {
                unfreeze()

                if (error) {
                    alert(error.message)
                    return
                }

                onToggledLikePost()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id, error => {
                if (error) {
                    alert(error.message)
                    return
                }

                onPostDeleted()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleFavPost(context.userId, id, error => {
                if (error) {
                    alert(error.message)
                    return
                }

                onToggledFavPost()
            })  
        } catch (error) {
            alert(error.message)
        }
    }

    const isCurrentUserPost = isCurrentUser(author.id)

    return <Container tag="article" className="single-post">
        <div className="post-item-user-info">
            <div className="post-item-user-avatar">
                {user && <img className="post-user-avatar-image" src={author.avatar} alt="Imagen de avatar del usuario conectado"/>}
            </div>
            <div className="post-item-user-info-name-and-date">
                {user && <div className="post-item-user-info-name"><p className="post-user-name-text">{author.name}</p></div>}
                <div className="post-item-separator-user-date">•</div>
                <div className="post-item-user-info-date"><time className="post-date">{date.toLocaleDateString()}</time></div>
            </div>
            <div className="post-item-user-info-options">
                {/*author.id === userId*/ isCurrentUserPost && <button onClick={handleEditPost} className="edit-post-button button">Edit</button>}
                {/*author.id === userId*/ isCurrentUserPost && <button onClick={handleDeletePost} className="edit-post-button button">Delete</button>}
            </div>
        </div>
        <img className="post-image" src={image} alt="Imagen del post"/>
        <div className="post-item-quick-actions">
            {likes && likes.find((element) => element === getUserId()) ? 
                <button className="material-symbols-outlined material-symbols-filled button nav-icon post-item-quick-actions-like" onClick={handleToggleLikePost}>favorite</button> : 
                <button className="material-symbols-outlined button nav-icon post-item-quick-actions-like" onClick={handleToggleLikePost}>favorite</button>
            }
            <button className="material-symbols-outlined button nav-icon post-item-quick-actions-comment">mode_comment</button>
            <button className="material-symbols-outlined button nav-icon post-item-quick-actions-share">share</button>
            {fav && fav.find((element) => element === id) ? 
                <button className="material-symbols-outlined material-symbols-filled button nav-icon post-item-quick-actions-save" onClick={handleToggleSavePost}>bookmark</button> :
                <button className="material-symbols-outlined button nav-icon post-item-quick-actions-save" onClick={handleToggleSavePost}>bookmark</button>
            }
        </div>
        <div className="post-item-likes">{likes && likes.length > 1 || !likes ? `${likes.length} Likes` : `${likes.length} Like`}</div>
        <section className="post-item-comments-section">
            {user && <p className="owner-name-first-comment">{user.name}</p>}
            <p className="owner-first-comment">{text}</p>
        </section>
    </Container> 
}