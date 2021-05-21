// import './App.css';

import Navbar from './components/navbar/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import {Switch,Route, withRouter} from 'react-router-dom';
import Otp from './components/auth/Otp';
import Login from './components/auth/Login';
import ProductInfo from './pages/ProductInfo';
import ProductList from './pages/ProductList';
import { connect, useSelector, useDispatch } from 'react-redux'
import { get_cart_items, get_session } from './components/server/api';
import { setCurrentUser } from "./redux/user/user.action";
import { useEffect } from 'react';
import { updatecarts } from './redux/cart/cart.action';


const App = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);



  const check_session = async () => {
    const session =await get_session();
    if(session.status){
      dispatch(setCurrentUser(session.data,session.token,session.refreshToken))
      get_cart_items().then((rs)=>{
          if(rs.status){
              dispatch(updatecarts(rs))
          }
      })
    }
  }

  useEffect(() => {
    check_session();
  }, [])



  var navbar = <Navbar />;
  return (
    <div >
      <Switch>
      <Route exact path="/" render={()=><div>{navbar}<Home user_login={user} /></div>} />
      <Route exact path="/signup" render={()=>!user ? <div><Auth /></div> : <div>{navbar}<Home user_login={user} /></div>} />
      <Route exact path="/otp" render={()=>!user ? <div><Otp /></div> : <div>{navbar}<Home user_login={user} /></div>} />
      <Route exact path="/login" render={()=><div><Auth component={<Login></Login>} /></div>} />

      <Route path="/product-details/:productName/:id" render={()=><div>{navbar}<ProductInfo /></div>}/>

      <Route path="/product-list/:categoryName/:id" render={()=><div>{navbar}<ProductList /></div>}/>


      </Switch>
    </div>
  );
}


// const mapStateToProps = ({user}) => ({
//   currentUser : user.currentUser
// })
export default withRouter(connect()(App));
