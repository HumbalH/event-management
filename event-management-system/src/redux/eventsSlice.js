import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: JSON.parse(localStorage.getItem('userEvents')) || []
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {

        const exists = state.events.some(event => event.id === action.payload.id && event.email === action.payload.email);
        if (!exists) {
            state.events.push(action.payload);
        }
    },

    removeEvent: (state, action) => {
      state.events = state.events.filter(event =>
        !(event.id === action.payload.id && event.email === action.payload.email)
    );
    }
  }
});

export const { addEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
