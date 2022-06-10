import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Infomsg from "../app/Infomsg";
import { user_signup_otp } from "../server/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Signup = (props) => {
  let history = useHistory();

  const initialFormData = Object.freeze({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [errormessage, setErrormessage] = useState("");
  const [can_move, setCanmove] = useState(0);
  const [cursor_allow, setCursorAllow] = useState(1);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = (e) => {
    handlePasswordChange(e);
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const { name, phone, email, password, confirmpassword } = formData;
    if (name === "") {
      setCanmove(0);

      setErrormessage("Name should not be empty!");
    } else if (phone === "") {
      setCanmove(0);

      setErrormessage("Phone number should not be empty!");
    } else if (password === "" && confirmpassword === "") {
      setCanmove(0);

      setErrormessage("Please enter your password!");
    } else if (password !== confirmpassword) {
      setCanmove(0);

      setErrormessage("Password does not match with confirm password!");
    } else {
      setCanmove(1);
      setCursorAllow(0);

      const response = await user_signup_otp(formData);
      // console.log(response);
      if (response.status) {
        history.push("/otp", {
          phone: "9896449941",
          ...response.data,
        });
      } else {
        setCursorAllow(1);

        setErrormessage(response.message);
      }
    }
    // if(can_move){

    // }
  };

  const handlePhone = (e) => {
    e.preventDefault();
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, 10);
  };

  return (
    <div className="col-lg-6 pl-lg-5">
      <div className="osahan-signup shadow bg-white p-4 rounded">
        <div className="p-3">
          <h2 className="my-0">Let's get started</h2>
          <p className="small mb-4">
            Create account to see our top picks for you!
          </p>
          {<Infomsg type="danger" message={errormessage}></Infomsg>}
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName1">Name</label>
              <input
                placeholder="Enter Name"
                name="name"
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputNumber1">Phone Number</label>
              <input
                placeholder="Enter Phone Number"
                type="number"
                name="phone"
                className="form-control"
                onChange={handleChange}
                onInput={handlePhone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                placeholder="Enter Email"
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                placeholder="Enter Password"
                type={passwordType}
                name="password"
                className="form-control"
                onChange={handleChange}
              />
              <div className="input-group-btn ">
                <button
                  className="btn btn-outline-primary eyeButtonLarge"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="">{eye}</i>
                  ) : (
                    <i className="">{eye}</i>
                  )}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword2">
                Confirmation Password
              </label>
              <input
                placeholder="Enter Confirmation Password"
                type={passwordType}
                name="confirmpassword"
                className="form-control"
                onChange={handleChange}
              />
              <div className="input-group-btn ">
                <button
                  className="btn btn-outline-primary eyeButtonLarge"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="">{eye}</i>
                  ) : (
                    <i className="">{eye}</i>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              style={{ cursor: cursor_allow ? "pointer" : "not-allowed" }}
              disabled={cursor_allow ? false : true}
              className="btn btn-success rounded btn-lg btn-block"
            >
              Create Account
            </button>
          </form>
          {/* <p className="text-muted text-center small py-2 m-0">or</p>
                <button
                  className="btn btn-dark btn-block rounded btn-lg btn-apple"
                >
                  <i className="icofont-brand-apple mr-2"></i> Sign up with
                  Apple
                </button>
                <button
                  className="
                      btn btn-light
                      border
                      btn-block
                      rounded
                      btn-lg btn-google
                    "
                >
                  <i className="icofont-google-plus text-danger mr-2"></i> Sign
                  up with Google
                </button> */}
          <p className="text-center mt-3 mb-0">
            <Link to="/login" className="text-dark">
              Already have an account! Sign in
            </Link>
          </p>
          <p className="text-center">
            <Link
              className=" btn-danger btn-sm btn m-4 zindex"
              to={{
                pathname: "/",
              }}
            >
              Skip <i className="icofont-bubble-right"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
