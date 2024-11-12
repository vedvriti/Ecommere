
import React from 'react';
import GetItemsFromCart from './Component/viewCart';
import GetProducts from './Component/viewProduct';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './Component/HomePage';
import GetOrder from './Component/ViewOrder';
import CheckoutForm from './Component/CheckoutForm';
import Success from './Component/OrderPlaced';
 
function App() {
  return (
<div className="App">
<header className="header">
<nav className="nav">
<h1>LuxeLiving</h1>
<ul>
<li>
<Link to="/">Home</Link>
</li>
<li>
<Link to="/products">Shop Inventory</Link>
</li>
<li>
<Link to="/cart">Shopping Bag</Link>
</li>
<li>
<Link to="/orders">Your Orders</Link>
</li>
</ul>
</nav>
</header>
<div className="bg-image" style={{ backgroundImage: 'url(\Premium-Sofa-scaled.jpg)', height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/cart" element={<GetItemsFromCart />} />
<Route path="/products" element={<GetProducts />} />
<Route path="/orders" element={<GetOrder />} />
<Route path="/checkout" element={<CheckoutForm/>} />
<Route path="/success" element={<Success />} />
</Routes>

<footer className="footer">
<p>&copy; 2024@copyright LuxeLiving</p>
</footer>
</div>


  );
}
 
export default App;