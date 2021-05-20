import logo from "../../libs/images/logo.png";
import React from 'react';

import { geolocated } from "react-geolocated";
import { check_if_service_location, fetch_locations } from "../server/api";
import NavCart from "../cart/NavCart";
import { connect} from 'react-redux'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: "",
      latitude:"",
      longitude:"",
      formatted_address: "",
      locations:[],
      all_data_fetch:0,
      is_location_available:0,
      city:'',
      state:''
    }
  }


  locationstatus = async () => {
    const locationapi = await fetch_locations({});
    if(locationapi.status){
      this.setState({
        locations:locationapi.data
      })
    }

    const setlc = !this.props.isGeolocationAvailable ? (
      {
        status:false,
        message:'Your browser does not support Geolocation',
        location_enabled:true
      }
    ) : !this.props.isGeolocationEnabled ? (
      {
        status:false,
        message:'Geolocation is not enabled',
        location_enabled:false
      }
    ) : (
        this.props.coords ? 
      {
        status:true,
        message:'',
        location_enabled:true,
        data:this.props.coords
      }
      :{
        status:false,
        message:'',
        location_enabled:true,
        data:this.props.coords
      }
    );

    if(setlc.status){
      const lat_lon = {
        latitude:setlc.data.latitude,
        longitude:setlc.data.longitude,
      }
      this.setState(lat_lon)

      const check_service_location = await check_if_service_location(lat_lon);
      if(check_service_location.status){
        this.setState({
          all_data_fetch:1,
          is_location_available:1,
          formatted_address:check_service_location.formatted_address,
          city:check_service_location.city,
          state:check_service_location.state,
          pincode:check_service_location.pincode
        })
      }else{
        // alert('currently we are not providing services in your area')
        this.setState({
          // city:check_service_location.city,
          // state:check_service_location.state,
          all_data_fetch:1,
          is_location_available:0,
          formatted_address:check_service_location.formatted_address,
          pincode:check_service_location.pincode
        })
      }

    }
  
  }

  update_location_stats = async (latitude,longitude) => {
    const lat_lon = {
      latitude:latitude,
      longitude:longitude,
    }
    this.setState(lat_lon)

    const check_service_location = await check_if_service_location(lat_lon);
    if(check_service_location.status){
      this.setState({
        all_data_fetch:1,
        is_location_available:1,
        formatted_address:check_service_location.formatted_address,
        pincode:check_service_location.pincode
      })
    }else{
      this.setState({
        all_data_fetch:1,
        is_location_available:0,
        formatted_address:check_service_location.formatted_address,
        pincode:check_service_location.pincode
      })
    }
  }

  componentDidMount(){
    this.locationstatus();
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   this.update_location_stats(position.coords.latitude,position.coords.longitude)
    // },
    // function(error) {
    //   console.error("Error Code = " + error.code + " - " + error.message);
    // }

    // );
    
  }


  render() {
    console.log('location state',this.state);
    const {all_data_fetch,formatted_address,city,state,locations}=this.state;
    return (
      <div>
      <div className="header-middle sticky-header">
        <div className="container">
          <div className="header-left">
            <button className="mobile-menu-toggler">
              <span className="sr-only">Toggle mobile menu</span>
              <i className="icon-bars"></i>
            </button>

            <a href="/" className="logo">
              <img src={logo} alt="Katlego" width="130" />
            </a>

            <div className="header-dropdown">
              <a href="/" className="del">
                <i className="fa fa-map-marker mr-2"></i> {city+' '+state}
              </a>
              <div className="header-menu">
                <ul>
                  {
                    locations.length?
                    (
                      locations.map(({id,name})=>{
                        return <li>
                                <a href="/">{name}</a>
                              </li>
                      })
                    ) :''

                  }
                </ul>
              </div>
            </div>

            <nav className="main-nav">
              <ul className="menu sf-arrows">
                <li>
                  <a href="/" className="sf-with-ul">
                    Menu
                  </a>
                </li>

                <li>
                  <a href="/" className="sf-with-ul">
                    Blogs
                  </a>
                </li>

                <li>
                  <a href="/" className="sf-with-ul">
                    Recipes
                  </a>
                </li>

                <li>
                  <a href="/" className="sf-with-ul">
                    Career
                  </a>
                </li>

                <li>
                  <a href="/" className="sf-with-ul">
                    Contact Us
                  </a>
                </li>

                <li>
                  <div className="dropdown cart-dropdown">
                    <a
                      href="/"
                      className="dropdown-toggle"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-display="static"
                    >
                      <i className="icon-shopping-cart"></i>
                      {/* <span className="cart-count">2</span> */}
                    </a>

                    <NavCart cart={this.props.cart} />
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            {/* <div className="header-search">
              <a
                href="/"
                className="search-toggle"
                role="button"
                title="Search"
              >
                <i className="icon-search"></i>
              </a>
              <form action="search.html" method="get">
                <div className="header-search-wrapper">
                  <label for="q" className="sr-only">
                    Search
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    name="q"
                    id="q"
                    placeholder="Search in..."
                    required
                  />
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    );
  }
 
}


const mapStateToProps = ({user,cart}) => ({
  currentUser : user.currentUser,
  cart:cart.items
})
export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(connect(mapStateToProps,{})(Navbar));