import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import HomePagePostCard from '../components/HomePagePostCard';
import { orderBy, query, getDocs, collection } from 'firebase/firestore';
import styles from '../css/posts.module.css';
import Button from './Button';
import { useAuthContext } from '../hooks/useAuthContext';
import Loader from './Loader';
import { useRouter } from 'next/router';
import { FaHotjar, FaSort } from 'react-icons/fa';
import { getReplies } from '../hooks/getReplies';

async function getPosts() {
  const postsCol = collection(db, 'posts');
  const orderByPostTimeQuery = query(postsCol, orderBy('postTime', 'desc'));
  const getOrderedPosts = await getDocs(orderByPostTimeQuery);
  const postsList = getOrderedPosts.docs.map((doc) => doc.data());

  return postsList;
}

async function searchPosts(searchTerm) {
  const postsCol = collection(db, 'posts');
  const orderByPostTimeQuery = query(postsCol, orderBy('postTime', 'desc'));
  const getOrderedPosts = await getDocs(orderByPostTimeQuery);
  const postsList = getOrderedPosts.docs.map((doc) => doc.data());
  const filteredPosts = postsList.filter((post) => {
    return (
      post.programmingLanguage
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      post.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.projectDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return filteredPosts;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    searchPosts(searchTerm).then(setPosts);
  }, [searchTerm]);

  useEffect(() => {
    getReplies().then((response) => {
      setReplies(response);
    });
  }, []);
  const replyCountByPostId = posts.map((post) => {
    let count = 0;
    replies.forEach((reply) => {
      if (reply.postId === post.postId) {
        count++;
      }
    });

    const idOfPost = post.postId;
    const postWithReplyCount = { [idOfPost]: count };
    return postWithReplyCount;
  });
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
      setIsLoading(false);
    });
  }, []);

  if (!isLoading && posts.length === 0) {
    return (
      <div className={styles.noResults}>
        <div
          onClick={() => {
            setSearchTerm('');
          }}
          className={styles.searchAgain}
        >
          {'< Search Again'}
        </div>
        <div className={styles.title}>No Results Found</div>
      </div>
    );
  } else {
    return (
      <main className={styles.container}>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <div className={styles.header}>
            <div className={styles.hotContainer}>
              <FaHotjar className={styles.hot} /> Hot
            </div>
            <div className={styles.sortContainer}>
              <FaSort className={styles.sort} /> Sort
            </div>
            <form className={styles.form}>
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
                placeholder="Search Posts"
                className={styles.input}
                required
              />
            </form>

            <Button
              type="secondary"
              label="Create a Post"
              href={'/create-a-post'}
            />
          </div>
        )}
        {posts.map((post) => {
          return (
            <HomePagePostCard
              key={post.postId}
              post={post}
              replyCountByPostId={replyCountByPostId}
            />
          );
        })}
      </main>
    );
  }
}
