import { Link } from "react-router-dom"
import { get_cart_items, remove_cart_item } from "../server/api"

import { connect, useDispatch,useSelector } from 'react-redux'
import { updatecarts } from "../../redux/cart/cart.action";

import { v4 as uuidv4 } from 'uuid';
export const NavCartItem =  (props) => {
    const dispatch = useDispatch();
    const remove_cart = async (id) => {
        await remove_cart_item({
            id:id
        })
        await get_cart_items().then((rs)=>{
            if(rs.status){
                dispatch(updatecarts(rs))
            }
        })
    }

    return (
        <div className="product">
            <div className="product-cart-details">
            <h4 className="product-title">
                <Link 
                
                  to={{
                    key: uuidv4()+props.id,
                    pathname: "/product-details/"+props.hifen_name+"/"+(props.id),
                }}
                >{props.name}</Link>
            </h4>

            <span className="cart-product-info">
                <span className="cart-product-qty">{props.qty}</span>x
                ₹{props.selling_price}
            </span>
            </div>

            <figure className="product-image-container">
            <Link
             to={{
                key:  uuidv4()+props.name,

                pathname: "/product-details/"+props.hifen_name+"/"+(props.id),
                
             }}
            className="product-image">
                <img
                src={props.imageUrl}
                alt="product"
                />
            </Link>
            </figure>
            <button
            style={{cursor:'pointer'}}
            onClick={()=>remove_cart(props.cart_id)}
            value={(props.cart_id)}
            className="btn-remove"
            title="Remove Product"
            >
            <i  className="icon-close"></i>
            </button>
        </div>
    )
}


const NavCart = (props) => {

    const user = useSelector(state=>state.user.currentUser);
   


    return (
        <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-cart-products">
                   

                    {
                        props.cart.length ? 
                        props.cart.map((dt)=><NavCartItem {...dt} />)
                        :
                        ''
                    }

                </div>

                    <div className="dropdown-cart-total">
                        <span>Total</span>

                        <span className="cart-total-price">₹{props.total_amount}</span>
                    </div>

                    <div className="dropdown-cart-action">
                        <Link
                            to={{
                                pathname:'/checkout'
                            }}
                            className="btn btn-primary"
                        >
                        View Cart
                        </Link>
                        <Link
                            to={{
                                pathname:'/checkout'
                            }}
                            className="btn btn-outline-primary-2"
                        >
                            <span>Checkout</span>
                            <i className="icon-long-arrow-right"></i>
                        </Link>
                    </div>
            </div>
    )
}

export default connect()(NavCart)