import chickenImage from '../../libs/images/chicken.png'
import qualityImage from '../../libs/images/quality.png'
function FooterSupport(props) {
  return (
    <div>
      <div className="mb-4"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-6 col-4">
            <div className="icon-box icon-box-card box-car text-center">
              <span className="icon-box-icon">
                <i className="icon-truck"></i>
              </span>
              <div className="icon-box-content">
                <h3 className="icon-box-title free-ship">Free Shipping</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-4">
            <div className="icon-box icon-box-card box-car text-center">
              <span className="icon-box-icon chi">
                <img src={chickenImage} alt="" />
              </span>
              <div className="icon-box-content">
                <h3 className="icon-box-title free-ship">Halal</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-4">
            <div className="icon-box icon-box-card box-car text-center">
              <span className="icon-box-icon chi">
                <img src={qualityImage}  alt="" />
              </span>

              <div className="icon-box-content">
                <h3 className="icon-box-title free-ship">FSSC</h3>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="icon-boxes-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rocket"></i>
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Shipping</h3>
                  <p>orders ₹50 or more</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rotate-left"></i>
                </span>

                <div className="icon-box-content">
                  <h3 className="icon-box-title">Save Money</h3>
                  <p>At lowest Price</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-info-circle"></i>
                </span>

                <div className="icon-box-content">
                  <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                  <p>When you sign up</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-life-ring"></i>
                </span>

                <div className="icon-box-content">
                  <h3 className="icon-box-title">We Support</h3>
                  <p>24/7 amazing services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FooterSupport;