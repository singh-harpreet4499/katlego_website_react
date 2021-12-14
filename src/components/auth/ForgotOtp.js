import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router";
import { setCurrentUser } from "../../redux/user/user.action";
import Infomsg from "../app/Infomsg";
import { forgot_verify_otp, resend_otp, set_session, user_signup_verify } from "../server/api";
import OtpInput from 'react-otp-input';


const ForgotOtp = (props) => {
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
      });
      const [requestdata,setRequestdata] = useState(initialFormData);
      const [cursor_allow,setCursorAllow] = useState(1);

      const handleChange = (e) => {
        setRequestdata({
          ...requestdata,
          [e.target.name]: e.target.value.trim()
        });
      };

      const handleChangeOTP = (otp) => {
          console.log(otp);
        setRequestdata({
            ...requestdata,
            otp:otp
          });
      }

      const resendotp = () => {
          const phone = requestdata.phone;
          resend_otp({
              username:phone
          })
          .then((rs)=>{
              if(rs.status){
                  alert('otp sent successfully')
              }else{
                  alert('something went wrong! Please try after some time')
              }
          })
          .catch(()=>{
            alert('something went wrong! Please try after some time')
          })

      }

  const handleSubmit =async (e) => {
    e.preventDefault()

    const response =await forgot_verify_otp(requestdata);
    // alert(JSON.stringify(response))
    if(response.status){
        setCursorAllow(0);
        // alert(JSON.stringify(response))
        // return;
        // set_session(response)
        // dispatch(setCurrentUser(response.data,response.token,response.refreshtoken))

        history.push('/forgot-password',{
            ...response.data
          })
    }else{
        setRequestdata({
            ...requestdata,
            otp:''
          });
        setErrormessage(response.message)
    }

  };

      useEffect(() => {
        const otpresponse = (props.location && props.location.state) || history.push('/signup');
        setRequestdata({
            ...otpresponse,
            otp:''
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
                                <OtpInput
                                disabledStyle={false}
                                containerStyle="row my-5 px-5"
                                inputStyle={{
                                    width:'8em',
                                    height: '40px',
                                    padding: '.85rem 2rem',
                                    fontSize: '1.4rem',
                                    lineHeight: '1.5',
                                    fontWeight: 500,
                                    color: '#777',
                                    backgroundColor: '#fafafa',
                                    border: '1px solid #ebebeb',
                                    borderRadius: '0',
                                    marginBottom: '2rem',
                                    transition: 'all 0.3s'
                                }
                                }
                                
                                    value={requestdata.otp}
                                    otpType="number"
                                    shouldAutoFocus	
                                    // secure
                                    onChange={handleChangeOTP}
                                    numInputs={4}
                                    separator={<span className="px-2"></span>}
                                />
                                
                                    
                                {/* </div> */}
                                <p><div style={{cursor:"pointer"}} onClick={resendotp} className="text-decoration-none text-success">Resend Code</div></p>
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

export default withRouter(ForgotOtp)