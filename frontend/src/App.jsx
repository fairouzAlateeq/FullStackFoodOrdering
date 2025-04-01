import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Restaurants from './Restaurants';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import MyOrders from './MyOrders';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants" element={<PrivateRoute><Restaurants /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />


      </Routes>
    </Router>
  );
}

export default App;
