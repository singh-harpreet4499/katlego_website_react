import { Link } from "react-router-dom";
import image1 from "../libs/images/page-header-bg.jpg";
import image2 from "../libs/images/video/bg-2.jpg";
import image3 from "../libs/images/video/poster-2.jpg";
import image4 from "../libs/images/about/about-2/signature.png";
import image5 from "../libs/gif/about-us.gif";
import abtimg from "../libs/images/video/bg-2.jpg"
import abtimg2 from "../libs/images/video/poster-2.jpg"
import { get_settings } from "../components/server/api";
import { useState } from "react";
import { useEffect } from "react";
// const parse = require('html-react-parser');
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Testimonial from "../components/app/Testimonial";
import FooterSupport from "../components/footer/FooterSupport";

const AboutPage = (props) => {
  const [content, setContent] = useState("");
  const [our_vision,setOurVision] = useState("")
  const [our_mission,setOurMission] = useState("")
  const [who_we_are,setWho] = useState("")
  const [about_top,setAboutTop] = useState("")
  const settings = useSelector((state) => state.global.settings);

  const get_data = async () => {
    // await get_settings({}).then((rs)=>{
    //     if(rs.status){
    //         setContent(rs.data.about_us)
    //     }
    // })
    setContent(settings.about_us);
    setOurVision(settings.our_vision);
    setOurMission(settings.our_mission);
    setWho(settings.who_we_are);
    setAboutTop(settings.about_top);
  };

  useEffect(() => {
    get_data();
  }, [settings]);

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: `url(${image1})`,
        }}
      >
        <div className="container">
          <h1 className="page-title">About us</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About us
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-0">
        <div className="container">
          {/* <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="about-text text-center mt-3">
                                <div className="pb-3">
                                    {parse(content)}
                                </div>
                                <img src={image4} alt="signature" className="mx-auto mb-5" />
                            </div>
                        </div>
                    </div> */}

          {/* <div className="video-banner bg-image text-center pt-8 pb-8" style={{
                            backgroundImage:`url(${image2})`
                        }} >
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                                    <div className="video-poster">
                                        <img src={image3} alt="poster" />
                                        <div className="video-poster-content">
                                            <h3 className="h4 video-poster-title">Our Journey</h3>
                                            <a href="https://www.youtube.com/watch?v=vBPgmASQ1A0" className="btn-video btn-iframe"><i className="icon-play"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5"></div>
                    <div className="row">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <h2 className="title">Our Vision</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. </p>
                        </div>
                        <div className="col-lg-6">
                            <h2 className="title">Our Mission</h2>
                            <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. <br />Praesent elementum hendrerit tortor. Sed semper lorem at felis. </p>
                        </div>
                    </div> */}
          {/* <div className="mb-5"></div> */}
        </div>
        {/* <div
          className="bg-light-2 pt-6 pb-5"
          style={{
            backgroundPosition: "center bottom",
            backgroundRepeat: "repeat-x;",
          }}
        ></div> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-3 mb-lg-0">
              <div className="text-center pb-3">
                {parse(about_top)}
                {/* <p className="lead text-primary mb-3">Pellentesque odio nisi, euismod pharetra a ultricies <br />in diam. Sed arcu. Cras consequat</p>
                                <p className="mb-2">Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue. </p> */}
                {/* <img
                  style={{ marginTop: "40px" }}
                  src="http://139.59.67.166/katlego_website/assets/images/about/about-2/signature.png"
                /> */}
              </div>
            </div>

           
          </div>

          {/* assets/images/video/bg-2.jpg */}

          <div class="video-banner bg-image text-center pt-8 pb-8" style={{backgroundImage:`url(${abtimg})`}}>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                                <div class="video-poster">
                                    <img src={abtimg2} alt="poster" />

                                    <div class="video-poster-content">
                                        <h3 class="h4 video-poster-title">Our Journey</h3>
                                        <a href={settings.about_us_video} class="btn-video btn-iframe"><i class="icon-play"></i></a>
                                    </div>   
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




        </div>

        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-10">
              <h2 className="title">Our Vision</h2>
              {parse(our_vision)}
            </div>
            <div className="col-lg-6">
              <h2 className="title">Our Mission</h2>
             {parse(our_mission)}
            </div>
          </div>
        </div>

        <div className="bg-light-2 pt-6 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">Who We Are</h2>
               {parse(who_we_are)}
                <a href="https://www.instagram.com/katlego_foods/" className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-2">
                  VIEW OUR NEWS <i className="icon-long-arrow-right"></i>
                </a >
              </div>

              <div className="col-lg-5 offset-lg-1">
                <div className="about-images">
                  <img
                    src={image5}
                    alt=""
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
            <Testimonial />
            <FooterSupport />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
