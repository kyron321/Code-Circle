import React from "react";
import styles from "../css/footer.module.css";
import Image from "next/image";
import logo from "../images/Logo.svg";
import Button from "./Button";
import arrow from "../images/arrow.svg";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image className={styles.logoStyle} alt="logo" src={logo} />
          <p className={styles.paragraph}>
            Code Circle was created for the new ways we live and work. We make a
            better workspace around the world.
          </p>
        </div>
        <div className={styles.teamMembers}>
          <div className={styles.heading}>Team Array of Sunshine</div>
          <div className={styles.notLastTeamMember}>
            <a href="https://github.com/Nasramohammed">Nasramohammed</a>
          </div>
          <div className={styles.notLastTeamMember}>
            <a href="https://github.com/richnw">Rich</a>
          </div>
          <div className={styles.notLastTeamMember}>
            <a href="https://github.com/johnnyfwk">Johnny</a>
          </div>
          <div className={styles.notLastTeamMember}>
            <a href="https://github.com/JoeDGit">Joe</a>
          </div>
          <div className={styles.notLastTeamMember}>
            <a href="https://github.com/kyron321">Kyron</a>
          </div>
        </div>
        <div>
          <Button
            label="Github Repository"
            image={arrow}
            className={styles.button}
            href={'https://github.com/kyron321/Code-Circle'}
            target="_blank"
          />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.copyRight}>
          <p>© 2023 Code Circle. All rights reserved.</p>
        </div>
        <div className={styles.socialMedia}>
          <a href="https://www.facebook.com/">
            <BsFacebook className={styles.socialMediaIcon} />
          </a>
          <a href="https://www.instagram.com/">
            <BsInstagram className={styles.socialMediaIcon} />
          </a>
          <a href="https://twitter.com/">
            <BsTwitter className={styles.socialMediaIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}