import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { connect, useSelector, useDispatch } from 'react-redux'
import { updatecarts } from '../../redux/cart/cart.action';
import { add_cart, get_cart_items, remove_cart_item, you_may_like } from '../server/api';
import ProductCard from './ProductCard';


const ProductDetails = (props) =>  {
    const dispatch = useDispatch();
    const [compData,setCompData] = useState({
        qty:0
    })
    const [you_maylike,setYouMayLike] = useState([])

    const user = useSelector(state=>state.user.currentUser);
    const cart = useSelector(state=>state.cart);
    const {name,imageUrl,description,mrp,discount,selling_price,net_wt,unit,cartdata,id,is_cart,no_of_pieces}=props;


    const fetchOtherData = () => {
        you_may_like({
            not_id:id
        }).then((response)=>{
            if(response.status){
                setYouMayLike(response.data)
            }
        })
    }


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
        // console.log('reqdata',reqdata);
        if(new_qty===0){
            await remove_cart_item({
                 id:cartdata?cartdata.id:0,
             })
         }else{
             add_cart(reqdata)
         }
         await get_cart_items().then((rs)=>{
             if(rs.status){
                 dispatch(updatecarts(rs))
             }
         })
         setCompData({
            qty:new_qty
        })
    }

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
        fetchOtherData()

    }, [props])

  const handleChange = (e) => {
      e.preventDefault();
        updateCartQty(e.target.name)
    };

    
    const handleSubmit =async (e) => {
        e.preventDefault()
    };
    

        return (
            // <main className="main">

            <section className="py-4 osahan-main-body">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6">
                            <div className="recommend-slider mb-3">
                                <div className="osahan-slider-item">
                                    <img src={imageUrl} className="img-fluid mx-auto shadow-sm rounded" alt="Responsive" />
                                </div>
                            </div>
                            <div className="pd-f d-flex align-items-center mb-3">
                                {
                                     parseInt(compData.qty) ?''
                                     :
                                     <button type="button"  name="plus" onClick={handleChange} className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg"><i className="icofont-plus m-0 mr-2"></i> ADD TO CART</button>
                                }

                            </div>
                        </div>

                        {/* product details start */}
                        <div className="col-lg-6">
                            <div className="p-4 bg-white rounded shadow-sm">
                                <div className="pt-0">
                                    <div className="row">
                                        <div className="col-md-8 col-xs-8">
                                            <h2 className="font-weight-bold chi-cut">{name}</h2>
                                        </div>

                                        <div className="col-md-4 col-xs-4">
                                            <div className="chi-off">
                                                {/* <img src="assets/images/product-list.svg" /> */}
                                                {
                                                    discount ? <span className="badge badge-danger ml-2">{discount}% OFF</span> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <a href="review.html">
                                        <div className="rating-wrap d-flex align-items-center mt-1">
                                            <ul className="rating-stars list-unstyled">
                                                <li>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star text-warning"></i>
                                                </li>
                                            </ul>
                                            <p className="label-rating text-muted ml-2 small"> (245 Reviews)</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="pt-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="font-weight-bold m-0">Available in</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="bg-white">
                                        <div className="d-flex align-items-center">
                                            <div className="btn-group osahan-radio btn-group-toggle" data-toggle="buttons">
                                                <label className="btn btn-secondary active">
                                                    <input type="radio" name="options" id="option1" checked /> {net_wt} {unit}
                                                </label>
                                            </div>
                                            <div className="ml-auto" >
                                                <form id='myform' onSubmit={handleSubmit} className="cart-items-number d-flex" method='POST' >
                                                    <input type='button' name="minus" onClick={handleChange} value='-' className='qtyminus btn btn-success btn-sm' />
                                                    <input type='text'  name='qty' onClick={handleChange} value={compData.qty} className='qty form-control' />
                                                    <input type='button' name="plus" onClick={handleChange} value='+' className='qtyplus btn btn-success btn-sm'/>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <div className="bor-lin">
                                            <div className="row">
                                                <div className="col-md-6 col-6">
                                                    <p className="qun-pri">{no_of_pieces ? 'Pieces: '+no_of_pieces : ''} <br />Net Wt: {net_wt} {unit}</p>
                                                </div>

                                                <div className="col-md-6 col-6">
                                                    <div className="rat-pri">
                                                        { mrp>selling_price ? (
                                                                <>
                                                                 <h6 className="kg-pri">₹{selling_price}</h6><strike className="pri"> MRP₹{mrp}</strike>
                                                                </>
                                                            )
                                                            : 
                                                            (<h6 className="kg-pri">₹{selling_price}</h6>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="font-weight-bold mt-1">Product Details</p>
                                        <p className="text-muted small mb-0">{ReactHtmlParser(description)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* product details end */}

                    </div>
                    {
                        you_maylike.length ? 
                        <>
            
                            <h5 className="mt-1 mb-3">Maybe You Like this</h5>
                            <div className="row hidden-xs hidden-sm">
                                {
                                    you_maylike.map(({id,...otherData})=>{
                                        return <ProductCard column_not_cut={false} key={id} id={id} {...otherData} />
                                    })
                                }
                            </div>
                        </>
                        : ''
                    }
                </div>
            </section>
        // </main>
        );

}

export default connect()(ProductDetails);
