import defaultImage from '../../libs/images/demos/demo-2/banners/bg-1.png'
function Adds(props) {
    return (
        <div>
            <div className="mb-3"></div>

            <div className="container">
                <div className="offer-banner">
                    <img src={defaultImage}  alt={'adds'} />
                </div>
            </div>
        </div>
    );
}

export default Adds