import { useEffect, useState } from 'react';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]); // ✅ added this line
  const [menuItems, setMenuItems] = useState({});
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    // ✅ fetch all restaurants, then fetch their menu items
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        data.forEach(r => fetchMenuItems(r._id)); // ⬅ fetch menu for each
      })
      .catch(err => console.error('Error fetching restaurants:', err));
  }, []);

  const fetchMenuItems = async (restaurantId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${restaurantId}`);
      const data = await res.json();
      setMenuItems(prev => ({
        ...prev,
        [restaurantId]: data,
      }));
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  const handleAddToCart = async (menuItemId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menuItemId, quantity: 1 }),
      });

      const data = await res.json();
      console.log('Item added:', data);
      setSuccessMessage('Item added to cart!');
setTimeout(() => {
  setSuccessMessage('');
}, 2000); 

    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Browse Restaurants</h2>
      {successMessage && (
  <p style={{ color: 'green', marginBottom: '1rem' }}>{successMessage}</p>
)}
      {restaurants.map((r) => (
        <div
          key={r._id}
          style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '2rem' }}
        >
          <h3>{r.name}</h3>
          <p>{r.description}</p>

          <h4>Menu</h4>
          {menuItems[r._id] ? (
            menuItems[r._id].map((item) => (
              <div
                key={item._id}
                style={{
                  marginLeft: '1rem',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  border: '1px dashed #aaa',
                }}
              >
                <p>
                  <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                </p>
                <p>{item.description}</p>
                <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>Loading menu...</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Restaurants;
