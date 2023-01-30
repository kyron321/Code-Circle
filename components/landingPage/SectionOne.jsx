import Image from "next/image";
import styles from "../../css/sectionOne.module.css";
import Button from "../../components/Button";
import arrow from "../../images/arrow.svg";
import collabImg from "../../images/collab-img.png";

export default function SectionOne() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectiontextContainer}>
          <div className={styles.title}>Code Sharing and Collaboration</div>
          <div className={styles.subtitle}>
            Users would be able to join video meetings and communicate with one
            another in real-time. This could include features like screen
            sharing, annotation, and whiteboarding to help users collaborate on
            visual elements of the video
          </div>
          <Button
            label="Get Started"
            size="medium"
            type="secondary"
            image={arrow}
            className={styles.Button}
            onClick={() => {
              router.push("/create-an-account");
            }}
          />
        </div>

        <Image
          src={collabImg}
          className={styles.image}
          alt="two people using video chat via a laptop"
        />
      </div>
    </section>
  );
}