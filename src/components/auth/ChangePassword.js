import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Infomsg from "../app/Infomsg";
import { forgot_change_password, forgot_otp, get_cart_items, set_session, user_login } from "../server/api";
import { connect, useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from "../../redux/user/user.action";
import { updatecarts } from "../../redux/cart/cart.action";
import { withRouter } from "react-router";

export function phonenumberValidate(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.value.match(phoneno)) {
    return true;
  }
  else {
    alert("message");
    return false;
  }
}

const ChangePassword = (props) => {
    let history = useHistory();
    const dispatch = useDispatch();

  const [formData, updateFormData] = useState({
    id: "",
    password: "",
  });
  const [errormessage,setErrormessage] = useState('');
  const [can_move,setCanmove] = useState(0);
  const [cursor_allow,setCursorAllow] = useState(1);


  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };
  
  const handleSubmit =async (e) => {
    e.preventDefault()
    const {password,confirm_password}=formData;
    if(password===''){
      setCanmove(0)
      setErrormessage('Password should not be empty!')
    }else if(password ==='' && confirm_password===''){
        setCanmove(0)
  
        setErrormessage('Please enter your password!')
  
      }else if(password !== confirm_password){
        setCanmove(0)
  
        setErrormessage('Password does not match with confirm password!')
  
    }
    else{
      setCursorAllow(0)
      const response =await forgot_change_password(formData);

        if(response.status){
            alert('Password changed successfully!')
            history.push('/login',{
                ...response.data
            })
        }else{
          setCursorAllow(1)

          setErrormessage(response.message)
        }
    }
   

  };

  useEffect(() => {
    const otpresponse = (props.location && props.location.state) || history.push('/signup');
    updateFormData({
        ...otpresponse,
    })
  },[props.location,history])


    return (
        <div className="col-lg-6 pl-lg-5">
            <div className="osahan-signin shadow-sm bg-white p-4 rounded">
                <div className="p-3">
                    <h2 className="my-0">Forgot Password</h2>
                    <p className="small mb-4">Please enter your mobile number to search for your account.</p>
                    {<Infomsg type="danger" message={errormessage} ></Infomsg>}

                    <form method="POST" onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">New Password</label>
                            <input placeholder="Enter New Password" name="password"  type="text"  onChange={handleChange} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Confirm Password</label>
                            <input placeholder="Enter Confirm Password" name="confirm_password"  type="text"  onChange={handleChange} className="form-control" />
                        </div>
                      
                        <button type="submit" className="btn btn-success btn-lg rounded btn-block" style={{cursor:cursor_allow ? 'pointer':'not-allowed'}} disabled={cursor_allow?false:true}>Save</button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}


export default connect()(withRouter(ChangePassword));