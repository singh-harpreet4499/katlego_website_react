import Infomsg from "../components/app/Infomsg";
import { connect, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { add_cart, get_cart_items, remove_cart_item } from "../components/server/api";
import { updatecarts } from "../redux/cart/cart.action";
import { Link } from "react-router-dom"
import StickyPayout from "../components/cart/StickyPayout";
import FooterSupport from "../components/footer/FooterSupport";
import AddAddressModal from "../components/modals/AddAddressModal";


const CartItem = (props) => {
    const {name,id,cart_id,qty,cart_amount,discount,imageUrl,mrp,selling_price,net_wt,unit,hifen_name} = props;
    const dispatch = useDispatch()

    const [compData,setCompData] = useState({
        qty:qty
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
                id:cart_id,
            })
        }else{
           await add_cart(reqdata)
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


    const handleChange = (e) => {
        e.preventDefault();
        updateCartQty(e.target.name)
    };

    // useEffect(() => {
       
    // }, [props])

    return (
        <div className="osahan-cart">
            <div className="cart-items bg-white position-relative border-bottom">
                {/* <a href="product_details.html" className="position-absolute"> */}
                <Link to={{pathname: "/product-details/"+hifen_name+"/"+(id)}} className="position-absolute">
                    {
                        parseInt(discount)>0 ? <span className="badge badge-danger m-3">{discount}%</span>  : ''
                    }
                </Link>
                <div className="d-flex  align-items-center p-3">
                    <Link to={{pathname: "/product-details/"+hifen_name+"/"+(id)}}><img src={imageUrl} alt="x" className="img-fluid" /></Link>
                    <Link to={{pathname: "/product-details/"+hifen_name+"/"+(id)}}  className="ml-3 text-dark text-decoration-none w-100">
                        <h5 className="mb-1">{name})</h5>
                        <p className="text-muted mb-2"> {parseFloat(mrp) > parseFloat(selling_price) ? <del className="text-success mr-1">₹{mrp}{'/'}{net_wt+''+unit}</del> : ''}  ₹{selling_price}{'/'}{net_wt+''+unit}</p>
                        <div className="d-flex align-items-center">
                            <p className="total_price font-weight-bold m-0">₹{cart_amount}</p>
                            <form
                            id="myform"
                            onSubmit={handleSubmit}
                            className="cart-items-number d-flex ml-auto"
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
                    </Link>
                </div>
            </div>
        </div>
        )
}


const CartData = (props) => {
        const dispatch = useDispatch()
        const {items} = useSelector(state => state.cart)

    const [cartdata,setCartData] = useState([])
    const [showAddAddress,setAddAddress] = useState(0)

    const fetch_carts_data =async () => {
        await get_cart_items().then((rs)=>{
            if(rs.status){
                setCartData(rs.data)
                dispatch(updatecarts(rs))
            }
        })
    }


    useEffect(() => {
        fetch_carts_data();
    }, [])
    return (
        <div>
            {
                items.length ?
                (
                <section className="py-4 osahan-main-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="accordion" id="accordionExample">
                                    <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden">
                                        <div
                                            className="card-header bg-white border-0 p-0"
                                            id="headingOne"
                                        >
                                            <h2 className="mb-0">
                                            <button
                                                className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                <span className="c-number">1</span> Cart ({items.length} items)
                                            </button>
                                            </h2>
                                        </div>


                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                <div className="card-body p-0 border-top">
                                                    {
                                                        items.length ? 
                                                        items.map(({id,...otherdata})=><CartItem key={id} id={id} {...otherdata} />)
                                                        :''
                                                    }
                                                </div>
                                            </div>

                                    </div>



                                    {/* order address */}
                                    <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">

                                        <div className="card-header bg-white border-0 p-0" id="headingtwo">
                                            <h2 className="mb-0">
                                                <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                                <span className="c-number">2</span> Order Address <span onClick={()=>setAddAddress(1)} className="text-decoration-none text-success ml-auto" style={{cursor:"pointer"}}> <i className="icofont-plus-circle mr-1"></i>Add New Delivery Address</span>
                                                </button>
                                            </h2>
                                        </div>
                                        {
                                            showAddAddress ? <AddAddressModal show={true} /> : ''
                                        }

                                        

                                        <div id="collapsetwo" className="collapse show" aria-labelledby="headingtwo" data-parent="#accordionExample">
                                            <div className="card-body p-0 border-top">
                                                <div className="osahan-order_address">
                                                    <div className="p-3 row">
                                                        <div className="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio">
                                                            <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" checked />
                                                            <label className="custom-control-label w-100" for="customRadioInline1">
                                                                <div>
                                                                    <div className="p-3 bg-white rounded shadow-sm w-100">
                                                                        <div className="d-flex align-items-center mb-2">
                                                                            <p className="mb-0 h6">Home</p>
                                                                            <p className="mb-0 badge badge-success ml-auto"><i className="icofont-check-circled"></i> Default</p>
                                                                        </div>
                                                                        <p className="small text-muted m-0">1001 Veterans Blvd</p>
                                                                        <p className="small text-muted m-0">Redwood City, CA 94063</p>
                                                                        <p className="pt-2 m-0 text-right"><span className="small"><a href="#" data-toggle="modal" data-target="#exampleModal" className="text-decoration-none text-info">Edit</a></span></p>
                                                                    </div>
                                                                    <span className="btn btn-light border-top btn-lg btn-block">
                                                                        Deliver Here
                                                                    </span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <div className="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio">
                                                            <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" checked />
                                                            <label className="custom-control-label w-100" for="customRadioInline1">
                                                                <div>
                                                                    <div className="p-3 bg-white rounded shadow-sm w-100">
                                                                        <div className="d-flex align-items-center mb-2">
                                                                            <p className="mb-0 h6">Home</p>
                                                                            <p className="mb-0 badge badge-success ml-auto"><i className="icofont-check-circled"></i> Default</p>
                                                                        </div>
                                                                        <p className="small text-muted m-0">1001 Veterans Blvd</p>
                                                                        <p className="small text-muted m-0">Redwood City, CA 94063</p>
                                                                        <p className="pt-2 m-0 text-right"><span className="small"><a href="#" data-toggle="modal" data-target="#exampleModal" className="text-decoration-none text-info">Edit</a></span></p>
                                                                    </div>
                                                                    <span className="btn btn-light border-top btn-lg btn-block">
                                                                        Deliver Here
                                                                    </span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <a href="#" className="btn btn-success btn-lg btn-block mt-3 conti" type="button" data-toggle="collapse" data-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">Continue</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end order address */}

                                </div>
                            </div>
                            <StickyPayout />

                            

                        </div>
                    </div>
                </section>
                )
                :
                <Infomsg type="danger" message="No Items in your cart" />
            }
            
            <FooterSupport />
        </div>
    );
};

export default connect()(CartData);
