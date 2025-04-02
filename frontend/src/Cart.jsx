import { useEffect, useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error('Error fetching cart:', err));
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setCart([]);
      setOrderSuccess(true);
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + item.menuItem.price * item.quantity;
    }, 0);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Cart</h2>
      {orderSuccess && <p style={{ color: 'green' }}>Order placed successfully!</p>}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item._id} style={{ marginBottom: '1rem' }}>
                <strong>{item.menuItem.name}</strong> x {item.quantity} — ${item.menuItem.price.toFixed(2)}
              </li>
            ))}
          </ul>

          <h3>Total: ${getTotal().toFixed(2)}</h3>
          <button onClick={handleCheckout}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;