const Collabrate = (props) => {

    return (
        <main className="main">
            <div className="page-content pt-3">
                <div className="container">
                    <center>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="about-content">
                                    <ul>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Logistics
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Delivery
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Storage
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="about-content">
                                    <ul>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Bulk Purchase
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Horeca
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Government
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="about-content">
                                    <ul>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            C{'&'}F
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Distribute Ship
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Retailer
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="about-content">
                                    <ul>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Restaurant
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Booth
                                        </li>
                                        <li>
                                            <i className="fa fa-check"></i>
                                            Kiosk
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </center>

                    <div class="mt-3 mb-5 mt-md-1"> </div>

                    <div class="touch-container row justify-content-center">
                        <div class="col-md-9 col-lg-7">
                            <div class="text-center">
                                <h2 class="title mb-1">Collaborate With Us</h2>
                                <p class="lead text-primary">
                                    To Collaborate write us at sales info@katlego.in
                                </p>
                            </div>
                            <form action="#" class="contact-form mb-2">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label for="cname" class="sr-only">Name</label>
                                        <input type="text" class="form-control" id="cname" placeholder="Name *" required />
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cname" class="sr-only">Email</label>
                                        <input type="text" class="form-control" id="email" placeholder="Email *" required />
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">Mobile No.</label>
                                        <input type="tel" class="form-control" id="mobile" placeholder="Mobile No." />
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">City</label>
                                        <select name="state" id="state" class="form-control" required="">
                                            <option value="City">Select City</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Agar">Agar</option>
                                            <option value="Aligarh">Aligarh</option>
                                            <option value="Ambala">Ambala</option>
                                            <option value="Bhopal">Bhopal</option>
                                        </select>
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">State</label>
                                        <select name="state" id="state" class="form-control" required="">
                                            <option value="City">Select State</option>
                                            <option value="Delhi">New Delhi</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>

                                        </select>
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">Vehicle</label>
                                        <select name="state" id="state" class="form-control" required="">
                                            <option value="City">Collaboration Type</option>
                                            <option value="Delhi">Chef</option>
                                            <option value="Agar">Restaurant</option>

                                        </select>
                                    </div>
                                </div>


                                <label for="cmessage" class="sr-only">Message</label>
                                <textarea class="form-control" cols="30" rows="4" id="cmessage" required placeholder="Message *"></textarea>

                                <div class="text-center">
                                    <button type="submit" class="btn btn-outline-primary-2 btn-minwidth-sm">
                                        <span>SUBMIT</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )

}

export default Collabrate