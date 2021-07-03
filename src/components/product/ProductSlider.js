// import React from 'react';
import OwlCarousel from "react-owl-carousel";
import Product from "./Product";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
    margin:10,
    loop: false,
    dots:false,
    nav:true,
    responsive:{
        0: {
            items:2
        },
        480: {
            items:2
        },
        768: {
            items:3
        },
        992: {
            items:4
        },
        1200: {
            items:4
        },
        1600: {
            items:6,
            nav: true
        }
    }
}

const ProductSlider =(props) => {
  const {products}=props;
  return (
    <div>
      <div className="container">
        <div className="tab-content tab-content-carousel">
          <div
            className="tab-pane p-0 fade show active"
            id="products-featured-tab"
            role="tabpanel"
            aria-labelledby="products-featured-link"
          ></div>
          {
            products.length ? 
            <OwlCarousel
              className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
            { ...options}
            >
              {
                products.map(({id,...otherdata})=><Product id={id} key={id} column_not_cut={true} {...otherdata} />)
              }

            </OwlCarousel>
            :
          ''
          }

        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
