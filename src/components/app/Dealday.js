import image1 from "../../libs/images/demos/demo-2/deal/product-1.jpg";
import image2 from "../../libs/images/demos/demo-2/banners/banner-5.jpg";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
function Dealday(props) {
  const { deal_of_the_day } = props;

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  const [enddate, setEnddate] = useState(Date.now());

  let interval = useRef();

  function startTimer() {
    const countdownDate = new Date(enddate).getTime();

    const timer = interval.current;
    // return () => {
    clearInterval(timer);
    // };

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }

  // var tim = 0
  // const [timer,setTimer] = useState({
  //   seconds:0,
  //   hours:0,
  //   mins:0
  // });
  useEffect(() => {
    if (deal_of_the_day.length) {
      setEnddate(deal_of_the_day[0].end_date);
      startTimer();

      // setTimer({
      // seconds :deal_of_the_day[0].diff_mins,
      // hours :deal_of_the_day[0].diff_hours,
      // mins :deal_of_the_day[0].diff_mins,

      // })
    }
    startTimer();
  }, [props, enddate]);

  if (!deal_of_the_day.length) {
    return <></>;
  } else {
    const first_product = deal_of_the_day[0];
    const second_product =
      deal_of_the_day.length >= 2 ? deal_of_the_day[1] : first_product;
    const third_product =
      deal_of_the_day.length >= 3 ? deal_of_the_day[2] : first_product;
    return (
      <div className="bg-light deal-container pt-5 pb-3 mb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="deal">
                <div className="deal-content">
                  <h4>Limited Quantities</h4>
                  <h2>Deal of the Day</h2>

                  <h3 className="product-title">
                    <a href="/">{first_product.name}</a>
                  </h3>

                  <div className="product-price">
                    {parseFloat(first_product.mrp) >
                    parseFloat(first_product.selling_price) ? (
                      <>
                        <span className="new-price">
                          ₹{first_product.selling_price}
                        </span>
                        <span className="old-price">
                          Was ₹{first_product.mrp}
                        </span>
                      </>
                    ) : (
                      <span className="new-price">
                        ₹{first_product.selling_price}
                      </span>
                    )}
                  </div>

                  <div
                    className="deal-countdown is-countdown"
                    data-until="+10h"
                  >
                    {/* <span className="countdown-row countdown-show3"><span className="countdown-section"><span className="countdown-amount">{timerDays}</span><span className="countdown-period">days</span></span> */}
                    <span className="countdown-row">
                      {timerDays != 0 ? (
                        <span className="countdown-section">
                          <span className="countdown-amount">{timerDays}</span>
                          <span className="countdown-period">
                            {timerDays == 1 ? "day" : "days"}
                          </span>
                        </span>
                      ) : (
                        ""
                      )}
                      <span className="countdown-section">
                        <span className="countdown-amount">{timerHours}</span>
                        <span className="countdown-period">hrs</span>
                      </span>
                      <span className="countdown-section">
                        <span className="countdown-amount">{timerMinutes}</span>
                        <span className="countdown-period">mins</span>
                      </span>
                      <span className="countdown-section">
                        <span className="countdown-amount">{timerSeconds}</span>
                        <span className="countdown-period">secs</span>
                      </span>
                    </span>
                  </div>
                  <Link
                    to={{
                      pathname:
                        "/product-details/" +
                        first_product.hifen_name.toLowerCase() +
                        "/" +
                        first_product.id,
                    }}
                    className="btn btn-primary"
                  >
                    <span>Buy Now</span>
                    <i className="icon-long-arrow-right"></i>
                  </Link>
                </div>
                <div className="">
                  <div className="banner banner-large banner-overlay">
                    <Link
                      to={{
                        pathname:
                          "/product-details/" +
                          second_product.hifen_name.toLowerCase() +
                          "/" +
                          second_product.id,
                      }}
                    >
                      <img src={image1} alt="Banner" />
                    </Link>

                    <div className="banner-content banner-content-top tand">
                      <h4 className="banner-subtitle">Best Chicken</h4>
                      <h3 className="banner-title">{second_product.name}</h3>
                      <div className="banner-text">
                        from ₹{second_product.selling_price}
                      </div>
                      <Link
                        to={{
                          pathname:
                            "/product-details/" +
                            second_product.hifen_name.toLowerCase() +
                            "/" +
                            second_product.id,
                        }}
                        className="btn btn-outline-gray banner-link"
                      >
                        Buy Now<i className="icon-long-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="banner banner-overlay banner-overlay-light text-center d-none d-lg-block">
                <Link
                  to={{
                    pathname:
                      "/product-details/" +
                      third_product.hifen_name.toLowerCase() +
                      "/" +
                      third_product.id,
                  }}
                >
                  <img src={image2} alt="Banner" />
                </Link>

                <div className="banner-content banner-content-top banner-content-center">
                  <h4 className="banner-subtitle">The Best Choice</h4>
                  <h3 className="banner-title">{third_product.name}</h3>
                  <div className="banner-text text-primary">
                    ₹{third_product.selling_price}
                  </div>
                  <Link
                    to={{
                      pathname:
                        "/product-details/" +
                        third_product.hifen_name.toLowerCase() +
                        "/" +
                        third_product.id,
                    }}
                    className="btn btn-outline-gray banner-link"
                  >
                    Buy Now<i className="icon-long-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dealday;
