import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './redux/store';


import './libs/vendor/line-awesome/line-awesome/line-awesome/css/line-awesome.min.css'
import './libs/css/bootstrap.min.css'


import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './libs/css/plugins/jquery.countdown.css'
import './libs/css/style.css'
import './libs/css2/style.css'

import './libs/css/plugins/owl-carousel/owl.carousel.css'

import './libs/css/plugins/magnific-popup/magnific-popup.css';

import './libs/css/demos/demo-2.css';

import "./libs/vendor/icons/icofont.min.css";

import './libs/css/demos/demo-26.css'

// import "./libs/vendor/sidebar/demo.css";
// import "./libs/vendor/icons/icofont.min.css";
// import "./libs/vendor/slick/slick.min.css"
// import "./libs/vendor/slick/slick-theme.min.css";

import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// basename={'/'}

ReactDOM.render(
  <React.StrictMode>
     <Provider  store={store} >
    <BrowserRouter >
    <ScrollToTop>
    <App />
    </ScrollToTop>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
