import Image from "next/image";
import waveyLines from "../images/waveyLines.svg";
import landingPageImage from "../images/landingPageImage.svg";
import styles from "../css/landing-page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.sectionStyle}>
        <Image
          className={styles.waveyLinesStyle}
          src={waveyLines}
          alt="background wavey line styling"
        ></Image>{" "}
        <div className={styles.blurbContainerStyle}>
          <div id="blurb-header" style={blurbHeaderStyle}>
            Get More Done with Code Circle
          </div>
          <div id="blurb-body" style={blurbBodyStyle}>
            Empowering developers to come together and create, our platform is
            your ultimate collaboration partner for coding success.
          </div>
          <button>Try Code Circle</button>
        </div>
        <Image
          src={landingPageImage}
          style={landingPageImageStyle}
          alt="two people using video chat via a laptop"
        />
      </section>
    </>
  );
}

const sectionStyle = {
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  isolation: "isolate",
  position: "absolute",
  width: "100vw",
  height: "829px",
  left: "0px",
  top: "92px",

  background: "#043873",
};

const waveyLinesStyle = {
  position: "absolute",
  width: "100vw",
};

const landingPageImageStyle = {
  width: "824px",
  height: "549px",
  flex: "none",
  order: "0",
  flexGrow: "0",
  borderRadius: "15px",
  marginRight: "6em",
  zIndex: "1",
};

const blurbContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px",
  gap: "60px",
  width: "656px",
  height: "347px",
  flex: "none",
  order: "1",
  flexGrow: "1",
  zIndex: "1",
  marginLeft: "8em",
};

const blurbHeaderStyle = {
  width: "656px",
  height: "140px",
  fontFamily: "Archivo",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "64px",
  lineHeight: "70px",
  letterSpacing: "-0.02em",
  color: "#FFFFFF",
  flex: "none",
  order: "0",
  alignSelf: "stretch",
  flexGrow: "0",
};

const blurbBodyStyle = {
  width: "656px",
  height: "60px",
  fontFamily: "Quicksand",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "30px",
  letterSpacing: "-0.02em",
  color: "#FFFFFF",
  flex: "none",
  order: "1",
  alignSelf: "stretch",
  flexGrow: "0",
};
