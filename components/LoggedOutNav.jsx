import logo from "../images/Logo.svg";
import arrow from "../images/arrow.svg";
import Image from "next/image";
import styles from "../css/loggedOutNav.module.css";
import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
export default function LoggedOutNav() {
  //get user from context
  const { user } = useAuthContext();
  console.log(user)
  return (
    <nav>
      <div className={styles.navContainer}>
        <Image className={styles.logoStyle} alt="logo" src={logo} />
        <div className={styles.buttonContainerStyle}>
          <button className={styles.loginButtonStyle}>Login</button>
          <button className={styles.tryCodeCircleButtonStyle}>
            <div className={styles.tryCodeText}>Try Code Circle free</div>{" "}
            <Image src={arrow} alt="button arrow" />
          </button>
        </div>
      </div>
    </nav>
  );
}
