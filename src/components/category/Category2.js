import defaultImage1 from "../../libs/images/banners/3cols/banner-1.jpg";
import defaultImage2 from "../../libs/images/banners/3cols/banner-2.jpg";
import defaultImage3 from "../../libs/images/banners/3cols/banner-3.jpg";
import defaultImage4 from "../../libs/images/banners/3cols/banner-4.jpg";
import defaultImage5 from "../../libs/images/banners/3cols/banner-5.jpg";
import defaultImage6 from "../../libs/images/banners/3cols/banner-6.jpg";

function Category2(props) {
  var defaultImage = defaultImage1;
  switch (props.defaultImage) {
    case 1:
      defaultImage = defaultImage1;
      break;

    case 2:
      defaultImage = defaultImage2;
      break;

    case 3:
      defaultImage = defaultImage3;
      break;

    case 4:
      defaultImage = defaultImage4;
      break;

    case 5:
      defaultImage = defaultImage5;
      break;

    case 6:
      defaultImage = defaultImage6;
      break;

    default:
      defaultImage = defaultImage1;

      break;
  }

  return (
    <div className="col-md-6 col-lg-4">
      <div className="banner">
        <a href="/">
          <img src={defaultImage} alt="Banner" />
        </a>
        <div className="banner-content">
          <h4 className="banner-subtitle">10% off on all chicken</h4>
          <h3 className="banner-title">
            Raw <br />
            Chicken
          </h3>
          <a href="/" className="banner-link">
            Explore Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Category2;
