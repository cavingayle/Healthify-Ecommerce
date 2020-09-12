import React from "react";
import { connect } from "react-redux";
import { Container } from "./footer";
import Checkout from "./Checkout";
import { PageLayout } from "./PageLayout";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  deleteFromCart,
} from "../ducks/reducer";
import "./cart.css";

// for stripe i need to add the total * 100 for the amount on stripe
function cart(props) {
  const { increaseCartQuantity, decreaseCartQuantity, deleteFromCart } = props;
    const { cart } = props;
    const total = cart.map(pro => pro.quantity * pro.price).reduce((a,b) => (a + b ),0)
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
        <div>
          {cart.map((pro) => (
              
            <div className="details-cart" key={pro.product_id}>
              <img className="cartimg" src={pro.img} alt="" />
              <div className="box">
                <div className="row">
                  <h2>{pro.name}</h2>
                  <span>${pro.price}</span>
                </div>

                <p>{pro.description}</p>
                <div className="amount">
                  <button className="count"> - </button>
                  <span>{pro.quantity}</span>
                  <button className="count"> + </button>
                </div>
              </div>
              <div
                onClick={() => deleteFromCart(pro.product_id)}
                className="delete"
              >
                      X
              </div>
                  
              
              </div>
              
          ))}
              <div className="total">
                    <h3>Total: ${total}</h3>
                </div>   
          <Checkout />
        </div>
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
