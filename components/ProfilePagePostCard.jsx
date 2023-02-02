import React from 'react';
import styles from '../css/profilePagePostCard.module.css';
import imagePlaceholder from "../images/image-placeholder.svg";
import Image from "next/image";
import deleteAPost from "../hooks/deleteAPost";
import editAPost from "../hooks/editAPost";
import { useRouter } from "next/router";
import { useState } from 'react';

export default function ProfilePagePostCard({ props, userName }) {
  const {
    postId,
    postTime,
    postTitle,
    programmingLanguage,
    projectDescription,
    timeToCode,
    timeZone,
    user,
  } = props;
  const date = new Date(postTime);
  const readableDate = date.toLocaleDateString("en-GB");
  const readableTime = date.toLocaleTimeString("en-GB").slice(0, 5);

  const [isPostBeingEdited, setIsPostBeingEdited] = useState(false);
  const [editProjectDescription, setEditProjectDescription] = useState(projectDescription);
  const [editProgrammingLanguage, setEditProgrammingLanguage] = useState(programmingLanguage);
  const [editTimeToCode, setEditTimeToCode] = useState(timeToCode);
  const [editTimeZone, setEditTimeZone] = useState(timeZone);

  const router = useRouter();

  function handleEditPost() {
    setIsPostBeingEdited(true);
  }

  function handleCancelEditPost() {
    setIsPostBeingEdited(false);
  }

  function handleUpdatePost() {  
    editAPost(postId, editProjectDescription, editProgrammingLanguage, editTimeToCode, editTimeZone);
    setIsPostBeingEdited(false);
    setTimeout(() => {
      router.push(`/users/${userName}`);
    }, 1500);
  }

  function handleDeletePost() {
    deleteAPost(postId);
    setTimeout(() => {
      router.push(`/users/${userName}`);
    }, 1500);
  }

  function onChangeEditProjectDescription(event) {
    setEditProjectDescription(event.target.value);
  }

  function OnChangeEditLanguage(event) {
    setEditProgrammingLanguage(event.target.value);
  }

  function onChangeTimeToCode(event) {
    setEditTimeToCode(event.target.value);
  }

  function OnChangeTimeZone(event) {
    setEditTimeZone(event.target.value);
  }

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.title}>{postTitle}</div>

      {isPostBeingEdited
        ? <label>
            Update programming language:
            <select
              name="programming-languages"
              onChange={OnChangeEditLanguage}
            >
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Python">Python</option>
              <option value="Go">Go</option>
              <option value="Swift">Swift</option>
              <option value="Ruby">Ruby</option>
            </select>
          </label>
        : <div>Language: {editProgrammingLanguage}</div>}

      {isPostBeingEdited
        ? <label>
            Choose a time to code :
            <input
              type="datetime-local"
              name="meeting-time"
              onChange={onChangeTimeToCode}
            />
          </label>
        : <div>Time to code: {editTimeToCode.replace('T', ' ')}</div>}

      {isPostBeingEdited
        ? <label>
            Choose a time zone :
            <select
              name="Time-zone"
              onChange={OnChangeTimeZone}
            >
              <option value="GMT">GMT</option>
              <option value="UTC">UTC</option>
              <option value="PST">PST</option>
              <option value="UTC">UTC</option>
              <option value="ET">ET</option>
              <option value="CT">CT</option>
              <option value="PT">PT</option>
            </select>
          </label>
        : <div>Time zone:{editTimeZone}</div>}

      {isPostBeingEdited
        ? <div>Enter new project description:</div>
        : null}      
      {isPostBeingEdited
        ? <textarea
            className={styles.textarea}
            name="edit-project-description"
            onChange={onChangeEditProjectDescription}
            placeholder={editProjectDescription}>
          </textarea>
        : <div>{projectDescription}</div>}

      <Image
        src={imagePlaceholder}
        alt="placeholder"
        width={200}
        height={200}
        className={styles.image}
      />

      <div className={styles.authorAndPostTimeContainer}>
        <div>Posted by: {user}</div>
        <div>
          Created: {readableDate} at {readableTime}{" "}
        </div>
      </div>

      <div className={styles.buttons}>
        {isPostBeingEdited
          ? <button onClick={handleCancelEditPost}>Cancel Editing</button>
          : <button onClick={handleEditPost}>Edit Post</button>}
        {isPostBeingEdited
          ? <button onClick={handleUpdatePost}>Update Post</button>
          : null}
        <button onClick={handleDeletePost}>Delete Post</button>
      </div>      
    </div>
  );
}