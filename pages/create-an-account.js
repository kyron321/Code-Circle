import { useState, useEffect } from 'react';
import { useSignup } from '../hooks/useSignup';
import { postUser } from '../hooks/postUser';
import { app, auth } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";


const db = getFirestore(app);

// Gets all users from Firestore database
async function getUsers(db) {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
}

export default function CreateAnAccount() {
    const [ displayNameInput, setDisplayNameInput ] = useState( "" );
    const [ emailInput, setEmailInput ] = useState( "" );
    const [ passwordInput, setPasswordInput ] = useState( "" );    
    const [ techStack, setTechStack ] = useState( [] );
    const [ registeredDisplayNames, setRegisteredDisplayNames ] = useState( [] );
    const [ isDisplayNameAvailable, setIsDisplayNameAvailable ] = useState( null );
    const [ isEmailValid, setIsEmailValid ] = useState( null );

    const { signup } = useSignup();

    useEffect(() => {
        getUsers(db)
            .then((response) => {
                setRegisteredDisplayNames(response.map((user) => {
                    return user.displayname;
                }));
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsEmailValid(null);

        createUserWithEmailAndPassword(auth, emailInput, passwordInput, displayNameInput)
            .then((userCredential) => {
                console.log("New user successfully created and added to Authentication > Users table.");
                postUser(displayNameInput, techStack);
                redirect();
            })
            .catch((error) => {
                console.log(error.code);
                setIsEmailValid(false)
            });
    }

    function onChangeTechStack(e) {
        if (e.target.checked) {
            setTechStack((currentTechStack) => {
                return [ ...currentTechStack, e.target.name];
            })
        }
        else {
            setTechStack((currentTechStack) => {
                const updatedTechStack = [];
                currentTechStack.forEach((tech) => {
                    if (tech !== e.target.name) {
                        updatedTechStack.push(tech)
                    }
                })
                return updatedTechStack;
            })
        }
    }

    function handleDisplayNameInput(e) {
        setIsDisplayNameAvailable(null);
        setDisplayNameInput(e.target.value);
        if (e.target.value === "") {
            setIsDisplayNameAvailable(null);
        } else if (registeredDisplayNames.includes(e.target.value)) {
            setIsDisplayNameAvailable(false);
        } else {
            setIsDisplayNameAvailable(true);
        }
    }

    function handleEmailInput(e) {
        // console.log(e.target.value);
        setEmailInput(e.target.value);
        if (e.target.value === "") {
            setEmailInput(null);
        }
    }

    let router = useRouter();
    function redirect() {
        router.push('/home')
    }


    return (
        <main>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Display name:</label>
                <input
                    type="text"
                    id="display-name"
                    value={displayNameInput}
                    onChange={handleDisplayNameInput}
                    required>
                </input>
                {isDisplayNameAvailable === true
                    ? <span>Available</span>
                    : isDisplayNameAvailable === null
                        ? null
                        : <span>Not available</span>}

                <br />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={emailInput}
                    onChange={handleEmailInput}
                    required>
                </input>
                {isEmailValid === null
                    ? null
                    : isEmailValid === false
                        ? <span>Please enter a valid email.</span>
                        : null}

                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    value={passwordInput}
                    onChange={(e) => {setPasswordInput(e.target.value)}}
                    required>
                </input>

                <br />

                <fieldset>
                    <legend>Tech stack:</legend>
                    <input type="checkbox" id="html" name="HTML" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="html">HTML</label>

                    <input type="checkbox" id="css" name="CSS" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="css">CSS</label>

                    <input type="checkbox" id="javascript" name="JavaScript" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="javascript">JavaScript</label>

                    <input type="checkbox" id="java" name="Java" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="java">Java</label>

                    <input type="checkbox" id="php" name="PHP" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="php">PHP</label>

                    <input type="checkbox" id="mysql" name="MySQL" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="mysql">MySQL</label>

                    <input type="checkbox" id="lamp" name="LAMP" onChange={(e) => {onChangeTechStack(e)}}></input>
                    <label htmlFor="lamp">LAMP</label>
                </fieldset>

                <button disabled={!isDisplayNameAvailable}>Submit</button>
            </form>
        </main>        
    )
  }
}


