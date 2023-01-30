import FormSide from "../components/FormSide";
import LoginForm from "../components/LoginForm";
import styles from "../css/login.module.css";

export default function Login() {
  return (
    <div className={styles.login}>
      <FormSide
        title="Welcome Back to Code Circle"
        descritpion="Empowering developers to come together and create, our platform is your ultimate collaboration partner for coding success."
      />
      <LoginForm />
    </div>
  );
}