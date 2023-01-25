// TEST ONLY. Will not be in final project.

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import { query, orderBy, limit } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: 'AIzaSyDxBm0urtZBgYT5vP84OsqDzoMqHr0CNtI',
    authDomain: 'code-circle--x.firebaseapp.com',
    projectId: 'code-circle--x',
    storageBucket: 'code-circle--x.appspot.com',
    messagingSenderId: '250555057230',
    appId: '1:250555057230:web:b0b6fe6f763bc2f458ef1f',
    measurementId: 'G-LHZ1H9YKED',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
            <h1>Users</h1>
            {posts.map((post) => {
                return (
                    <div key={post.postTitle}>
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