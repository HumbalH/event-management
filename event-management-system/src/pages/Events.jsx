import { useState, useEffect } from 'react';
import './Events.css';
function Events() {

const [events, setEvents] = useState([]);
const [search, setSearch] = useState('');
useEffect(() => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=20`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            setEvents(data._embedded?.events || []);
                console.log(data._embedded?.events?.[0]);

        });

}, []);

function handleSearch(e){

e.preventDefault();
const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=20&keyword=${encodeURIComponent(search)}`;

fetch(url)
.then (response => response.json())
.then (data => setEvents(data._embedded?.events || []))

}

return (

    

<div>
<h1>Events Page</h1>

<form onSubmit = {handleSearch}>
<input
    placeholder="Search events..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>
 <button type="submit">Search</button>
</form>

<div className="events-container">
{events.map(event => (
    <div key={event.id} className="event-card">
        <img src={event.images[0].url} width="300" />
        <h3>{event.name}</h3>
        <p>Date: {event.dates.start.localDate}</p>
        <p>Time: {event.dates.start.localTime}</p>
        <p>Venue: {event._embedded.venues[0].name}</p>
        
    </div>
))}


</div>
</div>




);

}

export default Events;