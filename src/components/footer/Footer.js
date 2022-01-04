import { Link } from "react-router-dom";
import logoImage from "../../libs/images/demos/demo-2/logo.png";
import paymentImage from "../../libs/images/payments.png";
import appstore from "../../libs/images/appstore.png";
import playstore from "../../libs/images/playmarket.png";
import { useSelector } from "react-redux";
import moment from "moment";
const Footer =(props) => {
  const user = useSelector((state) => state.user.currentUser);
  const settings = useSelector(state=>state.global.settings);
  
  
  const { app_data } = props;
  return (
    <div className="footer-middle">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="widget widget-about">
              <img
                src={logoImage}
                className="footer-logo"
                alt="Footer Logo"
                width="115"
                height="15"
              />
              <p>{settings ? settings.footer_tagline : 'We know your chicken like no one does!'} </p>

              <div className="widget-about-info">
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <span className="widget-about-title">
                      Got Question? Call us 24/7
                    </span>
                    <a href="tel:123456789">
                      {app_data ? app_data.support_phone : ""}
                    </a>
                  </div>
                  <div className="col-sm-6 col-md-8">
                    <span className="widget-about-title">Payment Method</span>
                    <figure className="footer-payments">
                      <img
                        src={paymentImage}
                        alt="Payment methods"
                        width="272"
                        height="20"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">Information</h4>

              <ul className="widget-list">
                <li>
                  <Link
                    to={{
                      pathname: "/about-us",
                    }}
                  >
                    About Katlego
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/my_account",
                    }}
                  >
                    My Account
                  </Link>
                </li>
                {/* <li>
                  <a href="faq.html">FAQ</a>
                </li> */}
                <li>
                  <Link
                    to={{
                      pathname: "/general-enquiry",
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/blogs",
                    }}
                  >
                    Blog
                  </Link>
                </li>

                {/* {
                  !user ? 
                  <li>
                  <Link to={{
                    pathname:'/login'
                  }}>Sign in</Link>
                </li>
                :""
                } */}
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">Customer Service</h4>

              <ul className="widget-list">
                <li>
                  <Link
                    to={{
                      pathname: "/payment-methods",
                    }}
                  >
                    Payment Methods
                  </Link>
                </li>
                {/* <li>
                  <a href="/">Money-back guarantee!</a>
                </li> */}
                <li>
                  <Link
                    to={{
                      pathname: "/terms-and-conditions",
                    }}
                  >
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "privacy-policy",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "shipping-policy",
                    }}
                  >
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">My Account</h4>

              <ul className="widget-list">
                {!user ? (
                  <li>
                    <Link to="/login">Sign In</Link>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <Link
                    to={{
                      pathname: "/checkout",
                    }}
                  >
                    View Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist">My Wishlist</Link>
                </li>
                {/* <li>
                  <a href="/">Track My Order</a>
                </li> */}
                <li>
                  <Link
                    to={{
                      pathname: "/general-enquiry",
                    }}
                  >
                    Help
                  </Link>
                  {/* <a href="/">Help</a> */}
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-3 col-md-3">
            <div class="download">
              <span class="down-app">Download App</span>
              <a href="https://play.google.com/store">
                <img src={appstore} alt="ios" />
              </a>
              <a href="https://play.google.com/store">
                <img src={playstore} alt="android" />
              </a>
            </div>
          </div>

          <div class="col-sm-9 col-md-9">
            <div class="social-icons social-icons-color">
              <span class="social-label">Social Media</span>
              <a
                href="https://www.facebook.com/katlegofoodsindia"
                class="social-icon social-facebook"
                title="Facebook"
                target="_blank"
              >
                <i class="icon-facebook-f"></i>
              </a>
              {/* <a href="#" class="social-icon social-twitter" title="Twitter" target="_blank"><i class="icon-twitter"></i></a> */}
              <a
                href="https://www.instagram.com/katlego_foods/"
                class="social-icon social-instagram"
                title="Instagram"
                target="_blank"
              >
                <i class="icon-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/watch?v=W0UYKgfQi9k"
                class="social-icon social-youtube"
                title="Youtube"
                target="_blank"
              >
                <i class="icon-youtube"></i>
              </a>
              {/* <a href="#" class="social-icon social-pinterest" title="Pinterest" target="_blank"><i class="icon-pinterest"></i></a> */}
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="container">
            <p class="footer-copyright">
              Copyright © {moment().format("YYYY")} Katlego. All Rights
              Reserved.
            </p>
            <ul class="footer-menu">
              <li>
                <Link
                  to={{
                    pathname: "/terms-and-conditions",
                  }}
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "privacy-policy",
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
