import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Products from './pages/ProductsPage';
import Contact from './pages/ContactPage';
import SingleProduct from './pages/SingleProductPage';
import Default from './pages/Default.js';
import Cart from './pages/CartPage';
import {Switch,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <SideBar />
        <SideCart />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about"  component={About} />
          <Route path="/contact"  component={Contact} />
          <Route path="/products" exact component={Products} />
          <Route path="/products/:id"  component={SingleProduct} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Footer />
      </>
    )
  }
}

