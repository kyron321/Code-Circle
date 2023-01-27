import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import { postUser } from "../hooks/postUser";
import { useRouter } from "next/router";

export default function CreateAnAccount() {
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const { signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(emailInput, passwordInput, displayNameInput);
    postUser(displayNameInput, techStack);
    redirect();
  };

  const onChangeTechStack = (e) => {
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
  };

  const handleDisplayNameInput=(e)=> {
    setDisplayNameInput(e.target.value);
  }

  const handleEmailInput=(e)=> {
    setEmailInput(e.target.value);
    if (e.target.value === "") {
      setEmailInput(null);
    }
  }

  let router = useRouter();
  function redirect() {
    router.push("/home");
  }

  return (
    <main>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Display name:</label>
        <input
          type="text"
          id="display-name"
          value={displayNameInput}
          onChange={handleDisplayNameInput}
          required
        />

        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={emailInput}
          onChange={handleEmailInput}
          required
        />

        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          required
        />

        <br />

        <fieldset>
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
        <button>Submit</button>
      </form>
    </main>
  );
}
