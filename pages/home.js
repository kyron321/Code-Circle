import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import HomePagePostCard from '../components/HomePagePostCard';
import {
  orderBy,
  query,
  getDocs,
  collection,
} from 'firebase/firestore';


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
    getPosts(db).then((response) => {
      const postsArray = response.map((post) => {
        const newPost = {};
        newPost.postId = post.postId;
        newPost.user = post.user;
        newPost.postTitle = post.postTitle;
        newPost.projectDescription = post.projectDescription;
        newPost.programmingLanguage = post.programmingLanguage;
        newPost.timeToCode = post.timeToCode.replace('T', ' ');
        newPost.timeZone = post.timeZone;
        return newPost;
      });
      setPosts(postsArray);
    });
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
