import React from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "./components/Cart"
import Welcome from "./components/Welcome"
import ProductDetails from "./components/ProductDetails"
import Auth from "./components/Auth"
import ProductGrid from "./components/ProductGrid";
import MyAisle from "./components/MyAisle";
import Register from "./components/Register";
import Admin from "./components/Admin";

export default (
    <Switch>
        <Route component={Cart} path="/cart" />
        <Route component={Welcome} path="/welcome" />
        <Route component={ProductDetails} path="/p/:id" /> 
        <Route component={Auth} path="/login" />
        <Route component={ProductGrid} path="/products" />
        <Route component={MyAisle} path="/myaisle" />
        <Route component={Register} path="/register" />
         <Route component={Admin} path="/admin" />
        <Route component={ProductGrid} path="/food" />
        {/* <Route component={} path="" /> */}
        
    </Switch>
);