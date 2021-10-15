import Category from "../category/Category";
import OwlCarousel from "react-owl-carousel";
import SpinLoader from '../loader/SpinLoader';

import './header.css'
// import defaultImage from '../../libs/images/1.png'
// import defaultImage2 from '../../libs/images/2.png'
// import defaultImage3 from '../../libs/images/3.png'
// import defaultImage4 from '../../libs/images/4.png'
// import defaultImage5 from '../../libs/images/5.png'
// import defaultImage6 from '../../libs/images/6.png'
// import defaultImage7 from '../../libs/images/7.png'
// import defaultImage8 from '../../libs/images/8.png'
// import { useEffect, useState } from "react";

const options = {
  autoplayHoverPause:true,
  nav: false,
  navText:["<i class='icon-angle-left adjust_icon' ></i>","<i class='icon-angle-right adjust_icon' ></i>"],
  dots: false,
  autoplay: true,
  autoplayTimeout:3000,
  margin: 10,
  loop: true,
  responsive: {
    0: {
      items: 3,
    },
    480: {
      items: 3,
    },
    576: {
      items: 3,
    },
    768: {
      items: 5,
    },
    992: {
      items: 6,
    },
    1200: {
      items: 8,
    },
  },
};


const Header = (props) => {
  const { categories,canMove } = props;

  // console.log(categories);
  if(canMove===0){
    return (<SpinLoader />)
  }else{
    return (
      <div>
        <div className="container banner-group-1">
          <div className="categories">
            {categories.length ? (
              <OwlCarousel
                className="
            owl-carousel
            carousel-theme carousel-simple carousel-with-shadow
            row
            cols-2 cols-xs-3 cols-sm-4 cols-md-5 cols-lg-6 cols-xl-8"
                {...options}
              >
                {categories.map(({ id, name, ...otherData }) => (
                  <Category key={id} id={id} name={name}  {...otherData} />
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
