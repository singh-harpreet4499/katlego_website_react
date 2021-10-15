
import loaderimg from '../../libs/gif/food.gif'
import './loader.css'
import gifloader from '../../libs/gif/loader.gif';

const GifLoader = (props) => {

    return (
        <div className="preloader" id="preloader" style={{opacity:0.5}}>
            <div className="loader">
                {/* <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg> */}
                <img src={gifloader}  />
            </div>
        </div>
    )
}


// const Loader = (props) => {
    // return (
    //     <div className="preloader" id="preloader" style={{opacity:0.5}}>
    //         <div className="loader">
    //             <svg className="spinner" viewBox="0 0 50 50">
    //                 <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    //             </svg>
    //         </div>
    //     </div>
    // )
// }

// export default Loader

export default GifLoader