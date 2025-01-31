import {React, useState, useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Events = ({currentUser}) => {
	const [message, setMessage] = useState("");

  function sendMessage(msg) {
    setMessage(msg);
    setTimeout(() => {
        setMessage("");
    },2000);
  }

	function postCreateEvent() {
    if (!(document.getElementById("eventInputName").value && currentUser._id && document.getElementById("eventInputDate").value && document.getElementById("eventInputLocation").value && document.getElementById("eventInputDesc").value)) {
      sendMessage("Please fill out all fields.");
      return false;
    }
        var data = {
            name : document.getElementById("eventInputName").value,
            owner : currentUser._id,
            time : document.getElementById("eventInputDate").value,
            location : document.getElementById("eventInputLocation").value,
            description : document.getElementById("eventInputDesc").value
      }
		axios.post("https://event-management-system-pdyq.onrender.com/events",data).then((res) => {
            	console.log(res.data)
            })
        window.location.href = "/profile";
	}


    return (
        <div class="container-fluid p-4 d-flex justify-content-center" style={{overflow: "scroll", height: "90vh"}}>
            <div class="p-4 d-flex-reverse" style={{backgroundColor : "rgb(38, 39, 59)", width: "40vw", height: "fit-content", "marginBottom": "20vh"}}>
              <h1 class="text-white" style={{marginBottom:"3vh", fontWeight : "bold"}}>What do you want to do?</h1>
              <div class="form-group mb-3">
                <label class="text-white" for="eventInputName">Event Name</label>
                <input type="text" class="form-control" id="eventInputName" aria-describedby="nameHelp" name="name" placeholder="Enter event name" />
              
              </div>
              <div class="form-group mb-3">
                <label class="text-white"  for="eventInputLocation">Date and Time</label>
                <input type="datetime-local" class="form-control" id="eventInputDate" name="date" placeholder="Enter event date and time" />
              </div>
              <div class="form-group mb-3">
                <label class="text-white"  for="eventInputLocation">Location</label>
                <input type="text" class="form-control" id="eventInputLocation" name="location" placeholder="Enter location" />
              </div>
              <div class="form-group mb-3">
                <label class="text-white" for="eventInputDesc">Description</label>
                <textarea class="form-control" id="eventInputDesc" name="description" placeholder="Enter description"></textarea>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mx-auto" onClick = {postCreateEvent}>Submit</button>
                {message ? <i class="text-white">{message}</i> : ""}
              </div>
            </div>
        </div>
    )
}

export default Events;