import SignupForm from "../components/SignupForm";
import FormSide from "../components/FormSide";
import styles from "../css/login.module.css";

export default function CreateAnAccount() {
  return (
    <div className={styles.login}>
      <FormSide
        title="Welcome to Code Circle 
        Join Us "
        descritpion="Empowering developers to come together and create, our platform is your ultimate collaboration partner for coding success."
      />
      <SignupForm />;
    </div>
  );
}