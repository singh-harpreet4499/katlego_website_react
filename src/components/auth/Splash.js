    import "../../libs/vendor/sidebar/demo.css";
    import "../../libs/vendor/icons/icofont.min.css";
    import "../../libs/vendor/slick/slick.min.css"
    import "../../libs/vendor/slick/slick-theme.min.css";

function Splash(props) {
    return (
        <section className="osahan-main-body">
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center vh-100">
                    <div className="landing-page shadow-sm bg-success col-lg-6">
                        <a
                        className="position-absolute btn-sm btn btn-outline-light m-4 zindex"
                        href="index.html"
                        >
                        Skip <i className="icofont-bubble-right"></i>
                        </a>
                        <div className="osahan-slider m-0">
                            <div className="osahan-slider-item text-center">
                                <div
                                className="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    vh-100
                                    flex-column
                                    "
                                >
                                <i className="icofont-sale-discount display-1 text-warning"></i>
                                <h4 className="my-4 text-white">Best Prices{' & '}Offers</h4>
                                <p className="text-center text-white-50 mb-5 px-4">
                                    Cheaper prices than your local
                                    <br />
                                    supermarket, great cashback offers to top it off.
                                </p>
                                </div>
                            </div>
                            {/* <div className="osahan-slider-item text-center">
                                <div
                                className="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    vh-100
                                    flex-column
                                    "
                                >
                                <i className="icofont-cart display-1 text-warning"></i>
                                <h4 className="my-4 text-white">Wide Assortment</h4>
                                <p className="text-center text-white-50 mb-5 px-4">
                                    Choose from 5000+ products across food
                                    <br />, personal care, household{" & "}other categories.
                                </p>
                                </div>
                            </div> */}
                            {/* <div className="osahan-slider-item text-center">
                                <div
                                className="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    vh-100
                                    flex-column
                                    "
                                >
                                <i className="icofont-support-faq display-1 text-warning"></i>
                                <h4 className="my-4 text-white">Easy Returns</h4>
                                <p className="text-center text-white-50 mb-5 px-4">
                                    Not satisfied with a product? Return
                                    <br />
                                    it at the doorstep{" & "}get a refund within hours.
                                </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {props.auth_component}
                </div>
            </div>
        </section>
    );
    }

export default Splash;
