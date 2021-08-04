import React, { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import Newsletter from '../components/app/Newsletter';
import Footer from '../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirectFalse } from '../redux/redirect/redirect.action';
import { useHistory } from 'react-router-dom';
import CustomAlert from '../components/alert/CustomAlert';

const Template = (props) => {
    const dispatch = useDispatch();
    const alert_config = useSelector(state=>state.alert.alert_config);
    const history = useHistory();
    const redirection = useSelector(state=>state.redirection.redirect);
    // if(redirection){
    //     history.push(redirection)
    // }

    

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
                <Footer/>
            </div>
        </div>
    )
}

export default Template