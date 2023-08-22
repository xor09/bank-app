import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from '../sharedComponents/error/Error';
import { login } from '../../service/validateUser';

const Login = () => {
    const navigation = useNavigate();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null)

    const loginHandler = async (e) => {
        e.preventDefault();
        try{
            let response = await login(username, password);
            localStorage.setItem('auth', response.data.accesstoken);
            if(response.data.role.rolename === "ROLE_ADMIN"){
                navigation(`/admindashboard/${username}`);
                return;
            }
    
            if(response.data.role.rolename === "ROLE_CUSTOMER"){
                navigation(`/customerdashboard/${username}`);
                return;
            }
        }catch(error){
            console.log(error.response.data)
            setError(error.response.data)
        }
        return;
    }
    
    return (
        <>
            {
                
                error && <Error error={error} setError={setError}/>
            }
            <div className='form-container'>
                <form>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="userHelp" 
                        onChange={(e) => setUsername(e.target.value.trim())}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" 
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary"
                    onClick={loginHandler}
                    >Login</button>
                    </form>
            </div>
        </>
    );
}

export default Login;
