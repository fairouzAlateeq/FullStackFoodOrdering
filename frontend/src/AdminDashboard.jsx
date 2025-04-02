import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const token = localStorage.getItem('token');
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
  });
  const [newMenuItems, setNewMenuItems] = useState({});
  const [allMenuItems, setAllMenuItems] = useState({});


  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        data.forEach(r => fetchMenuItems(r._id)); 
      })      
      .catch(err => console.error('Error fetching restaurants:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRestaurants(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Error deleting restaurant:', err);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5000/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRestaurant),
      });
  
      const data = await res.json();
      setRestaurants(prev => [...prev, data]);
      setNewRestaurant({ name: '', description: '' }); // reset form
    } catch (err) {
      console.error('Error creating restaurant:', err);
    }
  };
  const handleAddMenuItem = async (restaurantId) => {
    const item = newMenuItems[restaurantId];
    if (!item?.name || !item?.price) return;
  
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${restaurantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
  
      const data = await res.json();
      console.log('Menu item created:', data);
      setNewMenuItems(prev => ({ ...prev, [restaurantId]: { name: '', price: '' } }));
    } catch (err) {
      console.error('Error adding menu item:', err);
    }
  };
  const fetchMenuItems = async (restaurantId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/menu/${restaurantId}`);
    const data = await res.json();

    setAllMenuItems(prev => ({
      ...prev,
      [restaurantId]: data
    }));
  } catch (err) {
    console.error('Error fetching menu items:', err);
  }
};

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      {restaurants.map(r => (
        <div key={r._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{r.name}</h3>
          <p>{r.description}</p>
          <button onClick={() => handleDelete(r._id)}>Delete</button>
          <h4>Add Menu Item</h4>
<input
  placeholder="Item name"
  value={newMenuItems[r._id]?.name || ''}
  onChange={(e) =>
    setNewMenuItems(prev => ({
      ...prev,
      [r._id]: {
        ...prev[r._id],
        name: e.target.value,
        price: prev[r._id]?.price || '',
      },
    }))
  }
/>
<br />
<input
  placeholder="Price"
  type="number"
  value={newMenuItems[r._id]?.price || ''}
  onChange={(e) =>
    setNewMenuItems(prev => ({
      ...prev,
      [r._id]: {
        ...prev[r._id],
        name: prev[r._id]?.name || '',
        price: e.target.value,
      },
    }))
  }
/>
<br />
<button onClick={() => handleAddMenuItem(r._id)}>Add Item</button>
          {/* We'll add edit + add item buttons later */}
          <h4>Current Menu</h4>
          <ul>
  {allMenuItems[r._id] ? (
    allMenuItems[r._id].map(item => (
      <li key={item._id}>
        {item.name} — ${item.price.toFixed(2)}
      </li>
    ))
  ) : (
    <p>Loading...</p>
  )}
</ul>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
