import React from "react";
import { connect } from "react-redux";
import { Container } from "./styles";
import Checkout from "./Checkout";
import { PageLayout } from "./PageLayout";
import styled from 'styled-components'
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  deleteFromCart,
} from "../ducks/reducer";

// for stripe i need to add the total * 100 for the amount on stripe
function cart(props) {
  const { increaseCartQuantity, decreaseCartQuantity, deleteFromCart } = props;
  const { cart } = props;

  const quantiyTracker = (id, qty) => {
    deleteFromCart(id);
  };

  const total = cart
    .map((pro) => pro.quantity * pro.price)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  if (cart.length === 0) {
    return (
      <PageLayout>
        {" "}
        <Container>
          {" "}
          <h2 style={{ textAlign: "center" }}>Your Cart's Empty!</h2>{" "}
        </Container>{" "}
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        <CartContainer>
          <h2>Your Cart </h2>

          {cart.map((pro) => (
            <CartDetails key={pro.product_id}>
              <span>
                <img src={pro.img} alt="" width="200" />
              </span>

              <span>
                <span>
                  <Button
                    onClick={() => decreaseCartQuantity(pro.product_id)}
                  >
                    {" "}
                    -{" "}
                  </Button>
                </span>

                <span>
                  {pro.quantity === 0
                    ? quantiyTracker(pro.product_id)
                    : pro.quantity}
                </span>
                <span>
                  <Button
                    onClick={() => increaseCartQuantity(pro.product_id)}
                  >
                    {" "}
                    +{" "}
                  </Button>
                </span>
                
              </span>
              <span >
                  <h2>{pro.name}</h2>
                </span>
              <Delete
                
                onClick={() => deleteFromCart(pro.product_id)}
              >
                X
              </Delete>
            </CartDetails>
          ))}
          <Total>
            <h3>Total: ${total}</h3>
          </Total>
                <Checkout total={total}/>
        </CartContainer>
      </PageLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  increaseCartQuantity,
  decreaseCartQuantity,
  deleteFromCart,
})(cart);


const CartContainer = styled.div`
align-items: center;
    justify-content: center;
    text-align: center;
   
padding: 1em;
`
const Button = styled.button`
width: 40px;
    height: 30px;
    margin: 0 10px;
    border: 1px solid #555;
    outline: none;
    background: transparent;
    cursor: pointer;
`
const Delete = styled.div`
position: absolute;
    top: 0;
    right: 5px;
    color: crimson;
    cursor: pointer;
    font-weight: 900;
    margin-top: 7px;
`
const Total = styled.div`
color: crimson;
width: 100%;
    height: 50px;
    /* display: flex; */
    align-items: center;
    justify-items: center;
    text-align: center;
    padding: .5em;
`
const CartDetails = styled.div`
position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  
    border-bottom: 1px solid #ccc;


    align-items: center;
    align-content: center;

    @media (max-width: 786px) {
        grid-template-columns: 1fr;
        align-content: center;
        justify-content: center;
        grid-gap: 1em;
        margin: 0 auto;
        padding: 2.3em;
        /* width: 100%; */
      }
`