
const DeliveryConfig = (props) => {

    return (

        <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
            <div className="card-header bg-white border-0 p-0" id="headingthree">
                <h2 className="mb-0">
                    <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">
                    <span className="c-number">3</span> Delivery Type
                    </button>
                </h2>
            </div>

            <div id="collapsethree" className="collapse show" aria-labelledby="headingthree" data-parent="#accordionExample">
                <ul className="nav nav-tabs" id="tabs-2" role="tablist">
                    <li className="nav-item deliver">
                        <a className="nav-link active" id="tab-5-tab" data-toggle="tab" href="#tab-5" role="tab" aria-controls="tab-5" aria-selected="true">Delivery Now</a> 
                    </li>
                    <li className="nav-item deliver">
                        <a className="nav-link" id="tab-6-tab" data-toggle="tab" href="#tab-6" role="tab" aria-controls="tab-6" aria-selected="false">Delivery Today</a>
                    </li>
                    <li className="nav-item deliver">
                        <a className="nav-link" id="tab-7-tab" data-toggle="tab" href="#tab-7" role="tab" aria-controls="tab-7" aria-selected="false">Schedule Delivery</a>
                    </li>
                </ul>

                <div className="tab-content tab-content" id="tab-content-2">
                    <div className="tab-pane fade show active" id="tab-5" role="tabpanel" aria-labelledby="tab-5-tab">
                        <div className="text-center mb-2 py-2">
                            <p className="display-2"><i className="icofont-clock-time tim"></i></p>
                            <p className="your-order">Your Order:</p>
                            <h6 className="font-weight-bold text-dark">Your order will be deliver in 120 mins</h6>
                        </div>
                        <div className="p-3">
                            <a href="#" className="btn btn-success btn-lg btn-block sche" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">Proceed to Payment</a>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="tab-6" role="tabpanel" aria-labelledby="tab-6-tab">
                        <div className="text-center mb-2 py-2">
                            <p className="display-2"><i className="icofont-clock-time tim"></i></p>
                            <p className="your-order">Your Order:</p>
                            <h6 className="font-weight-bold text-dark">Your order will be deliver in Today</h6>
                        </div>
                        <div className="p-3">
                            <a href="#" className="btn btn-success btn-lg btn-block sche" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">Proceed to Payment</a>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="tab-7" role="tabpanel" aria-labelledby="tab-7-tab">
                        <div className="card-body p-0">
                            <div className="osahan-order_address">
                                <div className="text-center mb-2 py-2">
                                    <p className="display-2"><i className="icofont-ui-calendar text-success"></i></p>
                                    <p className="mb-1">Your Current Slot:</p>
                                </div>
                                <div className="schedule">
                                    <ul className="nav nav-tabs justify-content-center nav-fill" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active text-dark" id="mon-tab" data-toggle="tab" href="#mon" role="tab" aria-controls="mon" aria-selected="true">
                                                <p className="mb-0 font-weight-bold">SUN</p>
                                                <p className="mb-0">6 Sep</p>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content filter bg-white" id="myTabContent">
                                        <div className="tab-pane fade show active" id="mon" role="tabpanel" aria-labelledby="mon-tab">
                                            <div className="custom-control border-bottom px-0 custom-radio">
                                                <input className="custom-control-input" type="radio" name="exampleRadios" id="mon1" value="mon1" checked />
                                                <label className="custom-control-label py-3 w-100 px-3" for="mon1">
                                                    <i className="icofont-clock-time mr-2"></i> 6AM - 10AM
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DeliveryConfig;