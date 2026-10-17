import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../redux/authSlice';

function Navbar(){

    const currentUser = useSelector((state) => state.auth.user);
const dispatch = useDispatch();

function handleLogout(){

dispatch(logout());
localStorage.removeItem('currentUser');

}
    return(
<div>
<nav>
<Link to="/">Home</Link>
<Link to="/myevents">My Events</Link>
{currentUser ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
{!currentUser ? <Link to="/register">Register</Link> : null}





</nav>
{currentUser && <h2>Welcome, {currentUser.name}</h2>}
</div>

    );
}

export default Navbar;