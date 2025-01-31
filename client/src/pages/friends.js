import {React, useState, useEffect} from "react";
import axios from "axios";
import '../styles/events.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 

const Friends = ({currentUser, setCurrentUser}) => {
	const [users, setUsers] = useState([]);

	function fetchUsers() {
		axios({
            url: "https://event-management-system-pdyq.onrender.com/users",
            method: "GET",
        })
            .then((res) => {
            	setUsers(res.data);
            });
	}

	useEffect(() => {
        axios.post('https://event-management-system-pdyq.onrender.com/user', {user : currentUser}).then((res) => {
            setCurrentUser(res.data);
        });
    }, []);

	useEffect(fetchUsers,[]);

	var selectedUsers = users.filter(user => user._id !== currentUser._id)
								.map(value => ({ value, sort: Math.random() }))
    							.sort((a, b) => a.sort - b.sort)
    							.map(({ value }) => value);


    function addFriend(event, new_friend) {
    	if (event.target.classList.contains("add")) {
    		event.target.classList.remove("add")
    		event.target.innerHTML = "Remove Friend";
    	} else {
    		event.target.classList.add("add")
    		event.target.innerHTML = "Add Friend";
    	}
    	axios.post('https://event-management-system-pdyq.onrender.com/friend', { user : currentUser._id, new_friend : new_friend}).then((res) => {
	    });
    	
    }


    return (
    	<>
    		<div style = {{display: "flex", justifyContent:"center", marginTop: "2vh"}}>
				<h1 class="text-white" style={{marginBottom:"3vh", fontWeight : "bold"}}>Party Companions!</h1>
			</div>
	    	<div style={{overflowY : "scroll", height: "80vh"}}>
		        <div class="container-fluid min-vh-100 bg-light-grey p-4 d-flex" >
				<ul className="list-group w-100">
  {selectedUsers.length === 0 ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100%', color: 'white' }}
    >
      No other users.
    </div>
			) : (
				selectedUsers.map((user) => (
				<li
					key={user._id}
					className="list-group-item bg-secondary text-light border-0 d-flex align-items-center justify-content-between"
					style={{ width: '100%' }}
				>
					<div>
					<b>{user.name}</b>
					<div style={{ color: '#a0a0a0' }}>{user.bio}</div>
					</div>
					<button
					className={`toggleFriend ${currentUser.friends.includes(user._id) ? '' : 'add'}`}
					onClick={(event) => addFriend(event, user._id)}
					style={{ marginLeft: 'auto' }} // Optional styling for spacing
					>
					{currentUser.friends.includes(user._id) ? 'Remove Friend' : 'Add Friend'}
					</button>
				</li>
				))
			)}
			</ul>

							</div>
	        </div>
        </>
    )
}

export default Friends;