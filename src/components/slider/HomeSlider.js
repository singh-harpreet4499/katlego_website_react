
// import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import './homeslider.css'

import  defaultImage from '../../libs/images/demos/demo-2/slider/slide-8.jpg'
import  defaultImage2 from '../../libs/images/demos/demo-2/slider/slide-9.jpg'
import { useEffect, useState } from 'react';

import {fetch_showcase_products} from '../server/api'
import { Link } from 'react-router-dom';

const HomeSliderItem = (props) => (
    <div  className="intro-slide" style={{
        backgroundImage:'url('+props.image+')'
    }}>
    </div>
);

const HomeCategoryItem = ({mrp,name,imageUrl,hifen_name,id,selling_price,discount,net_wt,unit}) => (
    <div className="owl-item " data-swiper-slide-index="0" style={{width:'272.5px',marginRight:'10px'}}>
        <div className="set-slide" >
            <Link 
            to={{
                    pathname: "/product-details/"+hifen_name+"/"+(id),
                }}
                className="setfire" >
                <figure className="new_swiper-slide-inner">
                    <img className="swiper-slide-image" style={{borderRadius:'50%'}} src={imageUrl} alt={name} />
                </figure>

                <span className="content-fire">
                    <span className="plant-title">{name ? name.substring(0, 15)+'..' : ''}</span>

                    <ul className="anti">
                        <div className="row">
                            <div className="col-md-12">
                                {/* <li className="ch-lis">
                                100% Antibiotics Free
                                        </li> */}
                                <li className="ch-lis">
                                Net Wt: {net_wt} {unit}
                                </li>
                            </div>
                        </div>
                    </ul>

                    <div className="align-items-center mt-1">
                        <div className="row">
                            <div className="bu-box">
                                <button type="submit" className="btn buy-btn-2">Buy Now</button>
                            </div>
                            <div className="pri-bo">
                                {
                                    mrp>selling_price ? (
                                        <>
                                        
                                        <h6 className="price m-0  chi-pri">₹{selling_price}/{unit}</h6><strike className="pri"> MRP₹{mrp}/{unit}</strike>
                                        </>
                                    )
                                    : 
                                    (<><h6 className="price m-0  chi-pri">₹{selling_price}/{unit}</h6><strike className="pri"> MRP₹{mrp}/{unit}</strike></>)
                                }
                            </div>
                        </div>
                    </div>
                </span>
            </Link>
        </div>
    </div>
);

const HomeCategoryItem2 = ({mrp,name,imageUrl,hifen_name,id,selling_price,discount,net_wt,unit}) => (
    // const {mrp,name,imageUrl,hifen_name,id,selling_price,discount,net_wt}=props
    
    <div className="owl-item active swiper-slide" data-swiper-slide-index="0" style={{width:'272.5px',marginRight:'10px'}} >

        <Link 
           to={{
                pathname: "/product-details/"+hifen_name+"/"+(id),
            }}
            className="fire fire_new" >
            <figure className="swiper-slide-inner">
                <img className="swiper-slide-image" alt="" src={imageUrl} />
            </figure>

            <span className="content-fire">
                <span className="plant-title">{name ? name.substring(0, 15)+'..' : ''}</span>

                <span className="plant-description">

                </span>
                <div className="product-price sli-pri">
                    {
                        parseFloat(mrp) > parseFloat(selling_price) ? 

                        (<div>
                        <span className="new-price">₹{selling_price}</span>
                        <strike className="old-price">₹{mrp}</strike>
                        </div>)
                        : ''
                    }
                    
                </div>
                <h6 className="pro-wei">Net Weight: {net_wt} {unit}</h6>
                <p className="buy">Buy Now</p>


            </span>
        </Link>
    </div>
)

const options1 = {
    nav: false,
    dots: false,
    // autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:1400,
    margin: 20,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      420: {
        items: 1,
      },
    
      600: {
        items: 2,
      },
      900: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    },
}

const HomeSlider = (props) => {

    const [homeCategory , setHomeCategory] = useState([]);


    const load_shocase_category =async () => {

        await fetch_showcase_products().then(async(response)=>{
            if(response.status){
                setHomeCategory(response.data)
            }
        })

    }
    useEffect(() => {
        load_shocase_category()
    }, [])


    return (
        <div>
            <div className="intro-slider-container">
                <OwlCarousel className='owl-theme owl-carousel owl-simple owl-light owl-nav-inside' dots={false} items={1} loop nav>
                <HomeSliderItem image={defaultImage} />
                <HomeSliderItem image={defaultImage2} />
                </OwlCarousel>
            </div>
            <div className="container"  >
            {
                homeCategory.length ?

                (<OwlCarousel className='owl-carousel mt-2 owl-simple owl-loaded owl-drag pro-sli' {...options1}>
                    <div className="owl-stage-outer">
                        <div className="owl-stage" style= {{transform:'translate3d(0px, 0px, 0px)',width:'1199px'}}>
                            {
                                homeCategory.length ?

                                homeCategory.map(({id,name,...otherData})=>{
                                    return <HomeCategoryItem key={id} id={id} name={name} {...otherData} />
                                })
                                : ''
                            }
                       
                        </div>
                    </div>
                </OwlCarousel>)
                : ''
            }
            </div>
        </div>
    );
}

export default HomeSlider