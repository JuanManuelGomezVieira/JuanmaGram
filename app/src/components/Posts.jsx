import retrievePosts from '../../../logic/retrievePosts'
import Post from './Post'
import { useState, useEffect } from 'react'
import {useAppContext} from '../../hooks/index'


export default function Posts ({ onEditPost, lastPostsUpdate }) {
    console.debug('Posts -> Render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()
    
    useEffect(() => handleRefreshPosts(), [])
    
    const handleRefreshPosts = () => {
        try {
            freeze()
            
            retrievePosts()
                .then(setPosts)
                .catch(error => alert(error.message))
                .finally(unfreeze)
            } catch (error) {
                alert(error.message)
                unfreeze()
        }
    }
    
    /*
    useEffect(() => {
        console.debug ('Posts -> "componentDidMount" with useEffect hook')
        
        return () => console.debug('Posts -> "componentDidUnmount" with useEffect hook')
    }, [])
    */ 
    
    useEffect(() => {
        console.debug ('Posts -> "componentWillReceiveProps" with useEffect hook')
        
        if (lastPostsUpdate)
        handleRefreshPosts()
    }, [lastPostsUpdate])

    return <section>
        {posts && posts.map(post => < Post 
            key={post.id} 
            post={post} 
            onEditPost={onEditPost} 
            onToggledLikePost={handleRefreshPosts} 
            onPostDeleted={handleRefreshPosts}
            onToggledFavPost={handleRefreshPosts}
        />)}
    </section>
}