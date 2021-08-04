
import loaderimg from '../../libs/gif/food.gif'
import './loader.css'

const GifLoader = (props) => {

    return (
        <div id="loadingDiv" style={{textAlign:'center'}}>
            {/* <img src={loaderimg} alt="loading..." style={{
                 width: '120px',
                 height: 'auto'
            }} /> */}
        </div>
    )
}

export default GifLoader