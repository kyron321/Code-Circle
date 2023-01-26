import { useRouter } from 'next/router';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import { app } from '../../firebase/config';

const db = getFirestore(app);

// Gets all posts from Firestore database
async function getPosts(db) {
  const postsCol = collection(db, "posts");
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map((doc) => doc.data());
  return postsList;
}

export default function SinglePost() {
  const [ posts, setPosts ] = useState( [] );

  var router = useRouter();
  var pid = router.query["pid"];

  useEffect(() => {
    getPosts(db)
        .then((response) => {
          setPosts(response)
        })
  }, []);

  const postToRender = posts.filter((post) => {
    return post.postId === pid;
  })

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>{postToRender[0]?.postTitle}</h1>
      <p>User: {postToRender[0]?.user}</p>
      <p>Programming language: {postToRender[0]?.programmingLanguage}</p>
      <p>Time to code: {postToRender[0]?.timeToCode.replace("T", " ")}</p>
      <p>Time zone: {postToRender[0]?.timeZone}</p>
      <p>{postToRender[0]?.projectDescription}</p>
      <h1>{postToRender[0]?.postTitle}</h1>
    </div>
  )
}