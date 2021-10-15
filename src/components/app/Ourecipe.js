import { useEffect } from "react";
import { Link } from "react-router-dom";
import defaultimg1 from "../../libs/images/demos/demo-2/banners/banner-1.jpg";
import defaultimg2 from "../../libs/images/demos/demo-2/banners/banner-2.jpg";
import defaultimg3 from "../../libs/images/demos/demo-2/banners/banner-3.jpg";
import defaultimg4 from "../../libs/images/demos/demo-2/banners/banner-4.jpg";

const Ourrecipe = (props) => {

    useEffect(() => {
       
    }, [])


    return (
        <div className="banner-group">
        <div className="container">
            <hr className="mt-2 mb-3" />

            <h2 className="title text-center reci">Our Recipes</h2>

            <div className="row">
                <div className="col-md-12 col-lg-5">
                    <div className="banner banner-large banner-overlay">
                        <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}>
                            <img src={defaultimg1} alt="Banner" />
                        </Link>

                        <div className="banner-content banner-content-top">
                            <h4 className="banner-subtitle">Best Chicken</h4>
                            <h3 className="banner-title">Tandoori Chicken</h3>
                            <div className="banner-text">from ₹399.99</div>
                            <Link 
                            to={{
                                pathname:'/recipe-list'
                            }} className="btn btn-outline-gray banner-link">Discover Now<i className="icon-long-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="banner banner-overlay">
                        <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}>
                            <img src={defaultimg2} alt="Banner" />
                        </Link>

                        <div className="banner-content banner-content-bottom">
                            <h4 className="banner-subtitle text-grey">Best Offer</h4>
                            <h3 className="banner-title text-white">Chicken <br />Keema</h3>
                            <div className="banner-text text-white">from ₹299.99</div>
                            <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}
                            className="btn btn-outline-white banner-link">Discover Now<i className="icon-long-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="banner banner-overlay banner-overlay-light">
                        <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}>
                            <img src={defaultimg3} alt="Banner" />
                        </Link>

                        <div className="banner-content banner-content-top">
                            <h4 className="banner-subtitle text-grey">New Dish</h4>
                            <h3 className="banner-title text-white">Chicken Curry <br />Cut</h3>
                            <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}
                            className="btn btn-outline-white banner-link">Discover Now<i className="icon-long-arrow-right"></i></Link>
                        </div>
                    </div>

                    <div className="banner banner-overlay banner-overlay-light">
                        <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}>
                            <img src={defaultimg4} alt="Banner" />
                        </Link>

                        <div className="banner-content banner-content-top">
                            <h4 className="banner-subtitle text-white">Best Dish</h4>
                            <h3 className="banner-title text-white">Chicken Thigh</h3>
                            <div className="banner-text text-white">up to 30% off</div>
                            <Link 
                            to={{
                                pathname:'/recipe-list'
                            }}
                            className="btn btn-outline-white banner-link text-white">Discover Now<i className="icon-long-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Ourrecipe;