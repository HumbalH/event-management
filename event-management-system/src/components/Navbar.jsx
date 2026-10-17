import { Link } from "react-router-dom";

function Navbar(){
    return(

<nav>
<Link to="/">Home</Link>
<Link to="/myevents">My Events</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>




</nav>



    );
}

export default Navbar;