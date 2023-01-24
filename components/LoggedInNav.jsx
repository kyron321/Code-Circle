import React from 'react';
import styles from '../css/loggedInNav.module.css';
import Image from 'next/image';
import logo from '../images/Logo.svg';
import Link from 'next/link';
import defaultAvatar from '../images/default-avatar.svg';
import { TbMessage2 } from 'react-icons/tb';
import { useLogout } from '../hooks/useLogout';
import { useRouter } from "next/router";


export default function LoggedInNav() {
  //calls logout hook to logout
  const router = useRouter();
  const {logout} = useLogout()

  const handleLogout = (e)=>{
    e.preventDefault();
    logout()
    router.push("/")
  }
  return (
    <nav>
      <div className={styles.navContainer}>
        <Link href="/">
          <Image className={styles.logoStyle} alt="logo" src={logo} />
        </Link>

        <div className={styles.userInfoStyles}>
          <Link href="/users/:user_id">
            <Image
              className={styles.avatarImage}
              src={defaultAvatar}
              alt="user avatar"
            ></Image>
          </Link>
          <Link href="/messages">
            <TbMessage2 size={30} style={{ color: 'white' }} />{' '}
          </Link>
          <div>Username</div>
          <button
            onClick={(e)=>{handleLogout(e)}}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
