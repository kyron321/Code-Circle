import { useRouter } from "next/router";
import Button from "./Button";
import arrow from "../images/arrow.svg";
import styles from "../css/login.module.css";

export default function FormSide({ title, description, button=null }) {
  const router = useRouter();
  return (
    <div className={styles.sideContainer}>
      <div className={styles.sideTitle}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.side_btn}>{button}</div>
    
    </div>
  );
}