import {React, useState, useEffect} from "react";
import axios from "axios";
import '../styles/events.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 
import {Link} from "react-router-dom";



const Events = ({currentUser, selectionFunction}) => {
	const [events, setEvents] = useState([]);
	const [selectedEvents, setSelectedEvents] = useState([]);

	function fetchEvents() {
		axios({
            url: "https://event-management-system-pdyq.onrender.com/events",
            method: "GET",
        })
            .then((res) => {
            	setEvents(res.data);
            })
	}

	useEffect(fetchEvents,[]);

	function showModal(event) {
		document.getElementById("eventModalName").innerHTML = event.name
		document.getElementById("eventModalDescription").innerHTML = event.description
		document.getElementById("eventModalInfo").innerHTML = '<h5 class="card-title text-white">'+event.location+'</h5><h5 class="card-title text-light-gray"><i>'+((new Date(event.time)).toUTCString())+'</i></h5>'
		document.getElementById("eventModal").classList.add("show")
		document.getElementById("joinbutton").onclick = () => joinEvent(event)
	}
	function hideModal() {
		document.getElementById("eventModal").classList.remove("show")
	}

	function joinEvent(event) {
		hideModal()
		axios.patch("https://event-management-system-pdyq.onrender.com/events",{_id : event._id, new_member : currentUser._id, members : event.members ? [...event.members, currentUser._id] : [currentUser._id]}).then((res) => {});
		window.location.reload()
	}
    useEffect(() => {
    	axios.post('https://event-management-system-pdyq.onrender.com/getusernames', { ids : selectedEvents.map(e => e.owner)}).then((res) => {
    		var filteredEvents = events.filter(selectionFunction)
								.map(value => ({ value, sort: Math.random() }))
    							.sort((a, b) => a.sort - b.sort)
    							.map(({ value }) => value);
	        filteredEvents.map((e,i) => e.namedOwner = res.data.names[i]);
	        setSelectedEvents(filteredEvents);
	    });
    }, [events])
    

    return (
    	<>
    	<div style = {{display: "flex", justifyContent:"center", marginTop: "2vh"}}>
    		<h1 class="text-white" style={{marginBottom:"3vh", fontWeight : "bold"}}>Dare to Discover</h1>
    	</div>
        <div class="container-fluid min-vh-100 bg-light-grey p-4 d-flex" >
	        <div class = "events-grid container-fluid" style={{overflowY : "scroll", height: "90vh", paddingBottom : "5vh"}}>
		        { selectedEvents.length == 0 ? 
		        	<div class="text-white">No events, <Link to="/create-event">click here to create event</Link>.</div> : 
		        	selectedEvents.map((event) => (<div class="event-grid-event p-4 d-flex-column gap-3" onClick={() => showModal(event)}>
		        		<h1 class="card-title text-white">{event.name}</h1>
		        		<h5 class="card-title text-white">by <b>{event.namedOwner}</b> at <b>{event.location}</b></h5>
		        		<h5 class="card-title text-light-gray"><i>{(new Date(event.time)).toUTCString()}</i></h5>
		        		<p class="card-title text-white">{event.description}</p>

		        	</div>))
		    	}
		    </div>
			<div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-hidden="true" style={{display:"block"}}>
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header" style={{position:"relative"}}>
			        <h5 class="modal-title text-white" id="eventModalName">Modal title</h5>
			        <button style={{border:"none", position:"absolute",right:"10px", background: "none"}} type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
			          <span aria-hidden="true" style={{color:"white", fontSize:"1.3rem"}}>&times;</span>
			        </button>
			      </div>
			      <div class="modal-body" id="eventModalInfo">
			      </div>
			      <div class="modal-body text-white" id="eventModalDescription">
			        ...
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Close</button>
			        <button type="button" id="joinbutton" class="btn btn-primary">Join</button>
			      </div>
			    </div>
			  </div>
			</div>

        </div>
        </>
    )
}

export default Events;