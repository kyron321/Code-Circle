import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import HomePagePostCard from "../components/HomePagePostCard";
import { orderBy, query, getDocs, collection } from "firebase/firestore";
import styles from "../css/posts.module.css";
import Button from "./Button";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "./Loader";

async function getPosts() {
  const postsCol = collection(db, "posts");
  const orderByPostTimeQuery = query(postsCol, orderBy("postTime", "desc"));
  const getOrderedPosts = await getDocs(orderByPostTimeQuery);
  const postsList = getOrderedPosts.docs.map((doc) => doc.data());

  return postsList;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    getPosts(db).then((response) => {
      const postsArray = response.map((post) => {
        const newPost = {};
        newPost.postId = post.postId;
        newPost.user = post.user;
        newPost.postTitle = post.postTitle;
        newPost.projectDescription = post.projectDescription;
        newPost.programmingLanguage = post.programmingLanguage;
        newPost.timeToCode = post.timeToCode.replace("T", " ");
        newPost.timeZone = post.timeZone;
        return newPost;
      });
      setPosts(postsArray);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <h1>Welcome {user?.displayName}</h1>
          <Button
            type="primary"
            label="Create a Post"
            href={"/create-a-post"}
          />
        </div>
      )}
      {posts.map((post) => {
        return <HomePagePostCard key={post.postId} post={post} />;
      })}
    </main>
  );
}
