import defaultImage from '../../libs/images/years.png'

const ExperienceRow = () => (
    <section className="home">
        <div className="section-reviews">
            <div className="container">
                <div className="reviews-wrapper">
                    <div className="col-md-3">
                        <div className="content-wrapper">

                            <img src={defaultImage} alt="" />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="review-breakdown-holder">
                            <div className="rate-list">
                                <div className="rate-item">
                                    <p className="t t-rate-number">80+</p>
                                    &nbsp;
                                    <p className="t t-rate-desc">
                                    meals to keep
                                    <br />
                                    things interesting
                                    </p>
                                </div>
                            </div>

                            <div className="rate-list">
                                <div className="rate-item">
                                    <p className="t t-rate-number">+2500</p>
                                    &nbsp;
                                    <p className="t t-rate-desc">
                                    suburbs that
                                    <br />
                                    we deliver to
                                    </p>
                                </div>
                            </div>

                            <div className="rate-list">
                                <div className="rate-item">
                                    <p className="t t-rate-number">+1.2 &nbsp; million</p>

                                    <p className="t t-rate-desc">
                                    meals sold
                                    <br />
                                    per month
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