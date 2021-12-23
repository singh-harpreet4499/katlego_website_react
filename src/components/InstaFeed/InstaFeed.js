import "./InstaFeed.css";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { get_insta_feeds } from "../server/api";

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

const InstaItem = (props) => {
  return (
    <div
      className="owl-item active"
      style={{ width: "262.667px", marginRight: "20px" }}
    >
      <div className="instagram-feed">
        <img src={props.imageUrl} />
        <div className="instagram-feed-content">
          <a target="_blank" href={props.hyperlink}>
            <i className="icon-heart-o"></i>
            {props.id}
          </a>
          <a target="_blank" href={props.hyperlink}>
            <p className="lor">{props.title}</p>
          </a>
        </div>
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

const InstaFeed = (props) => {
  const [instadata, setInstaData] = useState(null);

  const load_data = () => {
    get_insta_feeds().then((rs) => rs && rs.status && setInstaData(rs.data));
  };

  useEffect(() => {
    load_data();
  }, []);
  if (!instadata) {
    return <></>;
  } else {
    return (
      <div>
        <div className="mb-3"></div>
        <div className="bg-lighter instagram pt-5 pb-5">
          <div className="container">
            <h2 className="title text-center mb-3 mb-md-2 story">Insta Feed</h2>

            <div
              className="owl-carousel owl-simple owl-loaded owl-drag"
              {...dataOwlOption}
              dataToggle="owl"
            >
              <OwlCarousel
                className="owl-carousel mt-3 mb-3 owl-simple owl-loaded owl-drag"
                {...options1}
              >
                <div className="owl-stage-outer">
                  <div className="owl-stage owl-stage-style">
                    {instadata &&
                      instadata.map((dt) => {
                        return <InstaItem {...dt} />;
                      })}
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default InstaFeed;
