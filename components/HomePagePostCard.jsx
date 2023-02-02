import React from "react";
import Link from "next/link";
import styles from "../css/posts.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import profilePlaceholder from "../images/profilePlaceholder.png";
import imagePlaceholder from "../images/image-placeholder.svg";
import moment from "moment/moment";
import { useAuthContext } from "../hooks/useAuthContext";

export default function HomePagePostCard({ post, replyCountByPostId }) {
  const router = useRouter();
  const { postId } = router.query;
  const replyCountObject = Object.assign({}, ...replyCountByPostId);
  const { user } = useAuthContext();

  return (
    <div
      className={styles.post}
      onClickCapture={() => {
        router.push(`/posts/${post.postId}`);
      }}
    >
      <div className={styles.mainContainer}>
        <div className={styles.colOne}>
          <div className={styles.profileContainer}>
            {post.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.photoURL}
                alt="profile "
                className={styles.profileImage}
                onClick={() => {
                  router.push(`/users/${user?.displayName}`);
                }}
              />
            ) : (
              <Image
                src={profilePlaceholder}
                alt="profile"
                className={styles.profileImage}
                onClick={() => {
                  router.push(`/users/${user?.displayName}`);
                }}
              />
            )}
          </div>
          <div className={styles.colTwo}>
            <div className={styles.userInfo}>
              <div
                onClick={() => {
                  router.push(`/users/${post.user}`);
                }}
                className={styles.atUser}
              >
                @{post.user} in
              </div>
              <div className={styles.programmingLanguage}>
                {post.programmingLanguage}
              </div>
              <div className={styles.time}>
                Today <span>at</span> 16:12pm
              </div>
            </div>

            <div className={styles.details}>
              <div>
                <div className={styles.title}>{post.postTitle}</div>
                <div className={styles.description}>
                  {post.projectDescription}
                </div>
              </div>
              <div>
                <div>
                  Time to code: {moment(post.timeToCode).format("MMMM Do YYYY")}{" "}
                  at {moment(post.timeToCode).format("HH:MM a")}
                </div>
                <div>Time zone: {post.timeZone}</div>
              </div>
            </div>
          </div>
          <div className={styles.colThree}>
            <Image
              src={imagePlaceholder}
              className={styles.image}
              alt="image placeholder"
            />
          </div>
        </div>
      </div>
      <div className={styles.replies}>
        <div>
          <BiMessageRounded className={styles.messageIcon} />
        </div>
        <div>{replyCountObject[post.postId]}</div>
      </div>
    </div>
  );
}
