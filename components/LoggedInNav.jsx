import React, { useState } from "react";
import styles from "../css/loggedInNav.module.css";
import Image from "next/image";
import logo from "../images/Logo.svg";
import Link from "next/link";
import defaultAvatar from "../images/default-avatar.svg";
import { TbMessage2 } from "react-icons/tb";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import Modal from "./Modal";

export default function LoggedInNav() {
  //calls logout hook to logout
  const router = useRouter();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  const [showModal, setShowModal] = useState(false);

  const modal = (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      {user.photoURL ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={user.photoURL}
          alt="profile "
          className={styles.avatarImage}
          onClick={() => {
            router.push(`/users/${user?.displayName}`);
          }}
        />
      ) : (
        <Image src={defaultAvatar} alt="profile" className={styles.avatarImage} />
      )}
     
      <div>Logged in {user.displayName}</div>
      <Link href="/conversations" className={styles.message_container}>
        <TbMessage2 size={30} className={styles.messages} />{" "}
        <span className={styles.messages}>Messages</span>
      </Link>
      <Button
        label="Logout"
        onClick={(e) => {
          handleLogout(e);
        }}
        className={styles.logoutButton}
      />
    </Modal>
  );

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  };
  return (
    <nav>
      <div className={styles.navContainer}>
        <Link href={"/home"}>
          <Image className={styles.logoStyle} alt="logo" src={logo} />
        </Link>
        {modal}
        <GiHamburgerMenu
          onClick={() => {
            setShowModal(!showModal);
          }}
          className={styles.hamburgerMenuStyle}
        />
        <div className={styles.buttonContainerStyle}>
          <div className={styles.userInfoStyles}>
           
            {user.photoURL ? (
               /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.photoURL}
              alt="profile "
              className={styles.avatarImage}
              onClick={() => {
                router.push(`/users/${user?.displayName}`);
              }}
            /> ) : (
              <Image src={defaultAvatar} alt="profile" className={styles.avatarImage} />
            )}
            <Link href={"/conversations"}>
              <TbMessage2 size={30} style={{ color: "white" }} />{" "}
            </Link>
            <div className={styles.username}>{user.displayName}</div>
          </div>
          <Button
            label="Logout"
            onClick={(e) => {
              handleLogout(e);
            }}
          />
        </div>
      </div>
    </nav>
  );
}
