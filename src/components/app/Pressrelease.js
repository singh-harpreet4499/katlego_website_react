

// import React from 'react';
import defaultimg1 from '../../libs/images/brands/1.png'
import defaultimg2 from '../../libs/images/brands/2.png'
import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const Pressrelease = (props) => {
    
const options1 = {
    nav: false,
    dots: false,
   
    margin: 30,
    loop: true,
    responsive: {
      0: {
        items: 2,
      },
      420: {
        items: 3,
      },
    
      600: {
        items: 4,
      },
      900: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
}


    return (
        <div className="container">
                <div className="mt-2 mb-3"> </div>
                <h2 className="title text-center story">Press Releases</h2>
                <OwlCarousel className='owl-carousel mt-3 mb-3 owl-simple owl-loaded owl-drag' {...options1} >
                    <div className="owl-item active" style={{width:'169.667px',marginRight:'30px'}} ><div className="brand">
                        <img src={defaultimg1} alt="Brand Name" />
                    </div></div>
                    <div className="owl-item active" style={{width:'169.667px',marginRight:'30px'}} ><div className="brand">
                        <img src={defaultimg2} alt="Brand Name" />
                    </div></div>
                </OwlCarousel>
        </div>
    )
    ;
}

export default Pressrelease;