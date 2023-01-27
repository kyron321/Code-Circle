import styles from '../css/pastPosts.module.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import ProfilePagePostCard from './ProfilePagePostCard';

export default function PastPosts({ userNameFromParams }) {
  const [pastPosts, setPastPosts] = useState([]);

  // useEffect(() => {
  //   getUserPosts().then((response) => {
  //     setPastPosts(response);
  //   });
  // }, []);


  const getUserPosts = async () => {
    const postsCol = collection(db, 'posts');
    const postQuery = query(postsCol, where('user', '==', userNameFromParams));

    const postsSnapshot = await getDocs(postQuery);
    const postList = postsSnapshot.docs.map((doc) => doc.data());
    return postList;
  };

  return (
    <div>
      <div className={styles.pastPostContainer}>
        {pastPosts?.map((post) => {
          console.log(post);
          return <ProfilePagePostCard props={post} key={post.title} />;
        })}
      </div>
    </div>
  );
}
