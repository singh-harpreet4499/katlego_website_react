
import image1 from '../../libs/images/demos/demo-2/deal/product-1.jpg'
import image2 from '../../libs/images/demos/demo-2/banners/banner-5.jpg'
function Dealday(){
    return (
        <div className="bg-light deal-container pt-5 pb-3 mb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="deal">
                <div className="deal-content">
                  <h4>Limited Quantities</h4>
                  <h2>Deal of the Day</h2>

                  <h3 className="product-title"><a href="/">Harness</a></h3>

                  <div className="product-price">
                    <span className="new-price">₹149.00</span>
                    <span className="old-price">Was ₹240.00</span>
                  </div>

                  <div className="deal-countdown is-countdown" data-until="+10h">
                    <span className="countdown-row countdown-show3"
                      ><span className="countdown-section"
                        ><span className="countdown-amount">06</span
                        ><span className="countdown-period">hrs</span></span
                      ><span className="countdown-section"
                        ><span className="countdown-amount">14</span
                        ><span className="countdown-period">mins</span></span
                      ><span className="countdown-section"
                        ><span className="countdown-amount">10</span
                        ><span className="countdown-period">secs</span></span
                      ></span
                    >
                  </div>
                  <a href="/" className="btn btn-primary">
                    <span>Buy Now</span><i className="icon-long-arrow-right"></i>
                  </a>
                </div>
                <div className="">
                  <div className="banner banner-large banner-overlay">
                    <a href="/">
                      <img
                        src={image1}
                        alt="Banner"
                      />
                    </a>

                    <div className="banner-content banner-content-top tand">
                      <h4 className="banner-subtitle">Best Chicken</h4>
                      <h3 className="banner-title">Chicken Tandoori Kebab</h3>
                      <div className="banner-text">from ₹399.99</div>
                      <a href="/" className="btn btn-outline-gray banner-link"
                        >Buy Now<i className="icon-long-arrow-right"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div
                className="
                  banner banner-overlay banner-overlay-light
                  text-center
                  d-none d-lg-block
                "
              >
                <a href="/">
                  <img
                    src={image2}
                    alt="Banner"
                  />
                </a>

                <div
                  className="
                    banner-content banner-content-top banner-content-center
                  "
                >
                  <h4 className="banner-subtitle">The Best Choice</h4>
                  <h3 className="banner-title">Chicken Kebab</h3>
                  <div className="banner-text text-primary">₹399.99</div>
                  <a href="/" className="btn btn-outline-gray banner-link"
                    >Buy Now<i className="icon-long-arrow-right"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}


export default Dealday;