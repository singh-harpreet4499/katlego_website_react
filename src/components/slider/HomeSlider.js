
// import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import  defaultImage from '../../libs/images/demos/demo-2/slider/slide-8.jpg'
import  defaultImage2 from '../../libs/images/demos/demo-2/slider/slide-9.jpg'

const HomeSliderItem = (props) => (
    <div  className="intro-slide" style={{
        backgroundImage:'url('+props.image+')'
    }}>
    </div>
);
function HomeSlider(props){

    return (
        <div>
            <OwlCarousel className='owl-theme owl-carousel owl-simple owl-light owl-nav-inside' items={1} loop nav>
               <HomeSliderItem image={defaultImage} />
               <HomeSliderItem image={defaultImage2} />
            </OwlCarousel>
        </div>
    );
}

export default HomeSlider