// import React, {Component} from 'react';
import axios from "axios";
const axiosinstance = axios.create();
const BASE_URL = "http://localhost:3030/api/";

// const get_session_token = () => {
//   return localStorage.getItem("accessToken");
// };

//request interceptor to add the auth token header to requests
axiosinstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
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
    return response;
  },
  function (error) {
    const originalRequest = error.config;
   
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 
    ) {

      originalRequest._retry = true;
      hitServerApi('regenerateToken',{refreshToken:refreshToken}).then(async (res) => {
          if (res.status) {
            axiosinstance.defaults.headers.common['authorization'] = res.data.token;
            localStorage.setItem("accessToken", res.data.token);
            await set_session(res);
            console.log("Access token refreshed!");
            return axiosinstance(originalRequest);
          }else{

          //  return <Redirect
          //   to={{
          //     pathname: "/login",
          //   }}
          // />
          }
        });
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
}


export const get_session =async (response) => {
 const token= localStorage.getItem("accessToken");
 const refreshToken= localStorage.getItem("refreshToken");
var data;
 const userdataget =await user_profile()
 if(userdataget.status){
  data = userdataget.data;

 }

 const obj = {
   status:token && userdataget ? true : false,
   token:token,
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
  return serverdata;
};


export const add_cart = async (data={}) => {
  const serverdata = await hitServerApi("add_cart", data);
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


