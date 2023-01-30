import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import { useRouter } from "next/router";
import styles from "../css/login.module.css";
import logo from "../images/Logo_Icon.svg";
import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";

const buttonVariants = {
  hover: {
    scale: 1.06,
  },
  tap: {
    scale: 0.99,
  },
};

export default function LoginForm() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { signin, error } = useSignin();

  let router = useRouter();
  function redirect() {
    router.push("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(emailInput, passwordInput);
    redirect();
  };
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Image
          className={styles.logoStyle}
          alt="logo"
          src={logo}
          onClick={() => {
            router.push("/");
          }}
        />

        <h1>Login</h1>
        <h1>Welcome Back</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            className={styles.inputStyle}
            type="text"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            required
          />

          <input
            className={styles.inputStyle}
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
          />
          <Link className={styles.forgotPassword} href="/">
            Forgot Password?
          </Link>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={styles.button}
          >
            Login
          </motion.button>
          <div>
            {`Don't have an account?`}{" "}
            <Link className={styles.forgotPassword} href="/create-an-account">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}