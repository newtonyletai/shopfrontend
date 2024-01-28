import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Summary from './components/admin/Summary';
import CreateProduct from './components/admin/CreateProduct';
import ProductList from './components/admin/list/ProductList';
import Orders from './components/admin/Orders';
import Users from './components/admin/Users';
import Product from './components/admin/details/Product';
import Order from './components/admin/details/Order';
import UserProfile from './components/admin/details/UserProfile';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <ToastContainer />
     <Navbar/>
     <Routes>
     <Route path="/" exact element={<Home/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout-success" element={< CheckoutSuccess />} />
      <Route path='/register' element = {< Register/>} />
      <Route path='/login' element = { <Login /> } />
      <Route path='/product/:id' element = { <Product /> } />
      <Route path='/order/:id' element = { <Order /> } />
      <Route path='/user/:id' element = { <UserProfile /> } />
      <Route path='/admin' element = { <Dashboard /> }> 
        <Route path='products' element = { <Products /> } >
          <Route index element= { <ProductList /> } />
          <Route path='create-product' element = { <CreateProduct /> } />
        </Route>
        <Route path='summary' element = { <Summary /> } />
        <Route path='orders' element = { <Orders /> } />
        <Route path='users' element = { < Users /> } />
      </Route>
      <Route path="*" element={<NotFound/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
