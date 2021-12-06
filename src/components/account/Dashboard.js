import { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { setOrderConf } from "../../redux/order/order.action";
import { setCurrentUser, setUserAddressList } from "../../redux/user/user.action";
import Infomsg from "../app/Infomsg";
import GifLoader from "../loader/GifLoader";
import AddAddressModal from "../modals/AddAddressModal";
import { edit_user_profile, get_session, logout_user, user_profile, change_password_by_old_password, delete_address, showAlertMessage, fetch_addresses, fetch_locations, fetch_faqs } from "../server/api";

import Faq from "react-faq-component";

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



const AddressItem = (props) => {
    const {address_type,location,city,state,id} = props;
    const dispatch = useDispatch();
    const orderConfd = useSelector(state=>state.orderConf)


    const select_shipping_location = (location_id) => {

        dispatch(setOrderConf({
            ...orderConfd,
            address_id:location_id
        }))
    }
    

    const delete_add = ()=>{
        delete_address({id:id}).then((dt)=>{
            showAlertMessage('Success','Address removed successfully',true,false)
                 fetch_addresses({
                     location_id:props.location_id
                 }).then((rs)=>{
                    if(rs.status){
                       dispatch(setUserAddressList(rs.data))
                    }
                })
              
        })
    }


    useEffect(() => {
        // dispatch(setOrderConf({
        //     ...orderConfd,
        //     address_id:id
        // }))
    }, [orderConfd])


    return (
        <>
            <div class="custom-control custom-radio px-0 mb-3 position-relative border-custom-radio">
                <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" checked="" />
                <label class="custom-control-label w-100" for="customRadioInline1">
                    <div>
                        <div class="p-3 bg-white rounded shadow-sm w-100">
                            <div class="d-flex align-items-center">
                                <p className="mb-0 h6">{address_type.toUpperCase()}</p>
                                <p className="mb-0 badge badge-success ml-auto">{orderConfd.address_id===id ? <><i className="icofont-check-circled"></i> Default</> :'' }</p>
                            </div>
                            <p className="small text-muted m-0">{props.flat}</p>
                            <p className="small text-muted m-0">{props.main_society + ' '+ props.main_location}</p>
                            <p className="pt-2 m-0 text-right"><span className="small"><span style={{cursor:"pointer"}} onClick={delete_add}  className="text-decoration-none text-info">Delete</span></span></p>
                        </div>
                    </div>
                </label>
            </div>
       
        </>
    );
}


const AddressesList = (props) => {
    const address_list = useSelector(state => state.user.address_list)
    const address_selected = useSelector(state=>state.user.location);
    const dispatch = useDispatch()
    const [locations,setLocations] = useState([]);

    const setselectedLocation =async () => {
        const locationapi = await fetch_locations({});
        if (locationapi.status) {
            setLocations(locationapi.data)
        }
    }

    // console.log("sfsdd",address_list);
    useEffect(() => {
        setselectedLocation()
        fetch_address()
    }, [])

    
    const fetch_address =async () => {
        await fetch_addresses({
            location_id:address_selected?address_selected.address_id:0,
        }).then((rs)=>{
            if(rs.status){
               dispatch(setUserAddressList(rs.data))
            }
        })
    }
    return (
        <div class="col-lg-8 p-4 bg-white rounded shadow-sm" id="address">
            <div class="osahan-my_address">
                <h4 class="mb-4 profile-title">My Addresses 
                </h4>
                <AddAddressModal my_account={true} locations={locations}  location_id ={ address_selected ? address_selected.address_id : 0} /> 
               
                {
                    address_list.length>0?
                    address_list.map((data)=><AddressItem  style={{cursor:'pointer'}} {...data} location_id={address_selected?address_selected.address_id:0} />)
                    : ''
                }
            </div>
        </div>
    )
}


const HelpSupport = (props) => {
    const [faqs,setFaqs] = useState([])

    const get_faqs =async () => {
        await fetch_faqs({}).then((rs)=>{
            if(rs.status){
                setFaqs(rs.data)
            }
        })
       
    }

    const data = {
        title: "",
        rows: faqs
    };

    const styles = {
        fontSize: '13px',
        color: '#212529',
        // bgColor: 'white',
        // titleTextColor: "blue",
        // rowTitleColor: "blue",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };
    
    const config = {
        // animate: true,
        // arrowIcon: "V",
        // tabFocus: true
    };
    

    useEffect(() => {
        get_faqs()

    }, [])
  
    return (
        <div class="col-lg-8 p-4 bg-white rounded shadow-sm" id="help">
<h4 class="mb-4 profile-title">Help &amp; Support</h4>
<div class="help_support">
{/* {
                faqs.map((dt)=>{
                    return (
                        <button class="p-3 btn-light border d-flex align-items-center btn w-100 mb-1" type="button">
                        {dt.question}
                        <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button>
                    )
                })
            } */}

<Faq
className="p-3 btn-light border d-flex align-items-center btn w-100 mb-1"
                data={data}
                styles={styles}
                config={config}
            />
</div>
</div>
//         <div  className="help_support">
//             {
//                 faqs.map((dt)=>{
//                     return (
// <button class="p-3 btn-light border d-flex align-items-center btn w-100 mb-1" type="button">
// {dt.question}
// <i class="text-success icofont-rounded-right ml-auto"></i>
// </button>
//                     )
//                 })
//             }
            
        // <Faq
        //         data={data}
        //         styles={styles}
        //         config={config}
        //     />
//         </div>
    )
}



const TermPrivacy = (props) => {
   
    
    return (
       <>
        <div class="col-lg-8 p-4 bg-white rounded shadow-sm" id="help">
            <h4 class="mb-4 profile-title">Terms {'&'} Privacy</h4>
            <div class="help_support">
            <Link class="p-3 btn-light border d-flex align-items-center btn w-100 mb-1" 
            style={{cursor:'pointer !important'}}
            to={{
                pathname:'/terms-and-conditions'
            }}>Terms {'&'} Conditions<i class="text-success icofont-rounded-right ml-auto"></i>
            </Link>
            <Link class="p-3 btn-light border d-flex align-items-center btn w-100 mb-1"
            style={{cursor:'pointer !important'}}
            to={{
                pathname:'/privacy-policy'
            }}>Privacy Policy<i class="text-success icofont-rounded-right ml-auto"></i>
            </Link>
            <Link class="p-3 btn-light border d-flex align-items-center btn w-100 mb-1" 
            style={{cursor:'pointer !important'}}
            to={{
                pathname:'/shipping-policy'
            }}>Shipping Policy<i class="text-success icofont-rounded-right ml-auto"></i>
            </Link>
            
            </div>
        </div>
       </>
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

        case 'my_address':
            page=<AddressesList userdata={userdata} />
            break;

            case 'help_and_support':
            page=<HelpSupport userdata={userdata} />
            break;

            case 'terms_privacy':
            page=<TermPrivacy userdata={userdata} />
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

                                            <Link style={{cursor:"pointer"}} to={{
                                                pathname:'/order-history'
                                            }}  className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex align-items-center p-3">
                                                    <i className="icofont-history osahan-icofont bg-success"></i>My Orders
                                                    <span className="badge badge-success p-1 badge-pill ml-auto"><i className="icofont-simple-right"></i></span>
                                                </li>
                                            </Link>

                                            <Link to={{
                                                pathname:'/wallet-history'
                                            }} class="text-decoration-none text-dark">
                                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                                <i class="icofont-wallet osahan-icofont bg-success"></i>My Wallet Transaction
                                                <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                                </li>
                                            </Link>

                                            <div style={{cursor:"pointer"}} onClick={()=>update_page_name('my_address')} className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex align-items-center p-3">
                                                <i class="icofont-address-book osahan-icofont bg-dark"></i>My Addresses
                                                    <span className="badge badge-success p-1 badge-pill ml-auto"><i className="icofont-simple-right"></i></span>
                                                </li>
                                            </div>

                                            <div style={{cursor:"pointer"}} onClick={()=>update_page_name('terms_privacy')} className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex align-items-center p-3">
                                                <i class="icofont-info-circle osahan-icofont bg-primary"></i>Terms, Privacy {'&'} Policy
                                                    <span className="badge badge-success p-1 badge-pill ml-auto"><i className="icofont-simple-right"></i></span>
                                                </li>
                                            </div>

                                            <div style={{cursor:"pointer"}} onClick={()=>update_page_name('help_and_support')} className="text-decoration-none text-dark">
                                                <li className="border-bottom bg-white d-flex align-items-center p-3">
                                                <i class="icofont-phone osahan-icofont bg-warning"></i>Help {'&'} Support
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