import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Foodie</h1>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Restaurants</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
