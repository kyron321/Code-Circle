import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import { postUser } from "../hooks/postUser";
import { useRouter } from "next/router";

export default function CreateAnAccount() {
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(displayNameInput, techStack);
    signup(emailInput, passwordInput, displayNameInput);
    // redirect();
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

  let router = useRouter();
  function redirect() {
    router.push("/home");
  }

  return (
    <main>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Display name:</label>
        <input
          type="text"
          value={displayNameInput}
          onChange={(e) => setDisplayNameInput(e.target.value)}
          required
        />

        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />

        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
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
            name="HTML"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />

          <label htmlFor="html">HTML</label>

          <input
            type="checkbox"
            name="CSS"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="css">CSS</label>

          <input
            type="checkbox"
            name="JavaScript"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="javascript">JavaScript</label>

          <input
            type="checkbox"
            name="Java"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="java">Java</label>

          <input
            type="checkbox"
            name="PHP"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="php">PHP</label>

          <input
            type="checkbox"
            name="MySQL"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="mysql">MySQL</label>

          <input
            type="checkbox"
            name="LAMP"
            onChange={(e) => {
              onChangeTechStack(e);
            }}
          />
          <label htmlFor="lamp">LAMP</label>
        </fieldset>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
        {error && <p>{error}</p>}
      {console.log(error)}
      </form>
    </main>
  );
}
