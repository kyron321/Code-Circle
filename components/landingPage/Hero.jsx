import Image from "next/image";
import waveyLines from "../../images/waveyLines.svg";
import landingPageImage from "../../images/landingPageImage.svg";
import styles from "../../css/hero.module.css";
import Button from "../../components/Button";
import arrow from "../../images/arrow.svg";
import { useRouter } from "next/router";


export default function Hero() {
  const router = useRouter()
  return (
    <main className={styles.mainStyle}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.waveyImage}
          src={waveyLines}
          alt="background wavey line styling"
        />
      </div>
      <div className={styles.overlayContainer}>
        <div className={styles.textContainer}>
          <div className={styles.title}>Get More Done with Code Circle</div>
          <div className={styles.subtitle}>
            Empowering developers to come together and create, our platform is
            your ultimate collaboration partner for coding success.
          </div>
          <Button
            label="Try Code Circle Free"
            size="medium"
            image={arrow}
            className={styles.Button}
            onClick={() => {
              router.push("/create-an-account");
            }}
          />
        </div>

        <Image
          src={landingPageImage}
          className={styles.landingPageImageStyle}
          alt="two people using video chat via a laptop"
        />
      </div>
    </main>
  );
}
