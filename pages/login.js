import FormSide from "../components/FormSide";
import LoginForm from "../components/LoginForm";
import styles from "../css/login.module.css";
import Button from "../components/Button";
import arrow from "../images/arrow.svg";

export default function Login() {
  return (
    <div className={styles.login}>
      <FormSide
        title="Welcome Back to Code Circle"
        description="Empowering developers to come together and create, our platform is your ultimate collaboration partner for coding success."
        button={
          <Button
            label={"Find Out More"}
            onClick={() => {
              router.push("/");
            }}
            image={arrow}
            className={styles.side_btn}
          />
        }
      />
      <LoginForm />
    </div>
  );
}
