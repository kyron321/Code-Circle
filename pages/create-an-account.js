import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export default function CreateAnAccount() {
    const [ emailInput, setEmailInput ] = useState();
    const [ passwordInput, setPasswordInput ] = useState();
    const [ displayNameInput, setDisplayNameInput ] = useState();

    const { signup } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(emailInput, passwordInput);
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
                <label htmlFor="email">Enter a display name:</label>
                <input type="text" id="display-name" onChange={(e) => {setDisplayNameInput(e.target.value)}}></input>

                <br />

                <label htmlFor="email">Enter your email to create an account:</label>
                <input type="text" id="email" onChange={(e) => {setEmailInput(e.target.value)}}></input>

                <br />

                <label htmlFor="password">Enter a password:</label>
                <input type="text" id="password" onChange={(e) => {setPasswordInput(e.target.value)}}></input>

                <br />

                <button>Submit</button>
            </form>
        </main>        
    )
}