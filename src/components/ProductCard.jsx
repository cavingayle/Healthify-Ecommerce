import React, {useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToCart, increaseCartQuantity,clearCart } from '../ducks/reducer'
import { Link as ReactRouterDomLink, useLocation } from "react-router-dom";

const Card = styled.div`
  width: 200px;
    border: 1px solid #eee;
    overflow: hidden;
    padding: 10px;
    box-shadow: 2px 8px 20px #ddd;
    justify-content: center;
  
    margin: 30px;
    transition: 0.5s linear;
    &:hover{
    box-shadow: none;
    }


`;
const Link = ({ isActive, children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const CardDetails = styled.div`
h3 {
  text-decoration: none;
}

`


const ProductImage = styled.img`
  width: 100%;
`

const Button = styled.button`
  
    border: none;
    outline: none;
    background: #333;
    color: white;
    width: 100%;
    height: 40px;
    display: block;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 15px 0;

`;


const ProdLink = styled(Link)`
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



//Need to add in procut img source || Product name || prodcut Price ||
// return the title that will be wrapped ina link
// pull this off of redux to connect the button to add to cart
function ProductCard(props) {


  


  const {name, img, price, product_id, addToCart} = props
  return (
    <Card key={name} >
      <ProdLink to={`/p/${product_id}`}>
        <ProductImage src={img} alt={name} />
        </ProdLink>
      <Button onClick={() => addToCart(product_id)}>Add to cart</Button>
      <ProdLink to={`/p/${product_id}`}>
      <CardDetails>
        <h3 >{name}</h3>
          <h4>${price}</h4>
        </CardDetails>
        </ProdLink>
        
      

    </Card>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{addToCart, increaseCartQuantity, clearCart})(ProductCard);
