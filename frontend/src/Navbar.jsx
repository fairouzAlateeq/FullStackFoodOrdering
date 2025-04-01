import { Link } from 'react-router-dom';
import './Navbar.css';


const token = localStorage.getItem('token');
function Navbar() {
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      };
      
  return (
    <nav className="navbar">
      <h1>Foodie</h1>
      <ul>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/restaurants">Restaurants</Link></li>

  {!token ? (
  <>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </>
) : (
  <>
    <li><Link to="/my-orders">My Orders</Link></li>
    <li><Link to="/cart">Cart</Link></li>
    <li><button onClick={handleLogout}>Logout</button></li>
  </>
)}

</ul>

    </nav>
  );
}

export default Navbar;
