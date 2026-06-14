import { useState } from "react";
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './auth.css';

function Auth({setUser}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login'); // 'login' or 'signup'

    async function signUp(){
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('User created successfully');
        }catch(error){
            alert('Error creating user: ' + error.message);
        }
    }
    async function login(){
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            alert('Logged in successfully');
        }catch(error){
            alert('Error logging in: ' + error.message);
        }
    }
    function submit(event){
        event.preventDefault();
        if(!email || !password){
            alert('Please enter email and password');
            return;
        }
        if(mode === 'signup'){
            signUp();
        } else {
            login();
        }
    }

    return (
        <div>
            <h1>Authentication</h1>
            <form onSubmit={ submit }>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"> {mode === 'signup' ? 'Sign Up' : 'login'} </button>
            </form>
            {
                mode === 'signup' 
                ? <span>Already have an account? <span className='link' onClick={() => setMode('login')}>Login</span></span>
                : <span>Don't have an account? <span className='link' onClick={() => setMode('signup')}>Sign up</span></span>
            }
        </div>
    );
}

export default Auth;