import defaultImage from '../../libs/gif/delivery-boy.gif'
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