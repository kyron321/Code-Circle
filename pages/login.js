import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';

export default function Login() {
    const [ emailInput, setEmailInput ] = useState( "" );
    const [ passwordInput, setPasswordInput ] = useState( "" );
    const [ doesEmailExist, setDoesEmailExist ] = useState( null );
    const [ isEmailValid, setIsEmailValid ] = useState( null );
    const [ isPasswordCorrect, setIsPasswordCorrect ] = useState( null );

    const { signin, error } = useSignin();

    let router = useRouter();
    function redirect() {
        router.push('/home')
    }

const handleSubmit = async (e) => {
        e.preventDefault();

        setDoesEmailExist(null);
        setIsEmailValid(null);    
        setIsPasswordCorrect(null);    
        
        signInWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredentials) => {
                redirect();
            })
            .catch((error) => {
                console.log(error.code);
                if (error.code === "auth/user-not-found") {
                    setDoesEmailExist(false);
                }
                if (error.code === "auth/invalid-email") {
                    setIsEmailValid(false);
                }
                if (error.code === "auth/wrong-password") {
                    setIsPasswordCorrect(false);
                }
            });
    }

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
                <input type="text" id="email" onChange={(e) => {setEmailInput(e.target.value)}} required></input>
                {doesEmailExist === false
                    ? <span>Email does not exist.</span>
                    : null}
                {isEmailValid === null
                    ? null
                    : isEmailValid === false
                        ? <span>Please enter a valid email</span>
                        : null}

                <br />

                <label htmlFor="password">Enter your password:</label>
                <input type="password" id="password" onChange={(e) => {setPasswordInput(e.target.value)}}></input>
                {isPasswordCorrect === null
                    ? null
                    : isPasswordCorrect === false
                        ? <span>Password is incorrect</span>
                        : null}

                <br />

                <button>Submit</button>
            </form>
        </main>        
    )
}