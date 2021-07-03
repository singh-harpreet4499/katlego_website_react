// import React, {Component} from 'react';
import axios from "axios";
import { redirectUnauthUser, setRedirectFalse } from "../../redux/redirect/redirect.action";
import store from '../../redux/store';
const moment = require('moment');
const axiosinstance = axios.create();
const BASE_URL = "http://localhost:3030/api/";
// const BASE_URL = "http://139.59.67.166:3030/api/";

// const get_session_token = () => {
//   return localStorage.getItem("accessToken");
// };

//request interceptor to add the auth token header to requests
axiosinstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const token_expiry = localStorage.getItem("token_expiry");
    // if (accessToken && token_expiry) {
    //   if(moment().isBefore(moment(token_expiry))){
    //     config.headers["authorization"] = accessToken;
    //   }else{
    //     // await hitServerApi('regenerateToken',{refreshToken:refreshToken}).then(async (res) => {
    //     //   if (res.status) {
    //     //     axiosinstance.defaults.headers.common['authorization'] = res.data.token;
    //     //     await set_session(res);
    //     //     console.log("Access token refreshed!in");
    //     //   }else{
    //     //     logout_user();
           
    //     //   }
    //     // });
    //   }
    // }else{
      
    // }

    if(accessToken){
      config.headers["authorization"] = accessToken;
    }
    return config;
  },
  (error) => {

    Promise.reject(error);
  }
);
//response interceptor to refresh token on receiving token expired error
axiosinstance.interceptors.response.use(
  (response) => {
    // console.log('response',response);
    if(response.data.message === "Unauthorized"){
      store.dispatch(redirectUnauthUser())
      store.dispatch(setRedirectFalse())

    }

    return response;
  },
  async function (error) {
    // debugger;
    const originalRequest = error.config;
    // console.log('originalRequest',originalRequest);

    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 
    ) {

      originalRequest._retry = true;
      await hitServerApi('regenerateToken',{refreshToken:refreshToken}).then(async (res) => {
          if (res.status) {
            axiosinstance.defaults.headers.common['authorization'] = res.data.token;
            // localStorage.setItem("accessToken", res.data.token);
            await set_session(res);
            console.log("Access token refreshed!");
            await axiosinstance(originalRequest);
          }else{
            store.dispatch(redirectUnauthUser())
      store.dispatch(setRedirectFalse())
          //  return <Redirect
          //   to={{
          //     pathname: "/login",
          //   }}
          // />
          }
        });
    }else{
      // console.log('sdfnfvnfnjfn');
      
    }
    return Promise.reject(error);
  }
);

export const hitServerApi = async (urlMethod, data={}, method = "post") => {
  const LOGIN_ENDPOINT = `${BASE_URL}${urlMethod}`;
  return new Promise(async (resolve, reject) => {
    await axiosinstance({
      method: method,
      url: LOGIN_ENDPOINT,
      // headers: {
      //   Authorization: get_session_token(),
      // },
      data: data,
    })
      .then((response) => resolve(response.data))
      .catch((e) => {
        const errorobj = {
          status: false,
          message: e.message,
        };
        reject(errorobj);
      });
  });
};

const encrpt_decrypt_salt = 'salt';

export const encrypt_string = (text) => {
  const salt = encrpt_decrypt_salt;

  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt_strring = (encoded) => {
  const salt = encrpt_decrypt_salt;

  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};


export const set_session =async (response) => {
    localStorage.setItem("accessToken", response.token);
    localStorage.setItem("data", response.data);
    localStorage.setItem("refreshToken", response.refreshtoken);
    localStorage.setItem("token_expiry", response.token_expiry);
}

export const logout_user = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("data");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token_expiry");
}


export const get_session =async (response) => {
 const token= localStorage.getItem("accessToken");
 const refreshToken= localStorage.getItem("refreshToken");
  var data;
  var userdataget;
  if(token){
    userdataget =await user_profile()
    if(userdataget.status){
      data = userdataget.data;
    }
  }
  const token_expiry =await localStorage.getItem("token_expiry");

 const obj = {
   status:token && userdataget ? true : false,
   token:token,
   token_expiry:token_expiry,
   data:data,
   refreshToken:refreshToken
 }

 return obj
}

export const user_signup_otp = async (data) => {
  const serverdata = await hitServerApi("user_signup_otp", data);
  return serverdata;
};

export const user_signup_verify = async (data) => {
  const serverdata = await hitServerApi("user_signup_verify", data);
  return serverdata;
};

export const user_login = async (data) => {
  const serverdata = await hitServerApi("user_login", data);
  return serverdata;
};



export const fetch_homepage_web = async (data) => {
    const serverdata = await hitServerApi("fetch_homepage_web", data);
    return serverdata;
  };

  
export const fetch_homepage_web_auth = async (data) => {
  const serverdata = await hitServerApi("fetch_homepage_web_auth", data);
  return serverdata;
};

export const fetch_location_by_id = async (data) => {
  const serverdata = await hitServerApi("fetch_location_by_id", data);
  return serverdata;
};
  

  
export const fetch_locations = async (data) => {
  const serverdata = await hitServerApi("fetch_locations", data);
  return serverdata;
};

export const check_if_service_location = async (data) => {
  const serverdata = await hitServerApi("check_if_service_location", data);
  return serverdata;
};


export const fetch_product_details = async (data) => {
  const serverdata = await hitServerApi("fetch_product_details", data);
  return serverdata;
};


export const fetch_products_by_category = async (data) => {
  const serverdata = await hitServerApi("fetch_products_by_category", data);
  return serverdata;
};


export const user_profile = async (data={}) => {
  const serverdata = await hitServerApi("user_profile", data);
  console.log('serverdata',serverdata);
  return serverdata;
};


export const add_cart = async (data={}) => {
  const serverdata = await hitServerApi("add_cart", data);
  // console.log('add crt',serverdata);
  return serverdata;
};



export const remove_cart_item = async (data={}) => {
  const serverdata = await hitServerApi("remove_cart_item", data);
  return serverdata;
};



export const get_cart_items = async (data={}) => {
  const serverdata = await hitServerApi("get_cart_items", data);
  return serverdata;
};


export const fetch_areas = async (data={}) => {
  const serverdata = await hitServerApi("fetch_areas", data);
  return serverdata;
};



export const fetch_showcase_category = async (data={}) => {
  const serverdata = await hitServerApi("fetch_showcase_category", data);
  return serverdata;
};

export const fetch_showcase_products = async (data={}) => {
  const serverdata = await hitServerApi("fetch_showcase_products", data);
  return serverdata;
};

export const edit_user_profile = async (data={}) => {
  const serverdata = await hitServerApi("edit_user_profile", data);
  return serverdata;
};


export const change_password_by_old_password = async (data={}) => {
  const serverdata = await hitServerApi("change_password_by_old_password", data);
  return serverdata;
};




