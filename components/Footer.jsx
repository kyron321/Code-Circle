import React from "react";
import styles from "../css/footer.module.css";
import Image from "next/image";
import logo from "../images/Logo.svg";

export default function Footer() {
  return (
    <main className={styles.main}>
      <Image className={styles.logoStyle} alt="logo" src={logo} />
    </main>
  );
}
