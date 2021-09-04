import { Link } from 'react-router-dom';
import logoImage from '../../libs/images/demos/demo-2/logo.png'
import paymentImage from '../../libs/images/payments.png';
function Footer(props) {
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
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>

              <div className="widget-about-info">
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <span className="widget-about-title">
                      Got Question? Call us 24/7
                    </span>
                    <a href="tel:123456789">+011 8765432</a>
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
                  <Link to={{
                    pathname:'/about-us'
                  }}>About Katlego</Link>
                </li>
                <li>
                  <Link to={{
                    pathname:'/my_account'
                  }}>My Account</Link>
                </li>
                {/* <li>
                  <a href="faq.html">FAQ</a>
                </li> */}
                <li>
                  <a href="/">Contact us</a>
                </li>
                <li>
                  <Link to={{
                    pathname:'/login'
                  }}>Sign in</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">Customer Service</h4>

              <ul className="widget-list">
                <li>
                  <Link to={{
                    pathname:'/payment-methods'
                  }}>Payment Methods</Link>
                </li>
                {/* <li>
                  <a href="/">Money-back guarantee!</a>
                </li> */}
                <li>
                  <Link to={{
                    pathname:'/terms-and-conditions'
                  }}>Terms and conditions</Link>
                </li>
                <li>
                  <Link to={{
                    pathname:'privacy-policy'
                  }}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={{
                    pathname:'shipping-policy'
                  }}>Shipping Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">My Account</h4>

              <ul className="widget-list">
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
                <li>
                  <Link to={{
                    pathname:'/checkout'

                  }}>View Cart</Link>
                </li>
                <li>
                  <a href="/">My Wishlist</a>
                </li>
                {/* <li>
                  <a href="/">Track My Order</a>
                </li> */}
                <li>
                  <a href="/">Help</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Footer;