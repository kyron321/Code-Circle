import { useState } from "react";
import { createAPost } from "../hooks/useCreateAPost";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import checkLoggedIn from "../hooks/checkLoggedIn";

export default function CreateAPost() {
  const { user } = useAuthContext();

  const [postTitleInput, setPostTitleinput] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("JavaScript");
  const [timeToCode, setTimeToCode] = useState("");
  const [timeZone, setTimeZone] = useState("GMT");
  checkLoggedIn();

  let router = useRouter();
  function redirect() {
    router.push("/home");
  }

  function handleSubmit(e) {
    e.preventDefault();
    createAPost(
      user.displayName,
      postTitleInput,
      projectDescription,
      programmingLanguage,
      timeToCode,
      timeZone
    );
    redirect();
  }

  function HandlePostTitleInput(e) {
    setPostTitleinput(e.target.value);
  }

  function HandleProjectDescription(e) {
    setProjectDescription(e.target.value);
  }

  function handleOnChangeLanguage(e) {
    setProgrammingLanguage(e.target.value);
  }

  function handleOnChangeTimeZone(e) {
    setTimeZone(e.target.value);
  }

  function handleChooseTimeToCode(e) {
    setTimeToCode(e.target.value);
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="post-title">Post Title</label>
        <input
          type="text"
          id="post-title"
          value={postTitleInput}
          onChange={HandlePostTitleInput}
          required
        ></input>
        <br></br>
        <br></br>

        <label htmlFor="project-description">Project Description</label>
        <textarea
          rows="10"
          name="project-description"
          id="project-description"
          value={projectDescription}
          onChange={HandleProjectDescription}
          required
        ></textarea>
        <br></br>
        <br></br>
        <label htmlFor="programming-language">
          select your Programming language:
        </label>
        <select
          name="programming-languages"
          id="programming-languages"
          onChange={handleOnChangeLanguage}
        >
          <option value="Javascript">Javascript</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="PHP">PHP</option>
          <option value="Python">Python</option>
          <option value="Swift">Swift</option>
        </select>
        <br></br>
        <br></br>
        <label htmlFor="meeting-time">Choose a time to code :</label>
        <input
          type="datetime-local"
          id="meeting-time"
          name="meeting-time"
          onChange={handleChooseTimeToCode}
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="Time-zone">select your Timezone:</label>
        <select
          name="Time-zone"
          id="Time-Zones"
          onChange={handleOnChangeTimeZone}
        >
          <option value="GMT">GMT</option>
          <option value="UTC">UTC</option>
          <option value="PST">PST</option>
          <option value="UTC">UTC</option>
          <option value="ET">ET</option>
          <option value="CT">CT</option>
          <option value="PT">PT</option>
        </select>

        <br></br>
        <br></br>

        <button>Submit</button>
      </form>
    </div>
  );
}
