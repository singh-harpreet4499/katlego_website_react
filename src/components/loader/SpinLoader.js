import Loader from "react-loader-spinner";
import { globaldata } from "../../AppConfig";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const SpinLoader = () => {
    return (
        <div
        style={{textAlign:"center",padding:'20px'}}
        >
        <Loader
            type="TailSpin"
            color={globaldata.appcolor}
            />
        </div>
    )
}

export default SpinLoader