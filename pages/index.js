import Image from "next/image";
import waveyLines from "../images/waveyLines.svg";
import landingPageImage from "../images/landingPageImage.svg";
import styles from "../css/landing-page.module.css";

export default function Home() {
  return (
    <main className={styles.mainStyle}>
      <section className={styles.sectionStyle}>
        <Image
          className={styles.waveyLinesStyle}
          src={waveyLines}
          alt="background wavey line styling"
        ></Image>{" "}
        <div className={styles.blurbContainerStyle}>
          <div className={styles.blurbHeaderStyle}>
            Get More Done with Code Circle
          </div>
          <div className={styles.blurbBodyStyle}>
            Empowering developers to come together and create, our platform is
            your ultimate collaboration partner for coding success.
          </div>
        </div>
        <Image
          src={landingPageImage}
          className={styles.landingPageImageStyle}
          alt="two people using video chat via a laptop"
        />
      </section>
    </main>
  );
}

