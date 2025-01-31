import React, { useState, useEffect } from 'react';
import '../styles/profile.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Profile = ({ currentUser, setCurrentUser }) => {
    const [name, setName] = useState(currentUser.name);
    const [bio, setBio] = useState(currentUser.bio);
    const [isEditing, setIsEditing] = useState(false);
    const [email] = useState(currentUser.email);
    const [events, setEvents] = useState([]);
    const [friends, setFriends] = useState([]);



    React.useEffect(() => {
        axios.post('https://event-management-system-pdyq.onrender.com/user', {user : currentUser}).then((res) => {
            console.log(">>",res)
            setCurrentUser(res.data);
            axios.post('https://event-management-system-pdyq.onrender.com/getusernames', { ids : res.data.friends}).then((res) => {
                setFriends(res.data.names);
            });
        });
    }, []);


    // Fetch events attended by the user
    function fetchEvents() {
        axios({
            url: "https://event-management-system-pdyq.onrender.com/events",
            method: "GET",
        })
            .then((res) => {
                setEvents(res.data);
            });
    }

    useEffect(fetchEvents, []);

    // Update user profile when editing
    const updateUser = async () => {
        try {
            const response = await axios.put('https://event-management-system-pdyq.onrender.com/updateuser', { email, name, bio });
        } catch (error) {
            console.error("Error in updating profile: ", error);
        }
    };

    const handleEditClick = () => {
        if (isEditing) {
            updateUser();
        }
        setIsEditing(!isEditing); // Toggle the editing state
    };

    const removeEvent = (eventId) => {
        axios.post('https://event-management-system-pdyq.onrender.com/leaveevent', { event : eventId, user : currentUser._id}).then(() => window.location.reload());
    }
    const removeFriend = (friendId) => {
        axios.post('https://event-management-system-pdyq.onrender.com/friend', { new_friend : friendId, user : currentUser._id}).then(() => window.location.reload());
    }

    const handleNameChange = (e) => setName(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);

    console.log(events)
    var selectedEvents = events.filter((x) => x.members.includes(currentUser._id));
    

    return (
        <div className="profile-container container-fluid bg-dark p-4 d-flex gap-3">
            {/* Left Column */}
            <div className="col-md-2 d-flex flex-column flex-fill">
                <div className="card bg-secondary text-center shadow-lg custom-shadow flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{width: "25vw"}}>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    className="form-control mb-2"
                                    placeholder="Enter name"
                                />
                                <textarea
                                    value={bio}
                                    onChange={handleBioChange}
                                    className="form-control mb-3"
                                    placeholder="Enter bio"
                                />
                                <button className="btn btn-custom" onClick={handleEditClick}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="card-title text-light-grey">{name}</h3>
                                <p className="text-light">{bio}</p>
                                <button className="btn btn-custom" onClick={handleEditClick}>
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="col-md-7 d-flex flex-column justify-content-between">
                {/* Friends Section */}
                <div className="card mb-3 bg-secondary shadow-lg custom-shadow flex-grow-1">
                    <div className="card-header text-center bg-theme text-light-grey">Friends</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                    <ul className="list-group w-100">
                            {friends.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', color: 'white'}}>
                                    You haven't added any friends yet!
                                </div>
                            ) : (
                                friends.map((friend, index) => (
                                    <li key={index} className="list-group-item bg-secondary text-light border-0">
                                        <button onClick = {() => removeFriend(currentUser.friends[index])} className={"removeEventButton"}>&times;</button>
                                        {friend}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {/* Events Attended Section */}
                <div className="card bg-secondary shadow-lg custom-shadow flex-grow-1">
                    <div className="card-header text-center bg-theme text-light-grey"> Events Attending </div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <ul className="list-group w-100">
                            {selectedEvents.length === 0 ? 
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', color: 'white'}}>
                                You haven't added any events yet!
                                </div> : 
                                selectedEvents.map((event) => (
                                    <li key={event._id} className="list-group-item bg-secondary text-light border-0">
                                        <button onClick = {() => removeEvent(event._id)} className={"removeEventButton"+(event.owner==currentUser._id ? " delete" : "")}>&times;</button>
                                        <b>{event.name}</b>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
