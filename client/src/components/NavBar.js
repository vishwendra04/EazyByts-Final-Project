import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({currentUser, setCurrentUser}) =>{
    const location = useLocation();

    function logOut() {
      setCurrentUser(null);
      window.location.href = "/login";
    }
    return (    
        <nav class="navbar navbar-expand-lg">

          <div class=" navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class={"nav-item"+(location.pathname==="/profile" ? " active":"")}>
                <Link to="/profile">Profile</Link>
              </li>
              <li class={"nav-item"+(location.pathname==="/friends" ? " active":"")}>
                <Link to="/friends">Friends</Link>
              </li>
              <li class={"nav-item"+(location.pathname==="/events" ? " active":"")}>
                <Link to="/events">Events</Link>
              </li>
              <li class={"nav-item"+(location.pathname==="/create-event" ? " active":"")}>
                <Link to="/create-event">Create Event</Link>
              </li>
            </ul>
          </div>
          {currentUser ? 
            <button onClick = {logOut} class="text-white nav-links">Log Out</button> : 
            <>
              <Link class="text-white nav-links" to="/login">Login</Link>
              <Link class="text-white nav-links" to="/signup">Sign Up</Link>
            </>
          }
          
        </nav>
    )

}

export default NavBar;