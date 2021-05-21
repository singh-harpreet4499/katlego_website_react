import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { connect, useSelector, useDispatch } from 'react-redux'
import { updatecarts } from '../../redux/cart/cart.action';
import { add_cart, get_cart_items, remove_cart_item } from '../server/api';


const ProductDetails = (props) =>  {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.currentUser);
    const cart = useSelector(state=>state.cart);
    const {name,imageUrl,description,mrp,discount,selling_price,net_wt,unit,cartdata,id,is_cart}=props;


    const [compData,setCompData] = useState({
        qty:0
    })
    console.log('props',props);


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
        console.log('reqdata',reqdata);
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
        // console.log('ppppp',props);

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
                                {/* <div className="osahan-slider-item">
                                    <img src="img/recommend/r2.jpg" className="img-fluid mx-auto shadow-sm rounded" alt="Responsive image" />
                                </div>
                                <div className="osahan-slider-item">
                                    <img src="img/recommend/r3.jpg" className="img-fluid mx-auto shadow-sm rounded" alt="Responsive image" />
                                </div> */}
                            </div>
                            <div className="pd-f d-flex align-items-center mb-3">
                                {
                                     parseInt(compData.qty) ?''
                                            // <div className="ml-auto" >
                                            //     <form id='myform' onSubmit={handleSubmit} className="cart-items-number d-flex" method='POST' >
                                            //         <input type='button' name="minus" onClick={handleChange} value='-' className='qtyminus btn btn-success btn-sm' />
                                            //         <input type='text'  name='qty' onClick={handleChange} value={compData.qty} className='qty form-control' />
                                            //         <input type='button' name="plus" onClick={handleChange} value='+' className='qtyplus btn btn-success btn-sm'/>
                                            //     </form>
                                            // </div>
                                     :
                                     <button type="button"  name="plus" onClick={handleChange} className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg"><i className="icofont-plus m-0 mr-2"></i> ADD TO CART</button>
                                }
                                
                                {/* <a href="cart.html" className="btn btn-success p-3 rounded btn-block d-flex align-items-center justify-content-center btn-lg m-0"><i className="icofont-cart m-0 mr-2"></i> BUY NOW</a> */}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-4 bg-white rounded shadow-sm">
                                <div className="pt-0">
                                    <h2 className="font-weight-bold">{name}</h2>
                                    <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                        Product Price : <b className="h6 text-dark m-0">₹{selling_price}</b>
                                        {
                                            discount ? <span className="badge badge-danger ml-2">{discount}% OFF</span> : ''
                                        }
                                        
                                    </p>
                                    <a href="review.html">
                                        <div className="rating-wrap d-flex align-items-center mt-2">
                                            <ul className="rating-stars list-unstyled">
                                                <li>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star text-warning"></i>
                                                    <i className="icofont-star"></i>
                                                </li>
                                            </ul>
                                            <p className="label-rating text-muted ml-2 small"> (245 Reviews)</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="pt-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="font-weight-bold m-0">Delivery</p>
                                            <p className="text-muted m-0">Free</p>
                                        </div>
                                        <div className="col-6 text-right">
                                            <p className="font-weight-bold m-0">Available in:</p>
                                            <p className="text-muted m-0">{net_wt} {unit}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="pt-3 bg-white">
                                        <div className="d-flex align-items-center">
                                            <div className="btn-group osahan-radio btn-group-toggle" data-toggle="buttons">
                                        
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
                                        {/* <div className="input-group mb-3 border rounded shadow-sm overflow-hidden bg-white">
                                            <div className="input-group-prepend">
                                                <button className="border-0 btn btn-outline-secondary text-success bg-white"><i className="icofont-search"></i></button>
                                            </div>
                                            <input type="text" className="shadow-none border-0 form-control form-control-lg pl-0" placeholder="Type your city (e.g Chennai, Pune)" aria-label="" aria-describedby="basic-addon1" />
                                        </div> */}
                                        <p className="font-weight-bold mb-2">Product Details</p>
                                        <p className="text-muted small mb-0">{ReactHtmlParser(description)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        // </main>
        );

}

export default connect()(ProductDetails);