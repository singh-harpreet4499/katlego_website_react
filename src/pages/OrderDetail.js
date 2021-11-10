import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router'
import SpinLoader from '../components/loader/SpinLoader'
import { cancel_order_user, my_order_history, order_details, showAlertMessage } from '../components/server/api'
import defaultImage from '../libs/images/chicken-gallery2.jpg'


const moment = require('moment')


const OrderDetail = (props) => {
    // debugger;
    const urlparamsdata = useParams()

    const [canmove,setCanMove] = useState(0);
    const [render,setRender] = useState(0)
    const [order,setOrder] = useState({});
    const {id,status,is_pickup,order_items,orderstatus,created_at,is_paid,txn_id,shipping_address_type,payable_amount,shipping_flat,shipping_landmark,shipping_location,shipping_pincode,subtotal,discount,delivery_charges} = order
    const [formData,updateFormData] = useState({
        cancel_reason:''

    })

    const order_details_data = async (order_id) => {
        await order_details({
            order_id:order_id
        })
        .then((od)=>{
            if(od.status){
                setOrder(od.data)
                
            }
            setCanMove(1)
        })
    }

    const cancel_order = async (id) => {
        cancel_order_user({
            order_id:id,
            cancel_reason:formData.cancel_reason
        })
        .then((rs)=>{
            if(rs.status){
                showAlertMessage('Success','Order cancelled successfully',true,false)
                setRender(1)

            }else{
                showAlertMessage('Error',rs.message,false,true)

            }
            updateFormData({
                cancel_reason:''
            })
            handleClose()
        })
    }


    useEffect(() => {
        order_details_data(urlparamsdata.id)
    }, [urlparamsdata,render])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };

    if(!canmove){

        return <SpinLoader />

    }else{
        return (
            <>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Order Cancellation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <textarea name="cancel_reason" onChange={handleChange}  className="form-control" placeholder="Cancellation Reason" ></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>cancel_order(id)}>
                        Cancel Order
                    </Button>
                    </Modal.Footer>
                </Modal>
            <main className="main">
                 
                <section className="py-4 osahan-main-body">
                    <div className="container">
                        <div className="row">
                            <div class="col-md-12">
                                <section class="bg-white osahan-main-body rounded shadow-sm overflow-hidden">
                                    <div class="container-0">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="osahan-status">
                                                    <div class="p-3 status-order bg-white border-bottom d-flex align-items-center">
                                                        <p class="m-0"><i class="icofont-ui-calendar"></i> {moment(created_at).format('DD-MMMM-YY hh:mm A')}</p>
                                                        {/* <div class="ratings ml-auto rat-sta">
                                                            <div class="ratings-val rat-sta" style={{
                                                                width:'100%'
                                                            }}></div>
                                                        </div> */}
                                                        {/* <a href="review.html" class="text-success text-decoration-none">Order ID #{id}</a> */}
                                                        {/* <p class="text-success text-decoration-none" style={{float:'right'}}>Order ID #{id}</p> */}
                                                    </div>
                                                </div>
    
                                                <div class="p-3 border-bottom">
                                                    <h6 class="font-weight-bold">Order Status</h6>
                                                    <div class="tracking-wrap">
                                                        <div class="my-1 step active">
                                                            <span class="icon text-success"><i class={(status>=0 && status < 3) ? "icofont-check success-check"  : "icofont-check"}></i></span>
                                                            <span class="text small">Preparing order</span>
                                                        </div>
    
                                                        <div class="my-1 step active">
                                                            <span class="icon text-success"><i class={((status>=1  && status < 3)) ? "icofont-check success-check"  : "icofont-check"}></i></span>
                                                            <span class="text small"> Ready to collect</span>
                                                        </div>
    
                                                        <div class="my-1 step">
                                                            <span class="icon text-success"><i class={((status>=1  && status < 3) && is_pickup===1) ? "icofont-check success-check"  : "icofont-check"}></i></span>
                                                            <span class="text small"> On the way </span>
                                                        </div>
    
                                                        <div class="my-1 step">
                                                            <span class="icon text-success"><i class={((status==2)) ? "icofont-check success-check"  : "icofont-check"}></i></span>
                                                            <span class="text small">Delivered Order</span>
                                                        </div>
    
                                                    </div>
                                                </div>
    
                                                <div class="p-3 border-bottom bg-white">
                                                    <h6 class="font-weight-bold">Destination ({shipping_address_type.toUpperCase()})</h6>
                                                    <p class="m-0 small">{' '+shipping_flat+' '+shipping_landmark+' '+shipping_location+' '+shipping_pincode}</p>
                                                </div>
                                                <div class="p-3 border-bottom">
                                                    <p class="font-weight-bold small mb-1">Items (Order ID : #{id})</p>

                                                    {/* <div class="img-fluid sc-osahan-logo mr-2"> <span class="small text-success font-weight-bold">Grocery Courier
                                                        </span>
                                                    </div> */}
                                                        {
                                                            order_items.length &&
                                                        order_items.map((dt)=>{
                                                            return (
                                                            <div class="d-flex order-img mb-2">
                                                                <img src={dt.product_image ? dt.product_image : defaultImage} alt="imaged" />
                                                                <p class="chicken-detail"> {dt.product_name}<br /> 
                                                                <span class="text-dark">Qty:{dt.qty}</span><br/>
                                                                <span class="text-dark">₹{dt.price}</span>
                                                                </p>
                                                            </div>
                                                            )
                                                        })
                                                    }
                                                </div>
    
    
                                                <div class="p-3 bg-white">
                                                {/* <p class="text-muted m-0 ml-auto">Subtotal<br/>
                                <span class="text-dark font-weight-bold">₹{subtotal}</span>
                            </p>
                            <p class="text-muted m-0 ml-auto">Discount<br/>
                                <span class="text-dark font-weight-bold">₹{discount}</span>
                            </p>
                            <p class="text-muted m-0 ml-auto">Delivery Charges<br/>
                                <span class="text-dark font-weight-bold">₹{delivery_charges}</span>


                            </p> */}
                                                    <div class="d-flex align-items-center mb-2">
                                                        <h6 class="font-weight-bold mb-1">Subtotal</h6>
                                                        <h6 class="font-weight-bold ml-auto mb-1">₹{subtotal}</h6>
                                                    </div>
                                                    <div class="d-flex align-items-center mb-2">
                                                        <h6 class="font-weight-bold mb-1">Discount</h6>
                                                        <h6 class="font-weight-bold ml-auto mb-1">₹{discount}</h6>
                                                    </div>
                                                    <div class="d-flex align-items-center mb-2">
                                                        <h6 class="font-weight-bold mb-1">Delivert Charges</h6>
                                                        <h6 class="font-weight-bold ml-auto mb-1">₹{delivery_charges}</h6>
                                                    </div>
                                                    <div class="d-flex align-items-center mb-2">
                                                        <h6 class="font-weight-bold mb-1">Total Cost</h6>
                                                        <h6 class="font-weight-bold ml-auto mb-1">₹{payable_amount}</h6>
                                                    </div>
                                                    <p class="m-0 small text-muted">You can check your order detail here,<br />Thank you for order.</p>
                                                </div>

                                                {
                                                    ((status==0 || status==1 ) && is_pickup==0) ? 

                                                    <div style={{
                                                        textAlign:'center'
                                                    }}>
                                                        <button onClick={handleShow} className="btn btn-primary mb-2">Cancel Order</button>
                                                    </div>



                                                    :''
                                                }
    
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            </>
                                                   
                            )
    }
   
}

export default OrderDetail