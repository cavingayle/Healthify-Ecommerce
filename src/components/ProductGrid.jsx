import React, {useEffect} from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import {getProducts} from '../ducks/reducer'
import { PageLayout } from "./PageLayout";


function ProductGrid(props) {

  useEffect(() => {
  props.getProducts()
  },[])
  

  return (
    <PageLayout>
    <SectionWrapper>
      <ProductGridWrapper>
        {props.products.map(
          (pro) =>
            pro.type.replace(/^/, "/") === props.location.pathname && (
              
              <ProductCard key={pro.product_id} {...pro} />
              
            )
        )}
      </ProductGridWrapper>
      </SectionWrapper>
      </PageLayout>
  );
}

const SectionWrapper = styled.div`
  padding: 5px;
`;

const ProductGridWrapper = styled.div`

  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
  align-items: stretch;
  /* align-content: flex-start; */
`;



const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {getProducts})(ProductGrid);
