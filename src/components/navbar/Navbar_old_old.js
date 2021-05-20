import logo from "../../libs/images/logo.png";
import React, { useEffect, useState } from 'react';

import { geolocated } from "react-geolocated";
import { check_if_service_location, fetch_locations } from "../server/api";
import NavCart from "../cart/NavCart";

const Navbar =(props) => {
  
    const [compData,setCompData] = useState({
        pincode: "",
        latitude:"",
        longitude:"",
        formatted_address: "",
        locations:[],
        all_data_fetch:0,
        is_location_available:0,
        city:'',
        state:''
    })


  const locationstatus = async () => {
    const locationapi = await fetch_locations({});
    if(locationapi.status){
      setCompData({
        locations:locationapi.data,
        pincode: "",
        latitude:"",
        longitude:"",
        formatted_address: "",
        all_data_fetch:0,
        is_location_available:0,
        city:'',
        state:''
      })
    }

    const setlc = !props.isGeolocationAvailable ? (
      {
        status:false,
        message:'Your browser does not support Geolocation',
        location_enabled:true
      }
    ) : !props.isGeolocationEnabled ? (
      {
        status:false,
        message:'Geolocation is not enabled',
        location_enabled:false
      }
    ) : (
        props.coords ? 
      {
        status:true,
        message:'',
        location_enabled:true,
        data:props.coords
      }
      :{
        status:false,
        message:'',
        location_enabled:true,
        data:props.coords
      }
    );

    if(setlc.status){
      const lat_lon = {
        latitude:setlc.data.latitude,
        longitude:setlc.data.longitude,
        pincode: "",
        formatted_address: "",
        locations:[],
        all_data_fetch:0,
        is_location_available:0,
        city:'',
        state:''
      }
      setCompData(lat_lon)

      const check_service_location = await check_if_service_location(lat_lon);
      if(check_service_location.status){
        setCompData({
          all_data_fetch:1,
          is_location_available:1,
          formatted_address:check_service_location.formatted_address,
          city:check_service_location.city,
          state:check_service_location.state,
          pincode:check_service_location.pincode
        })
      }else{
        // alert('currently we are not providing services in your area')
        setCompData({
          // city:check_service_location.city,
          // state:check_service_location.state,
          all_data_fetch:1,
          is_location_available:0,
          formatted_address:check_service_location.formatted_address,
          pincode:check_service_location.pincode,

          latitude:"",
          longitude:"",
          locations:[],
          city:'',
          state:''
        })
      }

    }
  
  }

  const update_location_stats = async (latitude,longitude) => {
    const lat_lon = {
      latitude:latitude,
      longitude:longitude,
    }
    setCompData(lat_lon)

    const check_service_location = await check_if_service_location(lat_lon);
    if(check_service_location.status){
      setCompData({
        all_data_fetch:1,
        is_location_available:1,
        formatted_address:check_service_location.formatted_address,
        pincode:check_service_location.pincode
      })
    }else{
      setCompData({
        all_data_fetch:1,
        is_location_available:0,
        formatted_address:check_service_location.formatted_address,
        pincode:check_service_location.pincode
      })
    }
  }

  useEffect(() => {
    locationstatus();
  }, [])


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
                <i className="fa fa-map-marker mr-2"></i> {compData.city+' '+compData.formatted_address}
              </a>
              <div className="header-menu">
                <ul>
                  {
                   compData.locations.length?
                    (
                     compData.locations.map(({id,name})=>{
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

                    <NavCart />
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
         
          </div>
        </div>
      </div>
    </div>
    );
 
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Navbar);