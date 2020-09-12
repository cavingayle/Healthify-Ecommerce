import React, {useEffect} from 'react'
import './myaisle.css'
import { connect } from "react-redux";
import { getProducts } from "../ducks/reducer";

function MyAisle(props) {

  useEffect(() => {
  props.getProducts()
},[])

// const img = https://cdn.vox-cdn.com/thumbor/SWUnOrllEGy9EtOW6h_HrJddCbY=/0x0:801x599/1200x800/filters:focal(336x235:464x363)/cdn.vox-cdn.com/uploads/chorus_image/image/63708150/03262016-thrive-market-food.0.1462600315.0.jpg
  
    return (
        <div>
        <section id="feature-section" className="feature-section">
          <div className="flex-container w-container">
            <div className="feature-image-mask"><img src="https://img.thrivemarket.com/custom_assets/6d6692c5fb9c2e7ae3e87b08a467300e.jpg?w=1440" alt="" className="feature-image" /></div>
            <div>
              <h2>Healthy Living Made Easy<br /></h2>
              <p>Your favorite organic and non-GMO brands at guaranteed savings, shipped to you</p><a href="#" className="button w-button">Button Text</a></div>
          </div>
        </section>
        {/* <header id="hero" className="hero">
          <div className="flex-container w-container">
            <div>
              <h1>What is Thrive Market?<br /></h1>
              <p />
            </div>
            <div className="hero-image-mask"><img src="https://uploads-ssl.webflow.com/5db1c76aadcfe25e881680fa/5db86dc421496616bf357c25_placeholder.svg" alt="" className="hero-image" /></div>
          </div>
        </header> */}
      </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getProducts})(MyAisle)


