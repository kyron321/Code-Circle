// TEST ONLY. Will not be in final project.

import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';


async function getPosts(db) {    
    const postsCol = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCol);
    const postsList = postsSnapshot.docs.map(doc => doc.data());
    return postsList;
}

export default function Posts() {
    const [posts, setPosts] = useState( [] );

    useEffect(() => {
        getPosts(db)
            .then((response) => {
                setPosts(response);
            })
    }, []);

    return (
        <main>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Posts</h1>
            {posts.map((post) => {
                return (
                    <div key={post.postTitle}>
                        <p>Post ID: {post.postId}</p>
                        <p>Post title: {post.postTitle}</p>
                        <p>Programming language: {post.programmingLanguage}</p>
                        <p>Time to code: {post.timeToCode.seconds}</p>
                        <p>Time zone: {post.timeZone}</p>
                        <p>Project description: {post.projectDescription}</p>
                    </div>                   
                )
            })}
        </main>
    )
}