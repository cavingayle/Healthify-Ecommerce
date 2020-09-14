import React from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Welcome from "./components/Welcome";
import ProductDetails from "./components/ProductDetails";
import Auth from "./components/Auth";
import ProductGrid from "./components/ProductGrid";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Contact from "./components/Contact";

export default (
  <Switch>
    <Route component={Cart} path="/cart" />
    <Route component={Welcome} exact path="/" />
    <Route component={ProductDetails} path="/p/:id" />
    <Route component={Auth} path="/login" />
    <Route component={ProductGrid} path="/products" />
    <Route component={Register} path="/register" />
    <Route component={Admin} path="/admin" />
    <Route component={ProductGrid} path="/food" />
    <Route component={ProductGrid} path="/beauty" />
    <Route component={ProductGrid} path="/supplements" />
    <Route component={Contact} path="/contact" />
  </Switch>
);
