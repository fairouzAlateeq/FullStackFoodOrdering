import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';
import { useCart } from './CartContext';


function Navbar() {
    
    const token = localStorage.getItem('token');
    let isAdmin = false;
    const { cartCount } = useCart();

    if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === 'admin';
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      };
      
  return (
    <nav className="navbar">
      <h1>Foodie</h1>
      <ul>
  <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
  Home
</NavLink>
</li>
  <li><Link to="/restaurants">Restaurants</Link></li>

  {!token ? (
  <>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </>
) : (
  <>
    <li><Link to="/my-orders">My Orders</Link></li>
    <li>
  <Link to="/cart">
    Cart {cartCount > 0 && <span style={{
      backgroundColor: 'white',
      color: '#ff6347',
      borderRadius: '999px',
      padding: '2px 8px',
      fontWeight: 'bold',
      marginLeft: '4px'
    }}>{cartCount}</span>}
  </Link>
</li>
    {isAdmin && <li><Link to="/admin">Admin</Link></li>}
    <li><button onClick={handleLogout}>Logout</button></li>
  </>
)}

</ul>

    </nav>
  );
}

export default Navbar;
