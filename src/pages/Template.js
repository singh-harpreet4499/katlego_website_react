import React, { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import Newsletter from '../components/app/Newsletter';
import Footer from '../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirectFalse } from '../redux/redirect/redirect.action';
import { useHistory } from 'react-router-dom';
import CustomAlert from '../components/alert/CustomAlert';
import ScrollToTop from "react-scroll-to-top";

const Template = (props) => {
    const dispatch = useDispatch();
    const alert_config = useSelector(state=>state.alert.alert_config);
    const history = useHistory();
    const redirection = useSelector(state=>state.redirection.redirect);
    // if(redirection){
    //     history.push(redirection)
    // }
    const app_data = useSelector(state=>state.app_data)
    

    useEffect(()=>{
        if(redirection){
            history.push(redirection)
        }else{

        }
        return ()=>{
            dispatch(setRedirectFalse())
         }
    },[redirection])


    return (
        <div>
           
            <Navbar />
            <CustomAlert success={alert_config.success} showModel={alert_config.show_alert} title={alert_config.title} message={alert_config.message} />

            <div className="page-wrapper">
                    {props.component}
                    {
                        props.hide_newsletter===true ? '' :  <Newsletter />
                    }
                    {/* <button id="scroll-top" title="Back to Top" class="show"><i class="icon-arrow-up"></i></button> */}
                <Footer  app_data={app_data} />
                <a href={app_data ? "tel:"+app_data.support_phone : 'tel:'} class="call">
                    <i class="fa fa-phone"></i>
                </a>
                <ScrollToTop
                style={{
                    marginBottom:'50px'
                }}
                smooth />
               
            </div>
        </div>
    )
}

export default Template