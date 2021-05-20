const ExperienceRow = () => (
    <section className="home">
        <div className="section-reviews">
            <div className="container">
                <div className="reviews-wrapper">
                    <div className="content-wrapper">
                        <div className="review-title-holder">
                            <h4 className="t t-info">
                                #1 <span>Food Delivery Service</span> 4 Years in a India
                            </h4>
                        </div>

                        <div className="review-rate-holder">
                            <p className="best-rev">
                                Best Food in all <br />
                                Our India
                            </p>
                        </div>
                    </div>

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
    </section>
);

export default ExperienceRow;