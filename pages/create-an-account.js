import { useState, useEffect } from 'react';
import { useSignup } from '../hooks/useSignup';
import { postUser } from '../hooks/postUser';
import { app } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';

const db = getFirestore(app);

// Gets all users from Firestore database
async function getUsers(db) {
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    return usersList;
}

export default function CreateAnAccount() {
    const [ displayNameInput, setDisplayNameInput ] = useState( "" );
    const [ emailInput, setEmailInput ] = useState( "" );
    const [ passwordInput, setPasswordInput ] = useState( "" );    
    const [ techStack, setTechStack ] = useState( [] );
    const [ registeredDisplayNames, setRegisteredDisplayNames ] = useState( [] );
    const [ isDisplayNameAvailable, setIsDisplayNameAvailable ] = useState( null );

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
        signup(emailInput, passwordInput);
        postUser(displayNameInput, techStack);
        setDisplayNameInput( "" );
        setEmailInput( "" );
        setPasswordInput( "" );
        redirect();
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
        if (registeredDisplayNames.includes(e.target.value)) {
            console.log(e.target.value, "is registered");
            setIsDisplayNameAvailable(false);
        } else {
            console.log(e.target.value, "is available");
            setIsDisplayNameAvailable(true);
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
                    onChange={handleDisplayNameInput}>
                </input>
                {isDisplayNameAvailable === null
                    ? null
                    : isDisplayNameAvailable
                        ? <span>Available</span>
                        : <span>Not available</span>}

                <br />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={emailInput}
                    onChange={(e) => {setEmailInput(e.target.value)}}>
                </input>

                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    value={passwordInput}
                    onChange={(e) => {setPasswordInput(e.target.value)}}>
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

                <button>Submit</button>
            </form>
        </main>        
    )
}