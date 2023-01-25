// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import HomePagePostCard from '../components/HomePagePostCard';

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

export default function Home() {
    const [posts, setPosts] = useState( [] );

    useEffect(() => {
        getPosts(db)
            .then((response) => {
                setPosts(response);
            })
    }, []);

    function handleSubmit(e) {
        // e.preventDefault();
    }

    return (
        <main>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Homepage</h1>
            <form onSubmit={handleSubmit}>
                <Link href="/create-a-post"><button>Make a post</button></Link>
            </form>
            {posts.map((post) => {
                return <HomePagePostCard key={post.postTitle} post={post}/>
            })}
            
        </main>
    )
}