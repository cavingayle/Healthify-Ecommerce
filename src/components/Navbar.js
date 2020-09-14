import React, { useState, useEffect } from "react";
import { Link as ReactRouterDomLink } from "react-router-dom";


import styled from "styled-components";

import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { updateUser, getProducts, getCart, logout } from '../ducks/reducer'
import CartIcon from './media/shopping-cart-solid.svg'



function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
  
    
    // if (props.customerId === "") {
    //   props.history.push("/");
    // } else {
      props.getCart()
    // }
    
  }, [])


  const logout = () => {
    props.logout()
    props.history.push('/')
  }

  return (
    <Nav>
      <Logo to='/food'>
        Health
        <span>ify</span>
        
          </Logo>
          <Hamburger onClick={ () => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
          <Menu isOpen={isOpen}>
        <MenuLink to="/food">Food</MenuLink>
        <MenuLink to='/beauty'>Beauty</MenuLink>
        <MenuLink to="/supplments">Supplements</MenuLink>
        <MenuLink to="/wine">Wine</MenuLink>
        <MenuLink to="/contact">Contact</MenuLink>
        <MenuLink onClick={() => logout()}>Logout</MenuLink>
        <NavCart>
          <span>{props.cart === [] ? 0 :props.cart.map(pro => pro.quantity).reduce((a,b) => (a + b ),0)}</span>
          <MenuLink to='/cart'>
            <img src={CartIcon} alt="" width='20'/>
          </MenuLink>
        </NavCart>
      </Menu>
    </Nav>
  );
}

const Link = ({ isActive, children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const NavCart = styled.div`
span{
    position: absolute;
    top: 1px;
    right: 27px;
    background: crimson;
    font-size: 10px;
    color: white;
    padding: 3px 5px;
    border-radius: 50%;
    z-index: -1;
}
@media (max-width: 1067px) {
  display: none;
  span{
    position: relative;
    display: none;
    /* top: 10px; */
    /* right: 27px; */
  }
  }
`


const Nav = styled.nav`
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  /* background: lightgray; */
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled(Link)`
  padding: 1rem 0;
  color: black;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Hamburger = styled.div`
        display: none;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: black;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 1067px) {
    display: flex;
    .Header a:nth-child(4) {
    display: none;
}
  }

`;







const MenuLink = styled(Link)`
padding: 1rem 2rem;
cursor: pointer;
text-align: center;
text-decoration: none;
color: black;
transition: all 0.3s ease-in;
font-size: 0.9rem;
font-weight: bold;
&:hover {
  color: #7b7fda;
}
`;
const Menu = styled.div`
    display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 1067px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const mapStateToProps = state => state

export default connect(mapStateToProps,{ updateUser,logout, getProducts, getCart })(withRouter(Navbar));

