import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import Admin from "./components/Admin";
import Auth from "./components/Auth";
import Register from "./components/Register";
import { FooterContainer } from "./containers/Footer";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import routes from "./routes";
import { withRouter } from 'react-router-dom'
import ProductDetails from "./components/ProductDetails";


function App(props) {

  console.log('App',props )
  return (
    <>
      
      {/* {(props.location.pathname !== "/login" && props.location.pathname !== "/welcome" && props.location.pathname !== "/register" && props.location.pathname !== "/admin" ) && <Navbar />} */}
      
      {routes}
      

    </>
  );
}

const Container = styled.section`
box-shadow: 0 0 5px #ccc;
    padding: 10 15px;


    /* display: flex; */

`;



export default withRouter(App);
