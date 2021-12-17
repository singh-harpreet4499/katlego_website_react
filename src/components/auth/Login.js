import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Infomsg from "../app/Infomsg";
import { get_cart_items, set_session, user_login } from "../server/api";
import { connect, useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";
import { updatecarts } from "../../redux/cart/cart.action";

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
        history.push("/");
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
                type="password"
                className="form-control"
              />
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
