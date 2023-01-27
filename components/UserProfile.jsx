import React, { useEffect, useState } from 'react';
import styles from '../css/userProfile.module.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Image from 'next/image';
import defaultAvatar from '../images/default-avatar.svg';
import { TbMessage2 } from 'react-icons/tb';
import { AiOutlinePhone } from 'react-icons/ai';

export default function UserProfile({ userName, userNameFromParams }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isSomeoneElsesProfile = userName !== userNameFromParams;

  // useEffect(() => {
  //   setIsLoading(true);
  //   async function getUser() {
  //     const usersCol = collection(db, 'users');
  //     const userQuery = query(
  //       usersCol,
  //       where('displayname', '==', `${userNameFromParams}`)
  //     );
  //     const usersSnapshot = await getDocs(userQuery);
  //     const usersList = usersSnapshot.docs.map((doc) => doc.data());
  //     return usersList;
  //   }
  //   getUser()
  //     .then((response) => {
  //       setUser(response[0]);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [userNameFromParams]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className={styles.profile}>
      <div className={styles.avatarAndNameContainer}>
        <Image
          className={styles.avatarStyle}
          alt="user Avatar"
          src={user?.avatar ? user?.avatar : defaultAvatar}
        />

        <h2 className={styles.displayName}>{userNameFromParams}</h2>
        {isSomeoneElsesProfile ? (
          <div className={styles.contactOtherUser}>
            <TbMessage2 size={30} style={{ color: 'white' }} />
            <AiOutlinePhone size={30} style={{ color: 'white' }} />
          </div>
        ) : null}
      </div>
      <div className={styles.techStack}>
        <h3>TechStack</h3>
        <div className={styles.techStack}>
          {user?.techstack?.map((tech) => {
            return <div key={tech}>{tech}</div>;
          })}
        </div>
      </div>
    </main>
  );
}
