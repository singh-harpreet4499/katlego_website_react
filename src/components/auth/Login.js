import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Infomsg from "../app/Infomsg";
import { get_cart_items, set_session, user_login } from "../server/api";
import { connect, useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";
import { updatecarts } from "../../redux/cart/cart.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export function phonenumberValidate(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.value.match(phoneno)) {
    return true;
  } else {
    alert("message");
    return false;
  }
}

const Login = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

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

  let history = useHistory();
  const dispatch = useDispatch();

  const [formData, updateFormData] = useState({
    username: "",
    password: "",
  });
  const [errormessage, setErrormessage] = useState("");
  const [can_move, setCanmove] = useState(0);
  const [cursor_allow, setCursorAllow] = useState(1);

  const handleChange = (e) => {
    handlePasswordChange(e);
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (username === "") {
      setCanmove(0);
      setErrormessage("Phone should not be empty!");
    } else if (password === "") {
      setCanmove(0);
      setErrormessage("Password should not be empty!");
    } else {
      // setCanmove(1)
      setCursorAllow(0);
      const response = await user_login(formData);
      // console.log(response);
      if (response.status) {
        await set_session(response);
        dispatch(
          setCurrentUser(response.data, response.token, response.refreshtoken)
        );
        get_cart_items().then((rs) => {
          if (rs.status) {
            dispatch(updatecarts(rs));
          }
        });
        // history.push("/");
        window.location.href = "/";
      } else {
        setCursorAllow(1);

        setErrormessage(response.message);
      }
    }
  };

  const handlePhone = (e) => {
    e.preventDefault();
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, 10);
  };

  return (
    <div className="col-lg-6 pl-lg-5">
      <div className="osahan-signin shadow-sm bg-white p-4 rounded">
        <div className="p-3">
          <h2 className="my-0">Welcome Back</h2>
          <p className="small mb-4">Sign in to Continue.</p>
          {<Infomsg type="danger" message={errormessage}></Infomsg>}

          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Phone</label>
              <input
                placeholder="Enter Phone"
                name="username"
                type="number"
                onChange={handleChange}
                onInput={handlePhone}
                className="form-control"
                // oninput={
                //   "(if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength))"
                // }
                // maxlength="6"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                type={passwordType}
                className="form-control"
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

              {/* <i onClick={togglePasswordVisiblity}>{eye}</i> */}
              {/* <svg
                onClick={togglePasswordVisiblity}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg> */}

              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg> */}
            </div>
            <button
              type="submit"
              className="btn btn-success btn-lg rounded btn-block"
              style={{ cursor: cursor_allow ? "pointer" : "not-allowed" }}
              disabled={cursor_allow ? false : true}
            >
              Sign in
            </button>
          </form>
          {/* <p className="text-muted text-center small m-0 py-3">or</p>
                    <a href="/" className="btn btn-dark btn-block rounded btn-lg btn-apple">
                        <i className="icofont-brand-apple mr-2"></i> Sign up with Apple
                    </a>
                    <a href="/" className="btn btn-light border btn-block rounded btn-lg btn-google">
                        <i className="icofont-google-plus text-danger mr-2"></i> Sign up with Google
                    </a> */}
          <p className="text-center mt-3 mb-0">
            <Link to="/signup" className="text-dark">
              Don't have an account? Sign up
            </Link>
          </p>
          <p className="text-center mt-2 mb-0">
            <Link to="/forgot" className="text-dark">
              Forgot Password
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

export default connect()(Login);
