import { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router";
import { setCurrentUser } from "../../redux/user/user.action";
import Infomsg from "../app/Infomsg";
import GifLoader from "../loader/GifLoader";
import { edit_user_profile, get_session, logout_user, user_profile, change_password_by_old_password } from "../server/api";


const ChangePassword = (props) => {
    const userdata = props.userdata
    const dispatch = useDispatch()

   const [formData, updateFormData] = useState({
       old_password: "",
       new_password:"",
   });

   const [responseMessage, setResponseMessage] = useState({
       class: "success",
       message:''
   });
   
 const handleChange = (e) => {
       updateFormData({
       ...formData,
       [e.target.name]: e.target.value.trim()
       });
   };

   const handleSubmit =async (e) => {
       e.preventDefault()
       const {old_password,new_password}=formData;
       if(old_password===''){
           setResponseMessage({
               class:'danger',
               message:'Old Password should not be empty'
           })
       }else if(new_password===''){
        setResponseMessage({
            class:'danger',
            message:'New Password should not be empty'
        })
        }
       else{
        change_password_by_old_password(formData).then(async (rs)=>{
               if(rs.status){
                   setResponseMessage({
                       class:'success',
                       message:rs.message
                   })
               }else{
                   setResponseMessage({
                       class:'danger',
                       message:rs.message
                   })
               }
           })
       }
   };

   return (
       <div className="col-lg-8 p-4 bg-white rounded shadow-sm">
           <h4 className="mb-4 profile-title">Change Password</h4>
           <div id="edit_profile">
               <div className="p-0">
                   <form method="POST" onSubmit={handleSubmit}>
                   {<Infomsg type={responseMessage.class} message={responseMessage.message} ></Infomsg>}
                       <div className="form-group">
                           <label htmlFor="name">Old Password</label>
                           <input type="password" name="old_password" className="form-control" onChange={handleChange} placeholder="Old Password" />
                       </div>

                       <div className="form-group">
                           <label htmlFor="name">New Password</label>
                           <input type="password" name="new_password" className="form-control" onChange={handleChange} placeholder="New Password" />
                       </div>
                      
                       <div className="text-center">
                           <button type="submit" className="btn btn-success btn-block btn-lg">Save </button>
                       </div>
                   </form>
               </div>
           </div>
       </div>
   )
}

const MyAccount = (props) => {

    const userdata = props.userdata
     const dispatch = useDispatch()

    const [formData, updateFormData] = useState({
        name: "",
        email:"",
        phone:""
    });

    const [responseMessage, setResponseMessage] = useState({
        class: "success",
        message:''
    });
    
  const handleChange = (e) => {
        updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault()
        const {name}=formData;
        if(name===''){
            setResponseMessage({
                class:'danger',
                message:'Name should not be empty'
            })
        }else{
            edit_user_profile(formData).then(async (rs)=>{
                if(rs.status){
                    const session =await get_session();
                    if(session.status){
                    const ur =await user_profile();
                      dispatch(setCurrentUser(ur.data,session.token,session.refreshToken))
                    }
                    setResponseMessage({
                        class:'success',
                        message:'Your profile updated successfully!'
                    })
                }else{
                    setResponseMessage({
                        class:'danger',
                        message:rs.message
                    })
                }
            })
        }

        


    };

    return (
        <div className="col-lg-8 p-4 bg-white rounded shadow-sm">
            <h4 className="mb-4 profile-title">My account</h4>
            <div id="edit_profile">
                <div className="p-0">
                    <form method="POST" onSubmit={handleSubmit}>
                    {<Infomsg type={responseMessage.class} message={responseMessage.message} ></Infomsg>}
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" name="name" className="form-control" onChange={handleChange} defaultValue={userdata.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Mobile Number</label>
                            <input type="number" className="form-control" name="phone" onChange={handleChange}  value={userdata.phone}  readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" className="form-control" name="email" onChange={handleChange} defaultValue={userdata.email} placeholder={userdata.email} required />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success btn-block btn-lg">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


const Dashboard = (props) => {

    var userdata = useSelector(state => state.user.currentUser)
    
    const dispatch = useDispatch()

    const [pageName,setPageName] = useState('my_account');

    const [userset,setUserSet] = useState({
        name:'',
        imageUrl:'',
        emai:'',
        phone:'',
        password:'',
        referral_code:'',
        wallet:'',
        auth_type:''
    })


    const logout_user_data = async () => {
       
        logout_user();
        dispatch(setCurrentUser(null,null,null))
        return <Redirect to={{
            pathname:"/"
        }} />

    }

    const update_page_name =  (page_name='my_account') => {
        localStorage.setItem('dashboard_page',page_name)
        setPageName(page_name)
    }

    var page = <MyAccount userdata={userdata} />
    switch (pageName) {
        case 'my_account':
            page=<MyAccount userdata={userdata} />
            break;

        case 'change_password':
            page=<ChangePassword userdata={userdata} />
            break;
    
        default:
            break;
    }



    useEffect(() => {

        const dashboard_page = localStorage.getItem('dashboard_page');
        if(dashboard_page){
            setPageName(dashboard_page)
        }

    }, [])



    return (
        <div>
           
                <section className="py-4 osahan-main-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="osahan-account bg-white rounded shadow-sm overflow-hidden">
                                    <div className="p-4 profile text-center border-bottom">
                                        <img src={userdata ? userdata.imageUrl : ''} alt={userdata ? userdata.name : ''} className="img-fluid rounded-pill" />
                                        <h6 className="font-weight-bold m-0 mt-2">{userdata ? userdata.name : ''}</h6>
                                    </div>
                                    <div className="account-sections">
                                        <ul className="list-group">
                                            <div style={{cursor:"pointer"}} onClick={()=>update_page_name('my_account')}  className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex align-items-center p-3">
                                                    <i className="icofont-user osahan-icofont bg-danger"></i>My Account
                                                    <span className="badge badge-success p-1 badge-pill ml-auto"><i className="icofont-simple-right"></i></span>
                                                </li>
                                            </div>

                                            <div style={{cursor:"pointer"}} onClick={()=>update_page_name('change_password')} className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex align-items-center p-3">
                                                    <i className="icofont-user osahan-icofont bg-danger"></i>Change Password
                                                    <span className="badge badge-success p-1 badge-pill ml-auto"><i className="icofont-simple-right"></i></span>
                                                </li>
                                            </div>

                                            <div style={{cursor:'pointer'}} onClick={logout_user_data} className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex  align-items-center p-3">
                                                    <i className="icofont-lock osahan-icofont bg-danger"></i> Logout
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           {page}
                        </div>
                    </div>
                </section>
          
        
   
        </div>
    )
}

export default connect()(Dashboard)