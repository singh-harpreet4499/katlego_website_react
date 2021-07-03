// import './App.css';

import Navbar from './components/navbar/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import {Switch,Route, withRouter, Redirect, useHistory} from 'react-router-dom';
import Otp from './components/auth/Otp';
import Login from './components/auth/Login';
import ProductInfo from './pages/ProductInfo';
import ProductList from './pages/ProductList';
import { connect, useSelector, useDispatch } from 'react-redux'
import { get_cart_items, get_session } from './components/server/api';
import { setCurrentUser } from "./redux/user/user.action";
import { useEffect, useState } from 'react';
import { updatecarts } from './redux/cart/cart.action';
import Loader from 'react-loader-spinner';
import Template from './pages/Template';
import CartData from './pages/CartData';
import Dashboard from './components/account/Dashboard';
import GifLoader from './components/loader/GifLoader';
import Loader2 from "react-loader-spinner";
import SpinLoader from './components/loader/SpinLoader';


const App = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);
  
  const [canmove,setCanMove] = useState(0);

  const check_session = async () => {
    const session =await get_session();
    setCanMove(1)

    if(session.status){
      dispatch(setCurrentUser(session.data,session.token,session.refreshToken))
      await get_cart_items().then((rs)=>{
          if(rs.status){
              dispatch(updatecarts(rs))
          }
      })
    }
  }

  useEffect(() => {
    check_session();
  }, [])


  const homecomponent = <Home user_login={user} />;
  const productinfocomponent = <ProductInfo user_login={user} />;
  const productlistcomponent = <ProductList user_login={user} />;
  const cartcomponent = <CartData user_login={user} />;

  const dashboardcomponent = user? <Dashboard user_login={user} /> : <Redirect to={{pathname:'/login'}} />;

  
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


      
      </Switch>
      }
     
    </div>
  );
}


// const mapStateToProps = ({user}) => ({
//   currentUser : user.currentUser
// })
export default withRouter(connect()(App));
