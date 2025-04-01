import { useEffect, useState } from 'react';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error('Error fetching restaurants:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Browse Restaurants</h2>
      {restaurants.map((r) => (
        <div key={r._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{r.name}</h3>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;
