import React from 'react';
import '../styles/home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    return (
        <div className="home-page">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <h1 className="animated-text text-center mb-4">Your next adventure awaits...</h1>
            </div>
        </div>
    )
}

export default Home;