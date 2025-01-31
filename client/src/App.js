import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Events from "./pages/events";
import CreateEvent from "./pages/create_event";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from './pages/login';
import Friends from './pages/friends';

const App = () => {
  // useState returns a list
  // they are not variables, they are objects they are not mutating the objects at all
  // we can set the value of the current user property but we can't change the object itself
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.timestamp < (new Date().getTime()))
        setCurrentUser(null);
      else
        setCurrentUser(user);
    }
  }, []);
  React.useEffect(() => {
    if (currentUser)
      currentUser.timestamp = new Date().getTime() + 1000*60*60*5;
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);
  
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  return (
    <div style={{width:"100vw", height:"100vh", overflow: "hidden"}}>
      <NavBar currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
      <div>
        <Routes>
          <Route exact path="/" element={<Navigate to = "/home"/>} />
          <Route path="/events" element={isAuthenticated() ? <Events currentUser={currentUser} selectionFunction={(event) => !event.members.includes(currentUser._id)} /> : <Navigate to = "/login"/>} />
          <Route path="/create-event" element={isAuthenticated() ? <CreateEvent currentUser={currentUser} /> : <Navigate to = "/login"/> } />
          <Route path="/profile" element={isAuthenticated() ? <Profile currentUser={currentUser} setCurrentUser = {setCurrentUser}/> : <Navigate to = "/login"/> }/>
          <Route path="/friends" element={isAuthenticated() ? <Friends currentUser={currentUser} setCurrentUser = {setCurrentUser} /> : <Navigate to = "/login"/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setCurrentUser}/>} />
          <Route path="/home" element={<Home />}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
