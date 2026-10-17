import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import Login from './pages/Login'
import Register from './pages/Register'
import EventDetails from './pages/EventDetails'
import MyEvents from './pages/MyEvents'

function App() {
  
  return (

<div>
<Navbar />
<Routes>
      <Route path="/" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/myevents" element={<MyEvents />} />
</Routes>

</div>


  );
}

export default App;