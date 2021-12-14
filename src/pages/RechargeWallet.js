import { useEffect, useState } from 'react'
import { generate_order_req, recharge_user_wallet_web, showAlertMessage, wallet_plans } from '../components/server/api'
import defaultImage from '../libs/images/wallet.png'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';

const RechargeWallet = (props) => {
    // const {user_login} = props;
    const dispatch = useDispatch();
    const user_login = useSelector(state=>state.user.currentUser);

    const [plans,setPlans] = useState([])
    const [recharge_amount,setRechargeAmount] = useState(500)


    const handleChange = (e) => {
        setRechargeAmount(e.target.value.trim())
    };

    useEffect(() => {
        wallet_plans({}).then((rs)=>{
            if(rs.status){
                setPlans(rs.data)
            }
        })
    }, [])

    const set_recharge_amount = (amount) => {
        setRechargeAmount(parseFloat(amount))
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result =await generate_order_req({
            user_id:user_login.id,
            amount:recharge_amount
        })

        if (!result) {
            alert("Server error.");
            return;
        }


        // Getting the order details back
        const { amount, id: order_id, currency } = result;

        const options = {
            key: "rzp_test_RwSgFPpvHSua0O", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: user_login?user_login.name:'',
            description: "Recharge Wallet Payment",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    user_id:user_login.id,
                    recharge_amount:recharge_amount,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                // alert(JSON.stringify(data))
                const result = await recharge_user_wallet_web(data);
                console.log(result);
                if(result.status){
                    // alert(result.message)
                    dispatch(setCurrentUser({
                        ...user_login,wallet:result.data.update_wallet
                    }))
                    showAlertMessage('',result.message,true,false)
                }else{
                    // alert(result.message)
                    showAlertMessage('',result.message,false,true)

                }


            },
            prefill: {
                name:user_login?user_login.name:'',
                email: user_login?user_login.email:'',
                contact: user_login?user_login.phone:'',
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
        <div className="page-content pb-0">

            <div className="container">

                <div className="row">

                    <div class="col-md-7 col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <form action="#">
                                    <div class="info-widget">
                                        <h4 class="card-title">Enter Recharge Amount</h4>
                                        <div class="row">
                                            <div class="col-md-12 col-sm-12">
                                                <div class="form-group card-label">
                                                    <label>Amount</label>
                                                    <input class="form-control" value={recharge_amount}  onChange={handleChange} name="amount" defaultValue={recharge_amount} type="number" />
                                                </div>
                                            </div>

                                            <div class="col-lg-12">
                                                <div class="exist-customer mb-1">Choose from the list of recharge pack</div>
                                            </div>

                                            {
                                                plans ? plans.map((data)=>{

                                                   return (<div key={data.id} onClick={()=>set_recharge_amount(data.benefit)} class="col-lg-3 mb-3">
                                                                <button type="button" class={'btn btn-block btn-outline-warning price-add'} >₹ {data.amount}</button>
                                                            </div>)

                                                }) : ''
                                            }

                                        </div>

                                        <div class="submit-section mt-2">
                                            <button type="button" class="btn btn-primary con-pay" onClick={displayRazorpay}>Confirm and Pay</button>
                                        </div>
                               
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                     {/* Recharge Panel End */}


                    { /* Payable amount */ }

                    <div class="col-md-5 col-lg-4 theiaStickySidebar">
                        <div class="card booking-card">
                            <div class="card-body">
                                <div class="booking-doc-info">
                                    <div class="booking-doc-img">
                                        <img src={defaultImage} alt="User " />
                                    </div>
                                    <div class="booking-info">
                                        <h4><div class="wallet-font-1">Available Wallet Balance</div></h4>
                                        <div class="clinic-details">
                                            <h4 class="doc-location wallet-font"> ₹ {user_login?user_login.wallet:0}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card booking-card">
                            <div class="card-header">
                                <h4 class="card-title">Recharge Summary</h4>
                            </div>

                            <div class="card-body">
                                <div class="booking-summary">
                                    <div class="booking-item-wrap">
                                        <ul class="booking-fee">
                                            <li>Amount <span>₹ {recharge_amount}</span></li>
                                            <li>GST <span>₹ 0</span></li>
                                        </ul>
                                        <div class="booking-total">
                                            <ul class="booking-total-list">
                                                <li>
                                                    <span>Total  Payable</span>
                                                    <span class="total-cost">₹ {recharge_amount}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { /** Payable amount end */ }


                </div>
            </div>
        </div>
        </>
    )
}

export default RechargeWallet