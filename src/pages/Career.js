import { useEffect, useState } from "react";
import {
  add_career_data,
  get_jobs,
  showAlertMessage,
} from "../components/server/api";
import Infomsg from "../components/app/Infomsg";
import moment from "moment";

const Career = (props) => {
  const { user_login } = props;
  const [openings, setOpenings] = useState([]);

  const emptyobj = {
    user_id: props.user_login ? props.user_login.id : 0,
    name: user_login ? user_login.name : "",
    phone: user_login ? user_login.phone : "",
    email: user_login ? user_login.email : "",
    subject: "",
    message: "",
  };
  const [formdata, setFormdata] = useState(emptyobj);
  const [errormessage, setErrormessage] = useState("");

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, message } = formdata;
    if (name === "") {
      setErrormessage("Name should not be empty!");
    } else if (phone === "") {
      setErrormessage("Phone number should not be empty!");
    } else {
      add_career_data(formdata)
        .then((rs) => {
          if (rs.status) {
            setFormdata(emptyobj);
            showAlertMessage("Success", "Send Successfully", true, false);
          } else {
            showAlertMessage(
              "Oops",
              "Something went wrong! Please try after some time!",
              false,
              true
            );
          }
        })
        .catch((err) =>
          showAlertMessage(
            "Oops",
            "Something went wrong! Please try after some time!",
            false,
            true
          )
        );
    }
  };

  const get_opening_data = () => {
    get_jobs({}).then((rs) => rs && rs.status && setOpenings(""));
  };

  useEffect(() => {
    get_opening_data();
  }, []);

  return (
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="mt-3 mb-5 mt-md-1"> </div>
          <div class="touch-container row">
            {openings && openings.length && (
              <div class="col-md-12 col-lg-12">
                <h2 class="title mb-1">Current Openings</h2>
                {/* <p class="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                <div class="row">
                  <div class="col-md-6">
                    <div class="hot-jobs-list">
                      {openings.map((dt) => {
                        return (
                          <div class="row justify-content-center">
                            <div class="col-lg-7">
                              <div class="hot-jobs-content">
                                <h3>
                                  <a href="#">{dt.title}</a>
                                </h3>
                                <span class="sub-title">Professional</span>
                                <ul>
                                  <li>
                                    <span>Location:</span> {dt.location}
                                  </li>
                                  <li>
                                    <span>Vacancy:</span> {dt.vacancy}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="col-lg-5">
                              <div class="hot-jobs-btn">
                                <p>
                                  <span class="dead">Deadline: </span>
                                  {moment(dt.end_date).format("MMM DD, YYYY")}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div class="col-lg-8 offset-md-2 mt-md-3">
              <div class="text-center">
                <h2 class="title mb-1">Career With Us</h2>
                <p class="lead text-primary">
                  Share your resume on info@katlego.in
                </p>
              </div>

              <form onSubmit={handleSubmit} class="contact-form mb-3">
                {<Infomsg type="danger" message={errormessage}></Infomsg>}
                <div class="row">
                  <div class="col-sm-6">
                    <label for="cname" class="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={handleChange}
                      defaultValue={formdata.name}
                      name="name"
                      id="cname"
                      placeholder="Name *"
                      required
                    />
                  </div>

                  <div class="col-sm-6">
                    <label for="cemail" class="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="cemail"
                      onChange={handleChange}
                      defaultValue={formdata.email}
                      name="email"
                      placeholder="Email *"
                      required
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <label for="cphone" class="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      class="form-control"
                      onChange={handleChange}
                      name="phone"
                      defaultValue={formdata.phone}
                      id="cphone"
                      placeholder="Phone"
                    />
                  </div>

                  <div class="col-sm-6">
                    <label for="csubject" class="sr-only">
                      Subject
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={handleChange}
                      name="subject"
                      defaultValue={formdata.subject}
                      id="csubject"
                      placeholder="Subject"
                    />
                  </div>
                </div>

                <label for="cmessage" class="sr-only">
                  Message
                </label>
                <textarea
                  class="form-control"
                  cols="30"
                  name="message"
                  onChange={handleChange}
                  rows="4"
                  id="cmessage"
                  required
                  placeholder="Message *"
                ></textarea>

                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-outline-primary-2 btn-minwidth-sm"
                  >
                    <span>SUBMIT</span>
                    <i class="icon-long-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Career;
