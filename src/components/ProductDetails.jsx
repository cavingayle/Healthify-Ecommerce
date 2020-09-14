import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Button } from "./styles";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToCart, getProducts } from "../ducks/reducer";
import { PageLayout } from "./PageLayout";

function ProductDetails(props) {
    const [details, setDetails] = useState({});

    useEffect(() => {
        props.getProducts()
    axios.get(`/api/products/${props.match.params.id}`).then((res) => {
        setTimeout(() => setDetails(res.data[0]), 500);
        
    });
  }, []);

    


  return (
    <PageLayout>
      <ProdContainer>
        <CarouselWrapper>
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            width="300px"
          >
            <div>
              <img alt="" src={details.img} />
            </div>
            <div>
              <img alt="" src={details.img_two} />
            </div>
            <div>
              <img alt="" src={details.img_three} />
            </div>
          </Carousel>
        </CarouselWrapper>
        <DetailsContainer>
          <Name>
            {" "}
            
            <span className="name">{details.name}</span>{" "}
          </Name>

          <Ingredients>
            {" "}
            <span className="description"><strong >Ingredients:</strong> <br/>{details.description}</span>{" "}
                  </Ingredients>
                  <Price>
            {" "}
            <span className="price">${details.price}</span>{" "}
          </Price>
                  <div>
                      <Button onClick={() =>props.addToCart(details.product_id)}>
                          ADD TO CART
                      </Button>
                  </div>
                  
              </DetailsContainer>
              
          </ProdContainer>
          
    </PageLayout>
  );
}

const Name = styled.div`
margin: 0 0 2em 0;
font-weight: bold;
font-size: 1.7em;
line-height: 1.4;

`
const Ingredients = styled.div`
margin: 0 0 2em 0;
line-height: 1.4;

`
const Price = styled.div`
margin: 0 0 2.5em 0;
color: darkslategray;


`

const ProdContainer = styled.div`
  padding: 4em;
  /* margin-top: 100px; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  /* margin: auto; */
  justify-content: center;
  align-content: center;
  grid-auto-flow: row;
  /* border: 1px solid #ccc; */


  @media (max-width: 786px) {
    grid-template-columns: 1fr;
    align-content: center;
    justify-content: center;
    margin: 0 auto;
    padding: 2.3em;
    /* width: 100%; */
  }
`;

const CarouselWrapper = styled.div`
  border-right: 1px solid #ccc;
  align-items: center;
  display: flex;
  justify-content: center;

  @media (max-width: 786px) {
   border-right: none;
   border-bottom: 1px solid #ccc;
  }
`;

const DetailsContainer = styled.div`
  /* border: 1px solid #ccc; */
  /* align-items: center; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2em;
  line-height: 1.3em;
`;

const mapStateToProps = state => state

export default connect(mapStateToProps, { addToCart, getProducts })(ProductDetails);
