import Image from "next/image";
import wtImage from "../../images/wtImage.png";
import styles from "../../css/sectionTwo.module.css";
import Button from "../../components/Button";
import arrow from "../../images/arrow.svg";
import router from "next/router";

export default function SectionTwo() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionTextContainer}>
          <div className={styles.title}>Chat and file sharing</div>
          <div className={styles.subtitle}>
            With code circle, users would be able to communicate and share files
            with one another, such as code snippets, documentation and other
            related assets, throughout the development process.
          </div>
          <Button
            label="Try it Now"
            size="medium"
            type="secondary"
            onClick={() => {
              router.push("/create-an-account");
            }}
            image={arrow}
            className={styles.Button}
          />
        </div>

        <Image
          src={wtImage}
          className={styles.image}
          alt="two people using video chat via a laptop"
        />
      </div>
    </main>
  );
}