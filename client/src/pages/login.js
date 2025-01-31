import React, {useState} from "react";
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = ({ setUser, setUserID }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
   const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://event-management-system-pdyq.onrender.com/login', { email, password });
  
      console.log('Response from server:', response); // Debugging log
  
      if (response && response.data && response.data.success) {
        console.log('User data before setting:', response.data.user); 
        setUser(response.data.user);
        console.log('User state set successfully'); 
        navigate('/profile'); 
      } else if (response && response.data) {
        setMessage(response.data.message);
      } else {
        setMessage('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error during login: ', error);
  
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error during login. Please try again.');
      }
    }
  };  


    const handleSignup = async (e) => {
        navigate('/signup');
    };

    return (
      <div className="login-page">
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style = {{width: '400px'}}>
                <div>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>
                        <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleSignup}>
                        Create an Account
                        </button>
                </form>
                 {message && <p className="text-center mt-3 text-danger">{message}</p>}
                </div>

            </div>
            
        </div>
      </div>
    )

};

export default Login
