import { useSelector } from 'react-redux';
import defaultImage from '../../libs/gif/delivery-boy.gif'
function Adds(props) {
  const settings = useSelector((state) => state.global.settings);

  if(settings){
      return (
        <div>
            <div className="mb-3"></div>

            <div className="container">
                <div className="offer-banner">
                    <img src={settings.setting_path+settings.express_delivery_gif}  alt={'adds'} />
                </div>
            </div>
        </div>
      )
  }else{

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
}

export default Adds