import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import {useSelector} from 'react-redux';
function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');

    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.auth.user);


    function handleLogin(e){
e.preventDefault();

const users = JSON.parse(localStorage.getItem('users')) || [];
const user = users.find(user => user.email.trim().toLowerCase() === email.trim().toLowerCase() && user.password === password);

if(user){
    
    setMessage('Login successful');
    const currentUser = {name: user.name, email: user.email};
    dispatch(login(currentUser));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
}else{
    setMessage('Invalid email or password');
}
    }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>    
        <input type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <input type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} />

<button type="submit">Login</button>
      </form>
{loggedInUser && <p>Welcome, {loggedInUser.name}</p>} 
   </div>
  );
}

export default Login;