import logo from "../images/Logo.svg";
import arrow from "../images/arrow.svg";
import Image from "next/image";
import styles from "../css/loggedOutNav.module.css";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";

export default function LoggedOutNav() {
  const router = useRouter();

  return (
    <nav>
      <div className={styles.navContainer}>
        <Link href="/">
          <Image className={styles.logoStyle} alt="logo" src={logo} />
        </Link>
        <GiHamburgerMenu className={styles.hamburgerMenuStyle} />
        <div className={styles.buttonContainerStyle}>
          <Button
            label="Login"
            type="primary"
            size="medium"
            onClick={() => {
              router.push("/login");
            }}
          />
          <Button
            label="Try Code Circle free"
            type="secondary"
            size="medium"
            image={arrow}
            onClick={() => {
              router.push("/create-an-account");
            }}
          />
        </div>
      </div>
    </nav>
  );
}