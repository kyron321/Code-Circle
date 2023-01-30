import React from 'react';
import Link from 'next/link';
import styles from '../css/posts.module.css'
import { useRouter } from 'next/router';

export default function HomePagePostCard({ post }) {
  const router = useRouter()
  const {postId} = router.query
  return (
    <div className={styles.post} onClick={()=>{
      router.push(`/posts/${post.postId}`)
    }}>
      <p>Post ID: {post.postId}</p>
      <p>User: {post.user}</p>
      <p>
        Post title:{' '}
        {post.postTitle}
      </p>
      <p>Project description: {post.projectDescription}</p>
      <p>Programming language: {post.programmingLanguage}</p>
      <p>Time to code: {post.timeToCode}</p>
      <p>Time zone: {post.timeZone}</p>
    </div>
  );
}
