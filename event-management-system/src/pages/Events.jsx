
import { useState, useEffect } from 'react';
import './Events.css';

function Events() {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const today = new Date().toISOString().split('T')[0];

const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=20&keyword=${encodeURIComponent(search)}&classificationName=${encodeURIComponent(category)}&startDateTime=${today}T00:00:00Z&sort=date,asc`;
        setLoading(true);
        setError('');

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                return response.json();
            })
            .then(data => {
                setEvents(data._embedded?.events || []);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [category]);

    function handleSearch(e) {

        e.preventDefault();
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const today = new Date().toISOString().split('T')[0];
const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=20&keyword=${encodeURIComponent(search)}&classificationName=${encodeURIComponent(category)}&startDateTime=${today}T00:00:00Z&sort=date,asc`;
        setLoading(true);
        setError('');

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                return response.json();
            })
            .then(data => {
                setEvents(data._embedded?.events || []);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    return (
        <div>
            <h1>Events Page</h1>

            <form onSubmit={handleSearch}>
                <input
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <button onClick={() => setCategory('')}>All</button>
            <button onClick={() => setCategory('Music')}>Music</button>
            <button onClick={() => setCategory('Sports')}>Sports</button>
            <button onClick={() => setCategory('Arts & Theatre')}>Arts</button>

            {loading && <p>Loading events...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && events.length === 0 &&
                <p>No events found.</p>
            }

            {!loading && !error && (
                <div className="events-container">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <img src={event.images[0].url} width="300" />
                            <h3>{event.name}</h3>
                            <p>Date: {event.dates.start.localDate}</p>
                            <p>Time: {event.dates.start.localTime}</p>
                            <p>Venue: {event._embedded?.venues?.[0]?.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Events;
