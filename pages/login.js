import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';

export default function Login() {
    const [ emailInput, setEmailInput ] = useState();
    const [ passwordInput, setPasswordInput ] = useState();

    const { signin } = useSignin();

    function handleSubmit(e) {
        e.preventDefault();
        signin(emailInput, passwordInput);
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
                <label htmlFor="email">Enter your registered email:</label>
                <input type="text" id="email" onChange={(e) => {setEmailInput(e.target.value)}}></input>
                <br />
                <label htmlFor="password">Enter your password:</label>
                <input type="text" id="password" onChange={(e) => {setPasswordInput(e.target.value)}}></input>
                <br />
                <button>Submit</button>
            </form>
        </main>        
    )
}