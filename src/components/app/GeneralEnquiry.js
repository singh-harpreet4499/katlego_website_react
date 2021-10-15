import { useEffect } from "react"
import { useState } from "react"
import { add_support_data, get_settings, showAlertMessage } from "../server/api"
import parse from 'html-react-parser'
import defaultImage from '../../libs/images/contact-header-bg.jpg'
import Infomsg from "./Infomsg"


const GeneralEnquiry = (props) => {
	const {user_login} = props

	const emptyobj = {
        name: user_login?user_login.name:'',
        phone: user_login?user_login.phone:'',
        email:user_login?user_login.email:'',
		subject:"",
        message:""
    }
    const [content,setContent] = useState(null)
    const [errormessage,setErrormessage] = useState('');
    const [formData, updateFormData] = useState(emptyobj);

    const get_data =async () => {
        await get_settings({}).then((rs)=>{
            if(rs.status){
                setContent(rs.data)
            }
        })
    }


    const handleChange = (e) => {
        updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault()
        const {name,phone,email,message}=formData;
        if(name===''){
          setErrormessage('Name should not be empty!')
        }else if(phone===''){
          setErrormessage('Phone number should not be empty!')
        }else{
			add_support_data(formData).then((rs)=>{

				if(rs.status){
					updateFormData(emptyobj)
					showAlertMessage('Success','Send Successfully',true,false)
				}else{
					showAlertMessage('Oops','Something went wrong! Please try after some time!',false,true)
				}
			})
			.catch((err)=>showAlertMessage('Oops','Something went wrong! Please try after some time!',false,true))

        }

      };

    useEffect(() => {
        get_data()
    }, [])

    return (
        <>
            <div class="container">
	        	<div class="page-header page-header-big text-center" style={{backgroundImage:`url('${defaultImage}')`}}>
        		    <h1 class="page-title text-white">General Enquiry<span class="text-white">keep in touch with us</span></h1>
	        	</div>
            </div>

            <div class="page-content pb-0">
                <div class="container">
                	<div class="row">
                		<div class="col-lg-6 mb-2 mb-lg-0">
                			<h2 class="title mb-1">Contact Information</h2>
                			{/* <p class="mb-3">Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p> */}
                			<div class="row">
                				<div class="col-sm-7">
                					<div class="contact-info">
                						<h3>The Office</h3>

                						<ul class="contact-list">
                							<li>
                								<i class="icon-map-marker"></i>
	                							{content?content.address:''}
	                						</li>
                							<li>
                								<i class="icon-phone"></i>
                								<a href={"tel:"+(content?content.support_phone:'')}>{content?content.support_phone:''}</a>
                							</li>
                							<li>
                								<i class="icon-envelope"></i>
                								<a href={"mailto:"+(content?content.support_email:'')}>{content?content.support_email:''}</a>
                							</li>
                						</ul>
                					</div>
                				</div>

                				<div class="col-sm-5">
                					<div class="contact-info">
                						<h3>The Office</h3>

                						<ul class="contact-list">
                							<li>
                								<i class="icon-clock-o"></i>
	                							<span class="text-dark">{content?content.office_week:''}</span> <br/>{content?content.office_time:''}
	                						</li>
                							<li>
                								<i class="icon-calendar"></i>
                								<span class="text-dark">Sunday</span> <br/>{content?content.sunday_time:''}
                							</li>
                						</ul>
                					</div>
                				</div>
                			</div>
                		</div>
                		<div class="col-lg-6">
                			<h2 class="title mb-1">Got Any Questions?</h2>
                			<p class="mb-2">Use the form below to get in touch with the sales team</p>

                			<form onSubmit={handleSubmit} class="contact-form mb-3">
                                {<Infomsg type="danger" message={errormessage} ></Infomsg>}
                				<div class="row">
                					<div class="col-sm-6">
                                        <label for="cname" class="sr-only">Name</label>
                						<input type="text" class="form-control"  onChange={handleChange} value={formData.name} defaultValue={user_login?user_login.name:''}  name="name" id="cname" placeholder="Name *" required />
                					</div>

                					<div class="col-sm-6">
                                        <label for="cemail" class="sr-only">Email</label>
                						<input type="email" class="form-control"  onChange={handleChange} value={formData.email} defaultValue={user_login?user_login.email:''}  name="email" id="cemail" placeholder="Email *" required />
                					</div>
                				</div>

                				<div class="row">
                					<div class="col-sm-6">
                                        <label for="cphone" class="sr-only">Phone</label>
                						<input type="tel" class="form-control"  onChange={handleChange} value={formData.phone} defaultValue={user_login?user_login.phone:''}  name="phone" id="cphone" placeholder="Phone" />
                					</div>

                					<div class="col-sm-6">
                                        <label for="csubject" class="sr-only">Subject</label>
                						<input type="text" class="form-control"  onChange={handleChange} value={formData.subject}  name="subject" id="csubject" placeholder="Subject" />
                					</div>
                				</div>

                                <label for="cmessage" class="sr-only">Message</label>
                				<textarea class="form-control" name="message"  onChange={handleChange}  cols="30" rows="4" id="cmessage" required placeholder="Message *">{formData.message}</textarea>

                				<button type="submit" class="btn btn-outline-primary-2 btn-minwidth-sm">
                					<span>SUBMIT</span>
            						<i class="icon-long-arrow-right"></i>
                				</button>
                			</form>
                		</div>
                	</div>

                </div>
            </div>
        </>
    )
}

export default GeneralEnquiry;