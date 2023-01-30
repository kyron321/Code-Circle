import React from "react";
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

export default function LoggedInNav() {
  //calls logout hook to logout
  const router = useRouter();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  };
  return (
    <nav>
      <div className={styles.navContainer}>
        <Link href={"/"}>
          <Image className={styles.logoStyle} alt="logo" src={logo} />
        </Link>
        <GiHamburgerMenu className={styles.hamburgerMenuStyle} />
        <div className={styles.buttonContainerStyle}>
          <div className={styles.userInfoStyles}>
            <Link href={"/"}>
              <Image
                className={styles.avatarImage}
                src={defaultAvatar}
                alt="user avatar"
                width={50}
                height={50}
              />
            </Link>
            <Link href={"/message"}>
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
