import React from 'react';
import styles from '../css/loggedInNav.module.css';
import Image from 'next/image';
import logo from '../images/Logo.svg';
import Link from 'next/link';
import defaultAvatar from '../images/default-avatar.svg';
import { TbMessage2 } from 'react-icons/tb';

export default function LoggedInNav() {
  const handleLogout = () => {};
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
            onClick={() => handleLogout()}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
