import React from "react";
import {Route,Routes} from 'react-router-dom'
import {DataProvider} from './Context'
import Navbar from "./components/navbar/Navbar";
import Product from "./components/pages/product/Product";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Cart from "./components/pages/cart/Cart";
import NotFound from "./components/notFound/NotFound";
import ViewProduct from "./components/pages/product/ViewProduct";

function App() {
  return (
    <>
    <DataProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/detail/:id" element={<ViewProduct/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </DataProvider>

    </>
  );
}

export default App;
