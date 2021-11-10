import Infomsg from "../components/app/Infomsg";
import { connect, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { add_cart, delete_address, fetch_addresses, fetch_locations, get_cart_items, remove_cart_item, showAlertMessage } from "../components/server/api";
import { updatecarts } from "../redux/cart/cart.action";
import { Link } from "react-router-dom"
import StickyPayout from "../components/cart/StickyPayout";
import FooterSupport from "../components/footer/FooterSupport";
import AddAddressModal from "../components/modals/AddAddressModal";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { setUserAddressList } from "../redux/user/user.action";
import DeliveryConfig from "../components/timeslot/DeliveryConfig";
import PaymentOption from "../components/payment/PaymentOption";
import { setOrderConf } from "../redux/order/order.action";


// .border-custom-radio .custom-control-input:checked~.custom-control-label:before {
//     border: 2px solid red!important;
// }

// .border-custom-radio .custom-control-input:checked~.custom-control-label:before {
//     border: 2px solid #28a744!important;
// }

const AddressItem = (props) => {
    const {address_type,location,city,state,id} = props;
    const dispatch = useDispatch();
    const orderConfd = useSelector(state=>state.orderConf)


    const select_shipping_location = (location_id) => {

        dispatch(setOrderConf({
            ...orderConfd,
            address_id:location_id
        }))
    }
    

    const delete_add = ()=>{
        delete_address({id:id}).then((dt)=>{
            showAlertMessage('Success','Address removed successfully',true,false)
                 fetch_addresses({
                     location_id:props.location_id
                 }).then((rs)=>{
                    if(rs.status){
                       dispatch(setUserAddressList(rs.data))
                    }
                })
                // if(orderConfd.address_id==id){
                //     dispatch(setOrderConf({
                //         ...orderConfd,
                //         address_id:0
                //     }))
                // }
                
        })
    }


    useEffect(() => {
        // dispatch(setOrderConf({
        //     ...orderConfd,
        //     address_id:id
        // }))
    }, [orderConfd])


    return (
        <div style={{cursor:"pointer"}} className="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio"  onClick={()=>select_shipping_location(id)} >
            <input type="radio" id={'customRadioInline1'+id} name={'customRadioInline1'+id} className="custom-control-input"  />
            <label className="custom-control-label w-100" htmlFor={'customRadioInline1'+id}>
                {/* <div> */}
                    <div className="p-3 bg-white rounded shadow-sm w-100" >
                        <div className="d-flex align-items-center mb-2">
                            <p className="mb-0 h6">{address_type.toUpperCase()}</p>
                            {/* <p className="mb-0 badge badge-success ml-auto">{props.is_default===1 ? <><i className="icofont-check-circled"></i> Default</> :'' }</p> */}
                            <p className="mb-0 badge badge-success ml-auto">{orderConfd.address_id===id ? <><i className="icofont-check-circled"></i> Selected</> :'' }</p>
                        </div>
                        <p className="small text-muted m-0">{props.flat}</p>
                        <p className="small text-muted m-0">{props.main_society + ' '+ props.main_location}</p>
                        <p className="pt-2 m-0 text-right"><span className="small"><span style={{cursor:"pointer"}} onClick={delete_add}  className="text-decoration-none text-info">Delete</span></span></p>
                    </div>
                    <button className="btn btn-light border-top btn-lg btn-block"  onClick={()=>select_shipping_location(id)}>
                        Deliver Here
                    </button>
                {/* </div> */}
            </label>
        </div>
    );
}

const CartItem = (props) => {
    const {name,id,cart_id,qty,cart_amount,discount,imageUrl,mrp,selling_price,net_wt,unit,hifen_name,stock} = props;
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

            if(new_qty > stock){
                alert('Out of stock!')
            }else{
                await add_cart(reqdata)

                setCompData({
                    qty:new_qty
                })
            }
           
        }
        await get_cart_items().then((rs)=>{
            if(rs.status){
                dispatch(updatecarts(rs))
            }
        })

        
    }


    const handleChange = (e) => {
        e.preventDefault();
        updateCartQty(e.target.name)
    };

    useEffect(() => {
        if(stock == 0){
             remove_cart_item({
                id:cart_id,
            })
             get_cart_items().then((rs)=>{
                if(rs.status){
                    dispatch(updatecarts(rs))
                }
            })
        }
       
    }, [props])

    return (
        <div className="osahan-cart">
            <div className="cart-items bg-white position-relative border-bottom">
                <Link to={{pathname: "/product-details/"+hifen_name+"/"+(id)}} className="position-absolute">
                    {
                        parseInt(discount)>0 ? <span className="badge badge-danger m-3">{discount}%</span>  : ''
                    }
                </Link>
                <div className="d-flex  align-items-center p-3">
                    <Link to={{pathname: "/product-details/"+hifen_name+"/"+(id)}}><img src={imageUrl} alt="x" className="img-fluid" /></Link>
                    <Link to={{pathname: "/product-details/"+hifen_name+"/"+(id)}}  className="ml-3 text-dark text-decoration-none w-100">
                        <h5 className="mb-1">{name}</h5>
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
    const address_selected = useSelector(state=>state.user.location);
    // var location_id = 0
    // if(address_selected){
    //     location_id = address_selected.address_id;
    // }
    const user = useSelector(state=>state.user.currentUser);

    const orderconfg = useSelector(state=>state.orderConf)

    const [locations,setLocations] = useState([]);

    const setselectedLocation =async () => {
        const locationapi = await fetch_locations({});
        if (locationapi.status) {
            setLocations(locationapi.data)
        }
    }

    // debugger;
    const address_list = useSelector(state => state.user.address_list)

    // const 
    // const address_list = useSelector(state => state.user.address_list)

    // const select_address = 

    const fetch_carts_data =async () => {
        await get_cart_items().then((rs)=>{
            if(rs.status){
                dispatch(updatecarts(rs))
                if(rs.data.length === 0){
                    showAlertMessage('','No Items in your Cart',false,true)
                }
            }
        })
    }

    const fetch_address =async () => {
        await fetch_addresses({
            location_id:address_selected?address_selected.address_id:0,
        }).then((rs)=>{
            if(rs.status){
               dispatch(setUserAddressList(rs.data))
            }
        })
    }

    useEffect(() => {
        dispatch(setOrderConf({
            ...orderconfg,
            payment_mode: user.cod == 1 ? 'cod' : 'wallet',
            delivery_type:'now',
        }))
    }, [])

    


    useEffect(() => {
        fetch_carts_data();
        fetch_address();
        setselectedLocation();
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

                                        {/* <div className="card-header bg-white border-0 p-0" id="headingtwo">
                                            <h2 className="mb-0">
                                                <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                                <span className="c-number">2</span> Order Address <span onClick={toggleModal} className="text-decoration-none text-success ml-auto" style={{cursor:"pointer"}}> <i className="icofont-plus-circle mr-1"></i>Add New Delivery Address</span>
                                                </button>
                                            </h2>
                                        </div> */}

                                        <AddAddressModal  locations={locations}  location_id ={ address_selected ? address_selected.address_id : 0} /> 



                                        <div id="collapsetwo" className="collapse show" aria-labelledby="headingtwo" data-parent="#accordionExample">
                                            <div className="card-body p-0 border-top">
                                                <div className="osahan-order_address">
                                                    <div className="p-3 row">
                                                        {
                                                            address_list.length>0?
                                                            address_list.map((data)=><AddressItem  style={{cursor:'pointer'}} {...data} location_id={address_selected?address_selected.address_id:0} />)
                                                            : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <DeliveryConfig />
                                    <PaymentOption user={user} />
                                    {/* end order address */}

                                </div>
                            </div>
                            <StickyPayout />

                        </div>
                    </div>
                </section>
                )
                :
                ''
                // <Infomsg type="danger" message="No Items in your cart" />
            }
            
            <FooterSupport />
        </div>
    );
};

export default connect()(CartData);
