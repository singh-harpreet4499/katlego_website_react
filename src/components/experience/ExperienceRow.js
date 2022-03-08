import { useSelector } from 'react-redux';
import defaultImage from '../../libs/images/years.png'
import ReactHtmlParser from "react-html-parser";

const ExperienceRow = (props) => {
    const settings = useSelector(state => state.global.settings);

    console.log("Experience", settings);

    if (settings && settings.qualitycheck_content_json) {
        return (
            <section className="home">
                <div className="section-reviews">
                    <div className="container">
                        <div className="reviews-wrapper">

                            <div className="col-md-4">
                                <div className="content-wrapper">

                                    <img src={defaultImage} alt="" />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="review-breakdown-holder">

                                    {
                                        settings.qualitycheck_content_json.map(dt => {
                                            if(dt.imagecolumn != 1){
                                                return (
                                                    <div className="rate-list">
                                                        <div className="rate-item">
                                                            <p className="t t-rate-number">{dt.count}+</p>
                                                            &nbsp;
                                                            <p className="t t-rate-desc">
                                                                {dt.title ? ReactHtmlParser(dt.title.split(' ').join('<br/>')) : ''}
                                                                {/* <br />
                                                Checks */}
                                                            </p>
                                                        </div>
                                                    </div>
    
                                                )
                                            }
                                          
                                        })
                                    }

                                    {/* <div className="rate-list">
                                        <div className="rate-item">
                                            <p className="t t-rate-number">150+</p>
                                            &nbsp;
                                            <p className="t t-rate-desc">
                                            Quality
                                            <br />
                                            Checks
                                            </p>
                                        </div>
                                    </div>
        
                                    <div className="rate-list">
                                        <div className="rate-item">
                                            <p className="t t-rate-number">150+</p>
        
                                            <p className="t t-rate-desc">
                                            Quality
                                            <br />
                                            Checks
                                            </p>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section className="home">
                <div className="section-reviews">
                    <div className="container">
                        <div className="reviews-wrapper">
                            <div className="col-md-4">
                                <div className="content-wrapper">

                                    <img src={defaultImage} alt="" />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="review-breakdown-holder">
                                    <div className="rate-list">
                                        <div className="rate-item">
                                            <p className="t t-rate-number">150+</p>
                                            &nbsp;
                                            <p className="t t-rate-desc">
                                                Quality
                                                <br />
                                                Checks
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rate-list">
                                        <div className="rate-item">
                                            <p className="t t-rate-number">150+</p>
                                            &nbsp;
                                            <p className="t t-rate-desc">
                                                Quality
                                                <br />
                                                Checks
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rate-list">
                                        <div className="rate-item">
                                            <p className="t t-rate-number">150+</p>

                                            <p className="t t-rate-desc">
                                                Quality
                                                <br />
                                                Checks
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }


}
export default ExperienceRow;