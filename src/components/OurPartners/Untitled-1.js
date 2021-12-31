import "./OurPartner.css";
import OwlCarousel from "react-owl-carousel";
import { useEffect, useState } from "react";
import { fetch_partners } from "../server/api";

const dataPartner = {
  nav: false,
  autoplay: true,
  autoplayTimeout: 1000,
  dots: false,
  loop: true,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1024: {
      items: 5,
    },
  },
};

const OurPartnerItem = (props) => {
  return (
   
       <></>
      
  );
};

const OurPartner = (props) => {

  const [partners,setPartner] = useState([]);
  const [updatedd,setUpdatedd] = useState(0)

  const get_data = () => {
    // console.log('get_data');
    fetch_partners({})
    .then(rs=> {

      return rs && rs.status && setPartner(rs.data)}) && setUpdatedd(1)
  }
  useEffect(() => {
    get_data()
  }, [updatedd])
  const partner_item = <OurPartnerItem partners={partners}  />
  return !partners.length ? <></> :(
    <div className="container">
      <div className="mt-2 mb-3"></div>
      <h2 className="title text-center story">Our Partners</h2>

      <OwlCarousel
        className="owl-carousel mt-3 mb-3 owl-simple owl-loaded owl-drag"
        dataToggle="owl"
        {...dataPartner}
      >
         <div className="owl-stage-outer">
      <div className="owl-stage owl-stage-partner">
        {/* {partner_item} */}
        {
          partners.map((dt)=>{
            return (
              <div
                className="owl-item active bra cloned"
                style={{ width: "169.667px", widthRight: "30px" }}
              >
                <a className="brand">
                  <img src={dt.imageUrl} />
                </a>
              </div>
            )
          })
        }
        </div>
        </div>

        <div className="owl-nav disabled">
          <button className="owl-prev" type="button">
            <i className="icon-angle-left"></i>
          </button>
          <button className="owl-next" type="button">
            <i className="icon-angle-right"></i>
          </button>
        </div>
        <div className="owl-dots disabled"></div>
        <div className="owl-nav disabled">
          <button className="owl-prev" type="button">
            <i className="icon-angle-left"></i>
          </button>
          <button className="owl-next" type="button">
            <i className="icon-angle-right"></i>
          </button>
        </div>
        <div className="owl-dots disabled"></div>
      </OwlCarousel>
    </div>
  );
};
export default OurPartner;
