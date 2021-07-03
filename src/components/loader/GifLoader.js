
import loaderimg from '../../libs/images/loader.gif'


const GifLoader = (props) => {

    return (
        <div style={{textAlign:'center'}}>
            <img src={loaderimg} alt="loading..." style={{
                 width: '120px',
                 height: 'auto'
            }} />
        </div>
    )
}

export default GifLoader