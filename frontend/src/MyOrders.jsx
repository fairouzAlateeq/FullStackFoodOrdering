import { useEffect, useState } from 'react';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/orders/my-orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <h4>Order #{order._id.slice(-5)}</h4>
            <p>Status: {order.status}</p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.menuItem.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
