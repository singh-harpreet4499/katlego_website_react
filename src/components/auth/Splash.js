
import React from 'react';

import "../../libs/vendor/sidebar/demo.css";
import "../../libs/vendor/icons/icofont.min.css";
import "../../libs/vendor/slick/slick.min.css"
import "../../libs/vendor/slick/slick-theme.min.css";
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-flip/effect-flip.scss';
import './splash.css'

import image1 from '../../libs/images/login/1.jpg'
import image2 from '../../libs/images/login/2.jpg'
import image3 from '../../libs/images/login/3.jpg'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const SliderElement = (props) => {
    var {title,description,image} = props
    return (

        // <div className="osahan-slider-item text-center">
        //         <div
        //         className="
        //             d-flex
        //             align-items-center
        //             justify-content-center
        //             vh-100
        //             flex-column
        //             "
        //         >
        //         <i className="icofont-sale-discount display-1 text-warning"></i>
        //         <h4 className="my-4 text-white">{title}</h4>
        //         <p className="text-center text-white-50 mb-5 px-4">
        //             {description}
        //         </p>
        //         </div>
        //     </div>
        <div class="osahan-slider-item text-center">
            <div class="d-flex align-items-center justify-content-center vh-100 flex-column"> 
                <img src={image} alt="d" className="splash_image" />
            </div>
        </div>
    )
}
function Splash(props) {
    return (
        <section className="osahan-main-body osahan-signin-main">
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center vh-100" >
                    {/* <div className="landing-page shadow-sm bg-success col-lg-6"> */}
                    <div className="landing-page col-lg-6">

                                <Link
                                className="position-absolute btn-sm btn btn-outline-light m-4 zindex"
                                    to={{
                                    pathname: "/",
                                    }}>Skip <i className="icofont-bubble-right"></i></Link>

                                <div className="osahan-slider m-0">

                                    <Swiper
                                    color={'red'}

                                        preloadImages={true}
                                        slidesPerView={1}
                                        // navigation
                                        pagination={{ clickable: true }}
                                        // scrollbar={{ draggable: true }}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                        >
                                            <SwiperSlide 
                                                className="custom-slider-css"
                                                >
                                                <SliderElement 
                                                 image={image1}
                                                title="Best Prices & Offers"
                                                description="Cheaper prices than your local supermarket, great cashback offers to top it off"
                                                />
                                            </SwiperSlide>

                                            <SwiperSlide 
                                                className="custom-slider-css"
                                                >
                                                <SliderElement 
                                                 image={image2}
                                                    title="Wide Assortment"
                                                    description="Choose from 5000+ products across food, personal care, household & other categories."
                                                    />
                                            </SwiperSlide>

                                            <SwiperSlide 
                                                className="custom-slider-css"
                                                >
                                                <SliderElement 
                                                image={image3}
                                                title="Easy Returns"
                                                description="Not satisfied with a product? Return it as the doorstep & get a refund within hours."
                                                />
                                            </SwiperSlide>
                                    </Swiper>

                                </div>

                                
                    </div>
                    {props.auth_component}
                </div>
            </div>
        </section>
    );
    }

export default Splash;
