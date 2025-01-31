import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://event-management-system-pdyq.onrender.com/signup', {
        email,
        password,
        name,
        bio
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Error during signup. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="signup-page">
    <div className="container d-flex justify-content-center align-items-center" style={{height:"90vh", overflowY: "scroll", minHeight :"auto"}}>
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Short Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" id="btn-orange">Sign Up</button>
        </form>
        {message && <p className="text-center mt-3 text-danger">{message}</p>}
        <p className="text-center mt-3 text-light text-login">
            Already have an account? 
            <button 
              type="button" 
              className="btn btn-secondary ms-2" 
              id = "btn-grey"
              onClick={handleLoginRedirect}
            >
              Log in
            </button>
          </p>
      </div>
    </div>
  </div>
  );
};

export default Signup;
