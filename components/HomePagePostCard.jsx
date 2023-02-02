import React from "react";
import Link from "next/link";
import styles from "../css/posts.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import profilePlaceholder from "../images/profilePlaceholder.png";
import imagePlaceholder from "../images/image-placeholder.svg";
import moment from "moment/moment";

export default function HomePagePostCard({ post, replyCountByPostId }) {
  const router = useRouter();
  const { postId } = router.query;
  const replyCountObject = Object.assign({}, ...replyCountByPostId);
  const date = new Date(post.postTime);
  const readableDate = date.toLocaleDateString('en-GB');
  const readableTime = date.toLocaleTimeString('en-GB').slice(0, 5);
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
            <Image
              src={profilePlaceholder}
              width={60}
              height={60}
              alt="profile placeholder"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.colTwo}>
            <div className={styles.userInfo}>
              <div className={styles.atUser}>
                <Link href={`/users/${post.user}`}>@{post.user} </Link> in
              </div>
              <div className={styles.programmingLanguage}>
                {post.programmingLanguage}
              </div>
              <div className={styles.time}>
                Today <span style={{ color: 'black' }}>at</span> {readableTime}
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
