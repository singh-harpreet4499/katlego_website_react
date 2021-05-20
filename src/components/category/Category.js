import { Link } from 'react-router-dom';
import defaultImage from '../../libs/images/1.png'

function Category(props) {
  return (
    <div className="category position-relative">
      <div className="category-image">
      <Link
            to={{
                pathname: "/product-list/"+props.name+"/"+(props.id),
                state:{...props}
            }}>
          <img src={props.imageUrl}  alt={props.name}/>
        </Link>
      </div>

      <div
        className="
        category-body
        letter-spacing-normal
        font-size-normal
        text-center
        position-absolute
        text-uppercase
        "
      >
        <Link
        className="category-title text-truncate font-weight-normal"
            to={{
                pathname: "/product-list/"+props.name+"/"+(props.id),
                state:{...props}
            }}>
       
          {props.name}
        </Link>
      </div>
    </div>
  );
}

export default Category;