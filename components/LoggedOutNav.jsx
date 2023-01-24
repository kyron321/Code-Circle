import logo from "../images/Logo.svg";
import arrow from "../images/arrow.svg";
import Image from "next/image";
import styles from "../css/loggedOutNav.module.css";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoggedOutNav() {
  const router = useRouter();

  return (
    <nav>
      <div className={styles.navContainer}>
      <Link href="/">
          <Image className={styles.logoStyle} alt="logo" src={logo} />
        </Link>
        <div className={styles.buttonContainerStyle}>
          <button
            className={styles.loginButtonStyle}
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </button>
          <button onClick={()=>{router.push('/create-an-account')}} className={styles.tryCodeCircleButtonStyle}>
            <div className={styles.tryCodeText}>Try Code Circle free</div>
            <Image src={arrow} alt="button arrow" />
          </button>
        </div>
      </div>
    </nav>
  );
}
