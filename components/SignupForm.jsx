import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { postUser } from "../hooks/postUser";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "../css/login.module.css";
import Image from "next/image";
import logo from "../images/Logo_Icon.svg";
import Link from "next/link";

const buttonVariants = {
  hover: {
    scale: 1.06,
  },
  tap: {
    scale: 0.99,
  },
};

export default function SignupForm() {
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [areAllTechCheckboxesUnselected, setAreAllTechCheckboxesUnselected] = useState(true);
  const { signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(emailInput, passwordInput, displayNameInput);
    postUser(displayNameInput, techStack);
    redirect();
  };

  const onChangeTechStack = (e) => {
    const techCheckboxes = [ ...e.target.parentElement.elements];

    if (e.target.checked) {
      setTechStack((currentTechStack) => {
        return [...currentTechStack, e.target.name];
      });
    } else {
      setTechStack((currentTechStack) => {
        const updatedTechStack = [];
        currentTechStack.forEach((tech) => {
          if (tech !== e.target.name) {
            updatedTechStack.push(tech);
          }
        });
        return updatedTechStack;
      });
    }

    const allCheckboxesUnselected = techCheckboxes.every((tech) => {
      return tech.checked === false;
    })

    setAreAllTechCheckboxesUnselected(allCheckboxesUnselected);
  };

  const handleDisplayNameInput = (e) => {
    setDisplayNameInput(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
    if (e.target.value === "") {
      setEmailInput(null);
    }
  };

  let router = useRouter();
  function redirect() {
    router.push("/home");
  }

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

        <h1>Create an Account</h1>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.inputStyle}
          type="text"
          placeholder="Enter a username"
          value={displayNameInput}
          onChange={handleDisplayNameInput}
          required
        />

        <br />

        <input
          className={styles.inputStyle}
          type="email"
          placeholder="Enter your email"
          value={emailInput}
          onChange={handleEmailInput}
          required
        />

        <br />

        <input
          className={styles.inputStyle}
          type="password"
          placeholder="Enter your password"
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          required
        />

        <Link className={styles.forgotPassword} href="/">
          Forgot Password?
        </Link>

        <fieldset className={styles.fieldset}>
          <legend>Tech stack:</legend>
          <input
            type="checkbox"
            id="html"
            name="HTML"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />

          <label htmlFor="html">HTML</label>

          <input
            type="checkbox"
            id="css"
            name="CSS"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="css">CSS</label>

          <input
            type="checkbox"
            id="javascript"
            name="JavaScript"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="javascript">JavaScript</label>

          <input
            type="checkbox"
            id="java"
            name="Java"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="java">Java</label>

          <input
            type="checkbox"
            id="php"
            name="PHP"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="php">PHP</label>

          <input
            type="checkbox"
            id="mysql"
            name="MySQL"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="mysql">MySQL</label>

          <input
            type="checkbox"
            id="lamp"
            name="LAMP"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="lamp">LAMP</label>
        </fieldset>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={styles.button}
          disabled={areAllTechCheckboxesUnselected}
        >
          Signup
        </motion.button>
        <div>
          {`Already have an account?`}{" "}
          <Link className={styles.forgotPassword} href="/login">
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}