import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Container, Button } from "./footer/";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToCart } from "../ducks/reducer";
import { PageLayout } from "./PageLayout";

function ProductDetails(props) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios.get(`/api/products/${props.match.params.id}`).then((res) => {
      setTimeout(() => setDetails(res.data[0]), 500);
    });
  }, []);

  console.log(details);

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
          <div>
            {" "}
            <span className="name">{details.name}</span>{" "}
          </div>
          <div>
            {" "}
            <span className="price">{details.price}</span>{" "}
          </div>
          <div>
            {" "}
            <span className="description">{details.description}</span>{" "}
                  </div>
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
  border: 1px solid #ccc;


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

export default connect(null, { addToCart })(ProductDetails);
