import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import eventsReducer from './eventsSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer
  }
});

store.subscribe(() => {

    const registrations = store.getState().events.events;
    localStorage.setItem('userEvents', JSON.stringify(registrations));
});

export default store;