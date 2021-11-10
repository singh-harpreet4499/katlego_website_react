import defaultImage from '../../libs/images/years.png'

const ExperienceRow = () => (
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
);

export default ExperienceRow;