// import React from 'react';
import defaultimg1 from "../../libs/images/brands/1.png";
import defaultimg2 from "../../libs/images/brands/2.png";
import OwlCarousel from "react-owl-carousel";
import { useEffect, useState } from "react";
import { fetch_press_release } from "../server/api";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const options1 = {
  nav: false,
  dots: false,

  margin: 30,
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
    1200: {
      items: 6,
    },
  },
};

const PressreleaseItem = (props) => {
  return (
    <div
      className="owl-item "
      style={{ width: "169.667px", marginRight: "30px" }}
    >
      <div className="brand">
        <img src={props.imageUrl} alt="Brand Name" />
      </div>
    </div>
  );
};

const dataOwlOption = {
  nav: false,
  dots: false,
  items: 5,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 1,
    },
    360: {
      items: 2,
    },
    600: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
};

const Pressrelease = (props) => {
  const [pressrelease, setPressRelease] = useState(null);

  const load_data = () => {
    fetch_press_release().then(
      (rs) => rs && rs.status && setPressRelease(rs.data)
    );
  };

  useEffect(() => {
    load_data();
  }, []);

  if (!pressrelease) {
    return <></>;
  } else {
    return (
      <div className="container">
        <div className="mt-2 mb-3"> </div>
        <h2 className="title text-center story">Press Releases</h2>
        <div
          className="owl-carousel owl-simple owl-loaded owl-drag"
          {...dataOwlOption}
          dataToggle="owl"
        >
          <OwlCarousel
            className="owl-carousel mt-3 mb-3 owl-simple owl-loaded owl-drag"
            {...options1}
          >
            <div class="owl-stage-outer">
              <div class="owl-stage">
                {pressrelease &&
                  pressrelease.map((td) => {
                    return <PressreleaseItem {...td} />;
                  })}
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
};

export default Pressrelease;
