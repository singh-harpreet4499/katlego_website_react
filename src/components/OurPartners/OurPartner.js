import "./OurPartner.css";
import OwlCarousel from "react-owl-carousel";

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
    <div className="owl-stage-outer">
      <div className="owl-stage owl-stage-partner">
        <div
          className="owl-item active bra cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img4.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img5.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img6.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img7.png" />
          </a>
        </div>
        <div
          className="owl-item bra active"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img1.png" />
          </a>
        </div>
        <div
          className="owl-item bra active"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img2.png" />
          </a>
        </div>
        <div
          className="owl-item bra ctive"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img3.png" />
          </a>
        </div>
        <div
          className="owl-item bra active"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img4.png" />
          </a>
        </div>
        <div
          className="owl-item bra active"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img5.png" />
          </a>
        </div>
        <div
          className="owl-item bra active"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img6.png" />
          </a>
        </div>
        <div
          className="owl-item bra active"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img7.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img1.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img2.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img3.png" />
          </a>
        </div>
        <div
          className="owl-item bra active cloned"
          style={{ width: "169.667px", widthRight: "30px" }}
        >
          <a className="brand">
            <img src="http://139.59.67.166/katlego_website/assets/images/brands/img4.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

const OurPartner = (props) => {
  return (
    <div className="container">
      <div className="mt-2 mb-3"></div>
      <h2 className="title text-center story">Our Partners</h2>

      <OwlCarousel
        className="owl-carousel mt-3 mb-3 owl-simple owl-loaded owl-drag"
        dataToggle="Owl"
        {...dataPartner}
      >
        <OurPartnerItem />

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
