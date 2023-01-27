import styles from '../css/pastPosts.module.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import ProfilePagePostCard from './ProfilePagePostCard';
import { useRouter } from 'next/router';

export default function PastPosts() {
  const [pastPosts, setPastPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  console.log(router);
  const userNameFromParams = router.query.displayname;

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !userNameFromParams) return;
    const getUserPosts = async () => {
      const postsCol = collection(db, 'posts');
      const postQuery = query(
        postsCol,
        where('user', '==', userNameFromParams)
      );

      const postsSnapshot = await getDocs(postQuery);
      const postList = postsSnapshot.docs.map((doc) => doc.data());
      return postList;
    };
    getUserPosts()
      .then((response) => {
        setPastPosts(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.isReady, userNameFromParams]);

  if (isLoading) return <div>Loading...</div>;

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
