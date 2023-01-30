import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import { useRouter } from "next/router";

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { signin, error, isPending } = useSignin();

  let router = useRouter();
  function redirect() {
    router.push("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(emailInput, passwordInput);
    if (!error) {
      redirect();
    }
    console.log(error)
  };

  return (
    <main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="text"
          id="email"
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
          required
        ></input>

        <br />

        <label htmlFor="password">Enter your password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        ></input>

        <br />
        {!isPending && <button className="btn">Login</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
