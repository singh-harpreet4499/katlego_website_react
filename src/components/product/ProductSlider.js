// import React from 'react';
import OwlCarousel from "react-owl-carousel";
import Product from "./Product";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const options = {
    margin:10,
    loop: false,
    dots:false,
  
    navText:["<i class='icon-angle-left adjust_icon' ></i>","<i class='icon-angle-right adjust_icon' ></i>"],
    responsive:{
        0: {
            items:2,
            nav : false
        },
        480: {
            items:2,
            nav : false
        },
        768: {
            items:3,
            nav:true,
        },
        992: {
            items:3,
            nav:true,

        },
        1200: {
            items:3,
            nav:true,

        },
        1600: {
            items:6,
            nav:true,

        }
    }
}


const ProductSlider =(props) => {
  const {products}=props;
  return (
    <div>
      <div className="container">
        {/* <div className="tab-content tab-content-carousel"> */}
          
          {
            products.length ? 
            <OwlCarousel
              className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
            { ...options}
            >
              {
                products.map(({id,...otherdata})=><Product id={id} key={id} column_not_cut={true} combo_product={true} {...otherdata} />)
              }

            </OwlCarousel>
            :
          ''
          }

        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductSlider;
