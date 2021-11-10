import { useState } from "react";
import { useSelector } from "react-redux";
import Infomsg from "../components/app/Infomsg";
import { add_collaborate_data, showAlertMessage } from "../components/server/api";

const Collabrate = (props) => {
    const user = useSelector(state=>state.user.currentUser);
  const [errormessage,setErrormessage] = useState('');
  const [cursor_allow,setCursorAllow] = useState(1);

    const [formData, updateFormData] = useState({
        name: user?user.name:'',
        phone: user?user.phone:'',
        email:user?user.email:'',
        user_id:user ? user.id : 0,
        city:"",
        state:"",
        type:"",
        message:""

    });
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault()
        const {name,phone,message}=formData;
        if(name===''){
          setErrormessage('Name should not be empty!')
        }else if(phone===''){
          setErrormessage('Phone should not be empty!')
        }else if(message===''){
            setErrormessage('Message should not be empty!')
        }
        else{
          setCursorAllow(0)
          const response =await add_collaborate_data(formData);
          setCursorAllow(1)
          if(response.status){
            showAlertMessage('','Your Request has been sent successfully!',true,false)
              
          }else{
    
              setErrormessage("Something went wrong, Please try after some time!")
          }
        }
       
    
    };

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
                            <form onSubmit={handleSubmit} class="contact-form mb-2">

                                <div class="row">
                                {<Infomsg type="danger" message={errormessage} ></Infomsg>}
                                    <div class="col-sm-4">
                                        <label for="cname" class="sr-only">Name</label>
                                        <input type="text" class="form-control" onChange={handleChange} name="name" id="cname" placeholder="Name *" defaultValue={formData.name} required />
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cname" class="sr-only">Email</label>
                                        <input type="text" class="form-control" id="email" onChange={handleChange} name="email" placeholder="Email *" defaultValue={formData.email} required />
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">Mobile No.</label>
                                        <input type="tel" class="form-control" id="mobile" onChange={handleChange} name="phone" defaultValue={formData.phone} placeholder="Mobile No." />
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">City</label>
                                        <input type="text" class="form-control" name="city" onChange={handleChange} placeholder="City." />
                                        {/* <select name="state" id="state" class="form-control" required="">
                                            <option value="City">Select City</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Agar">Agar</option>
                                            <option value="Aligarh">Aligarh</option>
                                            <option value="Ambala">Ambala</option>
                                            <option value="Bhopal">Bhopal</option>
                                        </select> */}
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">State</label>
                                        <input type="text" class="form-control" onChange={handleChange} name="state" placeholder="State.." />

                                        {/* <select name="state" id="state" class="form-control" required="">
                                            <option value="City">Select State</option>
                                            <option value="Delhi">New Delhi</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>

                                        </select> */}
                                    </div>

                                    <div class="col-sm-4">
                                        <label for="cphone" class="sr-only">Vehicle</label>
                                        <select  id="state" onChange={handleChange} name="type" class="form-control" required="">
                                            <option value="City">Collaboration Type</option>
                                            <option value="Delhi">Chef</option>
                                            <option value="Agar">Restaurant</option>

                                        </select>
                                    </div>
                                </div>


                                <label for="cmessage" class="sr-only">Message</label>
                                <textarea class="form-control" onChange={handleChange} name="message" cols="30" rows="4" id="cmessage" required placeholder="Message *"></textarea>

                                <div class="text-center">
                                    <button type="submit"  class="btn btn-outline-primary-2 btn-minwidth-sm"  disabled={cursor_allow ? false : true}>
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