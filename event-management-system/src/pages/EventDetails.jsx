import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent } from '../redux/eventsSlice';


function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = useSelector(state => state.auth.user);
    const registered = useSelector(state => state.events.events.find(event => event.email == currentUser?.email && event.id == id));
const dispatch = useDispatch();



function handleRegister() {
    dispatch(addEvent({ email: currentUser.email, id: id }));
}


    useEffect(() => {
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

        const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`;




        setLoading(true);
        setError('');

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                return response.json();
            })
            .then(data => {
                setEvent(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return <p>Loading event details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }

    

    return (
        <div>

            <h1>{event.name}</h1>

            {event.images?.[0]?.url && (
                <img src={event.images[0].url} width="400" />
            )}

            <p>Date: {event.dates?.start?.localDate || 'Unavailable'}</p>
            <p>Time: {event.dates?.start?.localTime || 'Unavailable'}</p>

            <p>Venue: {event._embedded?.venues?.[0]?.name || 'Unavailable'}</p>
            <p>City: {event._embedded?.venues?.[0]?.city?.name || 'Unavailable'}</p>
            <p>Country: {event._embedded?.venues?.[0]?.country?.name || 'Unavailable'}</p>

            <p>Category: {event.classifications?.[0]?.segment?.name || 'Unavailable'}</p>

            {event.info && <p>Info: {event.info}</p>}
            {event.pleaseNote && <p>Please Note: {event.pleaseNote}</p>}

            <a href={event.url}>
                View on Ticketmaster
            </a>

            {currentUser && !registered && (
                <button onClick={handleRegister}>Register for Event</button>
            )}
            {registered && <p>You are registered for this event.</p>}

        </div>
    );
}

export default EventDetails;
