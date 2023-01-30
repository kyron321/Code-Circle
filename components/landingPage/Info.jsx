import Button from "../Button";
import arrow from "../../images/arrow.svg";
import router from "next/router";
import styles from "../../css/info.module.css";

export default function Info() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>Your work, everywhere you are</div>
        <div className={styles.subtitle}>
          With our innovative platform, take your work with you wherever you go.
          Collaborate with your team, access your projects, and stay productive
          no matter where you are. Say goodbye to geographical boundaries and
          hello to seamless collaboration, anytime, anywhere.
        </div>
        <Button
          type="primary"
          className={styles.button}
          image={arrow}
          label="Try Code Circle"
          onClick={() => {
            router.push("/create-an-account");
          }}
        />
      </div>
    </div>
  );
}