import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router";
import { setCurrentUser } from "../../redux/user/user.action";
import Infomsg from "../app/Infomsg";
import { set_session, user_signup_verify } from "../server/api";


const Otp = (props) => {
    // console.log('otp props',props);
  var history = useHistory();
  const [errormessage,setErrormessage] = useState('');
    const dispatch = useDispatch();
    const initialFormData = Object.freeze({
        id: "",
        otp: "",
        device_id: "",
        device_type: "",
        device_token: "",
        model_name: "",
        one: "",
        two: "",
        three: "",
        four: "",
      });
      const [requestdata,setRequestdata] = useState(initialFormData);
      const [cursor_allow,setCursorAllow] = useState(1);

      const handleChange = (e) => {
        setRequestdata({
          ...requestdata,
          [e.target.name]: e.target.value.trim()
        });
      };

  const handleSubmit =async (e) => {
    e.preventDefault()
    var reqst = requestdata;
    reqst.otp=`${reqst.one}${reqst.two}${reqst.three}${reqst.four}`
    const response =await user_signup_verify(requestdata);
    // alert(response.message)
    if(response.status){
        setCursorAllow(0);
        set_session(response)
        dispatch(setCurrentUser(response.data,response.token,response.refreshtoken))
        history.push('/')
    }else{
        setErrormessage(response.message)
    }

  };

      useEffect(() => {
        const otpresponse = (props.location && props.location.state) || history.push('/signup');
        setRequestdata({
            ...otpresponse
        })
      },[props.location,history])

    return (

       

    <section className="osahan-main-body">
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center vh-100">
                <div className="col-lg-6">
                    <div className="osahan-verification shadow bg-white p-4 rounded">
                        <div className="osahan-form p-3 text-center mt-3">
                            <h2>Verify your number</h2>
                            <p>Enter the 4-digit code we sent to you</p>
                            <p>{requestdata.phone ? requestdata.phone : '98*** ***76'}</p>
                            <form method="post"  onSubmit={handleSubmit}>
                            {<Infomsg type="danger" message={errormessage} ></Infomsg>}
                                <div className="row my-5 px-5">
                                    <div className="col px-2">
                                        <input type="text" onChange={handleChange} name="one" placeholder="0" className="form-control opt form-control-lg text-center" />
                                    </div>
                                    <div className="col px-2">
                                        <input type="text" onChange={handleChange} name="two" placeholder="0" className="form-control opt form-control-lg text-center" />
                                    </div>
                                    <div className="col px-2">
                                        <input type="text" onChange={handleChange} name="three" placeholder="0" className="form-control opt form-control-lg text-center" />
                                    </div>
                                    <div className="col px-2">
                                        <input type="text" onChange={handleChange} name="four" placeholder="0" className="form-control opt form-control-lg text-center" />
                                    </div>
                                </div>
                                {/* <p><a href="/" className="text-decoration-none text-success">Resend Code</a></p>
                                <p><a href="/" className="text-decoration-none text-dark">Call me instead</a></p> */}
                                <button type="submit" className="btn btn-success btn-block btn-lg" style={{cursor:cursor_allow ? 'pointer':'not-allowed'}} disabled={cursor_allow?false:true}>Continue</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default withRouter(Otp)