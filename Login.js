import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import './Login.css';
import {auth} from "../firebase";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const signIn = e => {
        e.preventDefault()
        //파베 로그인 시스템 적용...
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if(email ==="admin@bee.com"){
                    history.push('/Admin')
                }else{
                history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth){
                    history.push('/Thankyou')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img className='login_logo'
                     src="https://cdn.pixabay.com/photo/2017/06/10/12/46/bee-2389834_1280.png"/>
            </Link>

            <div className='login_container'>
                <h1>Login</h1>

                <form>
                    <h5>Email </h5>
                    <input type='text' value={email} onChange=
                        {e => setEmail(e.target.value)}/>

                    <h5> password </h5>
                    <input type='password' value={password} onChange
                        ={e => setPassword(e.target.value)}/>

                    <button type='submit'
                            className='login_signInButton'
                            onClick={signIn}>Login
                    </button>

                </form>

                <p>Hello dear</p>

                <button onClick={register} className='login_registerButton'>Register</button>
            </div>


        </div>

            );
}

export default Login;