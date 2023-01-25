import React from "react";
import styles from "../css/footer.module.css";
import Image from "next/image";
import logo from "../images/Logo.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image className={styles.logoStyle} alt="logo" src={logo} />
      <p> By Team Array of Sunshine</p>
      <p>
        <a href="https://github.com/kyron321/Code-Circle">
          Code Circle on Github
        </a>
      </p>
      <ul>
        <li className={styles.notLastTeamMember}>
          <a href="https://github.com/Nasramohammed">Nasramohammed</a>
        </li>
        <li className={styles.notLastTeamMember}>
          <a href="https://github.com/richnw">richnw</a>
        </li>
        <li className={styles.notLastTeamMember}>
          <a href="https://github.com/johnnyfwk">johnnyfwk</a>
        </li>
        <li className={styles.notLastTeamMember}>
          <a href="https://github.com/JoeDGit">JoeDGit</a>
        </li>
        <li>
          <a href="https://github.com/kyron321">kyron321</a>
        </li>
      </ul>
    </footer>
  );
}
