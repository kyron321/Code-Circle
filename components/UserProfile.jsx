import React, { useEffect, useState } from "react";
import styles from "../css/userProfile.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Image from "next/image";
import defaultAvatar from "../images/default-avatar.svg";
import { TbMessage2 } from "react-icons/tb";
import { AiOutlinePhone } from "react-icons/ai";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";

export default function UserProfile({ userName }) {
  const [profilePageUser, setProfilePageUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();
  const userNameFromParams = router.query.displayname;

  let messageChannel;

  function createChannel() {
    if (user.displayName > userNameFromParams) {
      messageChannel = userNameFromParams + user.displayName;
    } else
        messageChannel =  user.displayName + userNameFromParams;
        return messageChannel;
  }

  // if (user.displayName !== null && user.displayName > userNameFromParams) {
  //   messageChannel = userNameFromParams + user.displayName;
  // }
  // else if (user.displayName !== null)
  //   messageChannel = user.displayName + userNameFromParams;

  console.log(messageChannel);

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !userNameFromParams) return;

    async function getUser() {
      const usersCol = collection(db, "users");
      const userQuery = query(
        usersCol,
        where("displayname", "==", `${userNameFromParams}`)
      );
      const usersSnapshot = await getDocs(userQuery);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      return usersList;
    }
    getUser()
      .then((response) => {
        setProfilePageUser(response[0]);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.isReady, userNameFromParams]);

  const isSomeoneElsesProfile = userName !== userNameFromParams;

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className={styles.profile}>
      <div className={styles.avatarAndNameContainer}>
        <Image
          className={styles.avatarStyle}
          alt="user Avatar"
          src={
            profilePageUser?.avatar ? profilePageUser?.avatar : defaultAvatar
          }
        />

        <h2 className={styles.displayName}>{userNameFromParams}</h2>
        {isSomeoneElsesProfile ? (
          <div className={styles.contactOtherUser}>
            <button onClick={() => router.push(`/message/${createChannel()}`)}>
              <TbMessage2 size={30} style={{ color: "white" }} />
            </button>

            <AiOutlinePhone size={30} style={{ color: "white" }} />
          </div>
        ) : null}
      </div>
      <div className={styles.techStack}>
        <h3>TechStack</h3>
        <div className={styles.techStack}>
          {profilePageUser?.techstack?.map((tech) => {
            return <div key={tech}>{tech}</div>;
          })}
        </div>
      </div>
    </main>
  );
}
