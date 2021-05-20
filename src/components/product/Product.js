import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../libs/images/demos/demo-2/products/product-5-1.jpg';
import { connect, useSelector, useDispatch } from 'react-redux'
import {add_cart, remove_cart_item,get_cart_items} from '../server/api'
import { updatecarts } from '../../redux/cart/cart.action';

const Product =(props) => {
    const {name,imageUrl,mrp,discount,selling_price,hifen_name,id,is_cart,cartdata}=props
    const dispatch = useDispatch();

    const user = useSelector(state=>state.user.currentUser);

    const [compData,setCompData] = useState({
        qty:0
    })

    const handleSubmit =async (e) => {
        e.preventDefault()
    };

    const updateCartQty = async (logic) => {
        var old_qty =parseInt(compData.qty);
        var new_qty=old_qty;
        if(logic==='plus'){

            new_qty = old_qty+1;
        }else if(logic==='minus'){
            new_qty = old_qty-1;
            if(new_qty<0){new_qty=0;}
        }
        const reqdata = {
            product_id:id,
            qty:new_qty
        }
        if(new_qty===0){
           await remove_cart_item({
                id:cartdata?cartdata.id:0,
            })

            get_cart_items().then((rs)=>{
                if(rs.status){
                    dispatch(updatecarts(rs.data))
                }
            })
        }else{
            add_cart(reqdata)
        }

        setCompData({
            qty:new_qty
        })
        get_cart_items().then((rs)=>{
            if(rs.status){
                dispatch(updatecarts(rs.data))
            }
        })

    }


    const handleChange = (e) => {
        e.preventDefault();
        updateCartQty(e.target.name)
    };

    useEffect(() => {
        if(props.is_cart){
            setCompData({
                qty:props.cartdata.qty
            })
        }else{
            setCompData({
                qty:0
            })
        }
        // console.log('ppppp',props);

    }, [])


    return (
        <div className={props.column_not_cut ? '' : 'col-6 col-md-3 col-lg-3'}>
            <div className="product product-11 text-center">
                <figure className="product-media">
                    <span className="product-label label-circle label-new best-bu">
                    Best Buy
                    </span>
                    <a href="product_details.html">
                    <Link
                                            to={{
                                                pathname: "/product-details/"+hifen_name+"/"+(id),
                                            }}>
                    <img
                        src={imageUrl?imageUrl:defaultImage}
                        alt="Product"
                        className="product-image"
                    />
                    </Link>
                    </a>

                    <div className="product-action-vertical">
                    <div  className="btn-product-icon btn-wishlist">
                        <span>add to wishlist</span>
                    </div>
                    </div>
                </figure>

                <div className="product-body">
                    <div className="product-cat"></div>
                    <h3 className="product-title">
                    <Link
                                            to={{
                                                pathname: "/product-details/"+hifen_name+"/"+(id),
                                            }}>{name ? name : ''}</Link>
                    </h3>
                    <div className="product-price">
                        {
                            mrp>selling_price ? (
                                <>
                                <span className="new-price">₹{selling_price}</span>
                                <span className="old-price">Was ₹{mrp}</span>
                                </>
                            )
                            : 
                            (<span className="new-price">₹{selling_price}</span>)
                        }
                   
                    </div>
                </div>
                <div className="product-action">
                    {
                        parseInt(compData.qty) ?
                        <div className="m-auto">
                            <form
                            id="myform"
                            onSubmit={handleSubmit}
                            className="cart-items-number d-flex"
                            method="POST"
                            >
                            <input
                                type="button"
                                name="minus"
                                onClick={handleChange}
                                value="-"
                                className="qtyminus btn btn-success btn-sm"
                                readOnly
                            />
                            <input
                                type="text"
                                name="qty"
                                onClick={handleChange}
                                value={compData.qty}
                                className="qty form-control"
                                readOnly
                            />
                            <input
                                type="button"
                                name="plus"
                                onClick={handleChange}
                                value="+"
                                className="qtyplus btn btn-success btn-sm"
                                readOnly
                            />
                            </form>
                        </div>
                        :
                        // .product.product-11 .btn-product span {
                        //     font-size: 1.4rem;
                        // }
                        
                        // .btn-product span {
                            // color: #666666;
                            // font-weight: 400;
                            // font-size: 1.3rem;
                            // letter-spacing: -.01em;
                            // transition: all .35s ease;
                        // }
                        <button name="plus" value="1" onClick={handleChange} className="btn-product btn-cart hsbutonhover">
                            add to cart
                        </button>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default connect()(Product);
