import { useState } from "react";
import newsletterimage from "../../libs/images/backgrounds/bg-2.jpg";
import { add_subscribes, showAlertMessage } from "../server/api";

function Newsletter(props) {
  const [formData, updateFormData] = useState({
    email:""
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;
    if (email === "") {
      showAlertMessage("Error!","Please add email to subscribe",false,true);
    }  else {
      add_subscribes({
        email:email
      })
      .then((rs)=>{
        if(rs.status){
          showAlertMessage('Success',rs.messgae,true,false)
        }else{
          showAlertMessage('Error',rs.messgae,false,true)

        }
      })
    
    }
  };
  return (
    <div
      className="footer-newsletter bg-image"
      style={{ backgroundImage: "url(" + newsletterimage + ")" }}
    >
      <div className="container">
        <div className="heading text-center">
          <h3 className="title">Get The Latest Deals</h3>
          <p className="title-desc">
            and receive <span>₹20 coupon</span> for first shopping
          </p>
        </div>

        <div className="row">
          <div
            className="
                col-sm-10
                offset-sm-1
                col-md-8
                offset-md-2
                col-lg-6
                offset-lg-3
              "
          >
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                 onChange={handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your Email Address"
                  aria-label="Email Adress"
                  aria-describedby="newsletter-btn"
                  required
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary "
                    type="submit"
                    id="newsletter-btn"
                  >
                    <span>Subscribe</span>
                    <i className="icon-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
