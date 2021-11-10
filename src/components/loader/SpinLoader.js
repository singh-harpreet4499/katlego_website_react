import Loader from "react-loader-spinner";
import { globaldata } from "../../AppConfig";
import './loader.css'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



const SpinLoader = () => {
    return (
        // <div
        // style={{textAlign:"center",padding:'20px'}}
        // >
        // <Loader
        //     type="TailSpin"
        //     color={globaldata.appcolor}
        //     />
        // </div>
        <div className="preloader" id="preloader" style={{opacity:0.5}}>
            <div className="loader">
                {/* <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg> */}
                {/* <img src={gifloader}  /> */}
                <Loader
            type="TailSpin"
            color={globaldata.appcolor}
            />
            </div>
        </div>
    )
}

export default SpinLoader