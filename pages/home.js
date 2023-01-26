import Link from 'next/link';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import HomePagePostCard from '../components/HomePagePostCard';
import {
  getFirestore,
  orderBy,
  query,
  getDocs,
  collection,
} from 'firebase/firestore';

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

async function getPosts() {
  const postsCol = collection(db, 'posts');
  const orderByPostTimeQuery = query(postsCol, orderBy('postTime', 'desc'));
  const getOrderedPosts = await getDocs(orderByPostTimeQuery);
  const postsList = getOrderedPosts.docs.map((doc) => doc.data());

  return postsList;
}

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((response) => {
      console.log(response);
      const postsArray = response.map((post) => {
        const newPost = {};
        newPost.postId = post.postId;
        newPost.postTitle = post.postTitle;
        newPost.projectDescription = post.projectDescription;
        newPost.programmingLanguage = post.programmingLanguage;
        newPost.timeToCode = post.timeToCode.replace('T', ' ');
        newPost.timeZone = post.timeZone;
        newPost.timePosted = post.postTime;
        return newPost;
      });
      setPosts(postsArray);
    });
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

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
      <form>
        <Link href="/create-a-post">
          <button>Make a post</button>
        </Link>
      </form>
      {posts.map((post) => {
        return <HomePagePostCard key={post.postId} post={post} />;
      })}
    </main>
  );
}
