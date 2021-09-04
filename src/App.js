// import './App.css';

import Auth from './pages/Auth';
import Home from './pages/Home';
import {Switch,Route, withRouter, Redirect, useHistory} from 'react-router-dom';
import Otp from './components/auth/Otp';
import Login from './components/auth/Login';
import ProductInfo from './pages/ProductInfo';
import ProductList from './pages/ProductList';
import { connect, useSelector, useDispatch } from 'react-redux'
import { get_cart_items, get_session } from './components/server/api';
import { setCurrentUser, setUserLocation } from "./redux/user/user.action";
import { useEffect, useState } from 'react';
import { updatecarts } from './redux/cart/cart.action';
import Template from './pages/Template';
import CartData from './pages/CartData';
import Dashboard from './components/account/Dashboard';
import GifLoader from './components/loader/GifLoader';
import Loader2 from "react-loader-spinner";
import SpinLoader from './components/loader/SpinLoader';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AboutPage from './pages/AboutPage';
import Terms from './components/app/Terms';
import BlankTemplate from './pages/BlankTemplate';
import PrivacyPolicy from './components/app/PrivacyPolicy';
import ShippingPolicy from './components/app/ShippingPolicy';
import PaymentMethods from './components/app/PaymentMethods';
import WalletHistory from './pages/WalletHistory';
import RechargeWallet from './pages/RechargeWallet';


const App = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);

  const [canmove,setCanMove] = useState(0);

  const check_session = async () => {
    const session =await get_session();
    const location = await localStorage.getItem('setUserLocation')
    if(location){
      const location_obj = JSON.parse(location);
      dispatch(setUserLocation(location_obj))
    }
    if(session.status){
      dispatch(setCurrentUser(session.data,session.token,session.refreshToken))
      await get_cart_items().then((rs)=>{
          if(rs.status){
              dispatch(updatecarts(rs))
          }
      })
    }
    setCanMove(1)
  }

  useEffect(() => {
    check_session();
  }, [])


  const homecomponent = <Home user_login={user} />;
  const productinfocomponent = <ProductInfo user_login={user} />;
  const productlistcomponent = <ProductList user_login={user} />;
  const cartcomponent = <CartData user_login={user} />;

  const dashboardcomponent = user? <Dashboard user_login={user} /> : <Redirect to={{pathname:'/login'}} />;

  const orderSuccess = <OrderSuccessPage user_login={user} />;

  const aboutUs = <AboutPage user_login={user} />;


  const walletHistory = <BlankTemplate  component={<WalletHistory user_login={user} />} title={'Wallet'} />;
  const rechargeWallet = <BlankTemplate  component={<RechargeWallet user_login={user} />} title={'Recharge Wallet'} />;

  const termscond = <BlankTemplate  component={<Terms user_login={user} />} title={'Terms and Conditions'} />;
  const privacypolicy = <BlankTemplate  component={<PrivacyPolicy user_login={user} />} title={'Privacy Policy'} />;
  const shippingPolicy = <BlankTemplate  component={<ShippingPolicy user_login={user} />} title={'Shipping Policy'} />;
  const paymentMethods = <BlankTemplate  component={<PaymentMethods user_login={user} />} title={'Payment Methods'} />;

  
  return (
    <div >
      {!canmove ? <SpinLoader /> :
      <Switch>

        <Route exact path="/" render={()=><div>{<Template component={homecomponent} />}</div>} />
        <Route exact path="/signup" render={()=>!user ? <div><Auth /></div> : <Template component={homecomponent} /> } />
        <Route exact path="/otp" render={()=>!user ? <div><Otp /></div> : <Template component={homecomponent} /> } />
        <Route exact path="/login" render={()=> !user ? <div><Auth component={<Login />} /></div>  : <Template component={homecomponent} />   } />

        <Route path="/product-details/:productName/:id" render={()=><Template component={productinfocomponent} />}/>

        <Route path="/product-list/:categoryName/:id" render={()=><Template component={productlistcomponent} />}/>

        <Route path="/checkout" render={()=><Template hide_newsletter={true} component={cartcomponent} />}/>

        <Route path="/my_account" render={()=><Template hide_newsletter={true} component={dashboardcomponent} />}/>

        <Route path="/orderSuccess" render={()=><Template  component={orderSuccess} />}/>

        <Route path="/about-us" render={()=><Template  component={aboutUs} />}/>

        <Route path="/wallet-history" render={()=>!user ? <Redirect to={{pathname:'/login'}} /> :  <Template  component={walletHistory} />}/>
        <Route path="/recharge-wallet" render={()=>!user ? <Redirect to={{pathname:'/login'}} /> :  <Template  component={rechargeWallet} />}/>


        <Route path="/terms-and-conditions" render={()=><Template  component={termscond}  hide_newsletter={true} />}/>
        <Route path="/privacy-policy" render={()=><Template  component={privacypolicy}  hide_newsletter={true} />}/>
        <Route path="/shipping-policy" render={()=><Template  component={shippingPolicy}  hide_newsletter={true} />}/>
        <Route path="/payment-methods" render={()=><Template  component={paymentMethods}  hide_newsletter={true} />}/>

      </Switch>
      }

    </div>
  );
}


// const mapStateToProps = ({user}) => ({
//   currentUser : user.currentUser
// })
export default withRouter(connect()(App));
