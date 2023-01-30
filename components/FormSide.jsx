import { useRouter } from "next/router";
import Button from "./Button";
import arrow from "../images/arrow.svg";
import styles from "../css/login.module.css";

export default function FormSide({ title, descritpion }) {
  const router = useRouter();
  return (
    <div className={styles.sideContainer}>
      <div className={styles.sideTitle}>{title}</div>
      <div className={styles.description}>{descritpion}</div>
      <Button
        label={"Find Out More"}
        onClick={() => {
          router.push("/");
        }}
        image={arrow}
        className={styles.side_btn}
      />
    </div>
  );
}