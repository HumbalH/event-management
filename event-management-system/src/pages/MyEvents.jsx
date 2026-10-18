import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeEvent } from '../redux/eventsSlice';
import { useState, useEffect } from 'react';

function MyEvents() {

    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
const registrations = useSelector(state => state.events.events);
const registered = registrations.filter(event => event.email === currentUser?.email);
     const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
const [eventDetails, setEventDetails] = useState([]);


useEffect(() => {

    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    const requests = registered.map(event => {
        const url = `https://app.ticketmaster.com/discovery/v2/events/${event.id}.json?apikey=${apiKey}`;

        return fetch(url).then(response => response.json());
    });

    Promise.all(requests)
        .then(data => {
            setEventDetails(data);
        });

}, [registered]);
    return (
        <div>
            <h1>My Events</h1>
{eventDetails.length > 0 ? eventDetails.map(event => (
                    <div>
                        <Link to={`/events/${event.id}`} key={event.id} className="event-card">
                            <img src={event.images[0].url} width="300" />
                            <h3>{event.name}</h3>
                            <p>Date: {event.dates.start.localDate}</p>
                            <p>Time: {event.dates.start.localTime}</p>
                            <p>Venue: {event._embedded?.venues?.[0]?.name}</p>
                        </Link>
                        <button onClick = {()=> dispatch(removeEvent({email :currentUser.email , id: event.id}))}>Unregister</button>
                    
                    </div>))
             : <p>You are not registered for any events.</p>}
        </div>
    );
}

export default MyEvents;