import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { postUser } from "../hooks/postUser";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "../css/login.module.css";
import Image from "next/image";
import logo from "../images/Logo_Icon.svg";
import Link from "next/link";
import LoaderButton from "./LoaderButton";

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
  const [areAllTechCheckboxesUnselected, setAreAllTechCheckboxesUnselected] =
    useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, error, isPending } = useSignup();
  const router = useRouter();

  //only signup if there is no error
  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(displayNameInput, techStack);
    signup(emailInput, passwordInput, displayNameInput, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 1000000) {
      setThumbnailError("Image file size must be less than 10mb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  useEffect(() => {
    if (isPending === false && error === null) {
      router.push("/home");
    }
  }, [error, isPending, router]);
  const onChangeTechStack = (e) => {
    const techCheckboxes = [...e.target.parentElement.elements];

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
    });

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

  useEffect(() => {
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      setErrorMessage("Email already in use");
    } else if (error === "Firebase: Error (auth/invalid-email).") {
      setErrorMessage("Invalid email");
    } else if (
      error ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      setErrorMessage("Password should be at least 6 characters");
    } else {
      setErrorMessage(null);
      setErrorMessage(null);
    }
  }, [error]);

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

        <fieldset className={styles.fieldset}>
          <legend>Languages:</legend>
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
            id="c#"
            name="C#"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="c#">C#</label>

          <input
            type="checkbox"
            id="python"
            name="Python"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="python">Python</label>

          <input
            type="checkbox"
            id="go"
            name="Go"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="go">Go</label>

          <input
            type="checkbox"
            id="swift"
            name="Swift"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="swift">Swift</label>

          <input
            type="checkbox"
            id="ruby"
            name="Ruby"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="ruby">Ruby</label>
        </fieldset>

        <label className={styles.label}>
          <span>Add Profile Image</span>
          <input
            required
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={styles.button}
        >
          {isPending ? <LoaderButton /> : "Sign Up"}
        </motion.button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <Link className={styles.forgotPassword} href="/">
          Forgot Password?
        </Link>

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
