import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSelector, useDispatch } from "react-redux";
import { generate_order, get_cart_items, showAlertMessage } from '../server/api';
import { useHistory } from 'react-router-dom';
import { setOrderConf } from '../../redux/order/order.action';
import { updatecarts } from '../../redux/cart/cart.action';


const PaymentOption = (props) => {
    const orderconfg = useSelector(state=>state.orderConf)
    const history = useHistory();
     const dispatch = useDispatch()
    const genrate_order_res = async () => {
        // showAlertMessage('Success','Address added successfully',true,false)
        // alert(JSON.stringify(orderconfg))
        // if(!orderconfg.delivery_type){
        //     showAlertMessage('Oops!','Please select your delivery type!',false,true)
        // }
        // else if(orderconfg.delivery_type == 'schedule' && !orderconfg.schedule_date){
        //     showAlertMessage('Oops!','Please select your delivery date!',false,true)

        // }else if(!orderconfg.delivery_type == 'schedule' && !orderconfg.schedule_time){
        //     showAlertMessage('Oops!','Please select your delivery time!',false,true)

        // }

        if(!orderconfg.address_id){
            showAlertMessage('Oops!','Please select your delivery address!',false,true)
        }
        else{
            generate_order(orderconfg).then((rs)=>{
                // alert(JSON.stringify(rs))
                if(rs.status){
                    setOrderConf({
                        address_id:null,
                        payment_mode:null,
                        schedule_date:null,
                        schedule_time:null,
                        delivery_type:"now"
                    })
                     get_cart_items().then((rs)=>{
                        if(rs.status){
                            dispatch(updatecarts(rs))
                        }
                    })
                    history.replace('/orderSuccess')

                }else{
                    showAlertMessage('Oops!',rs.message,false,true)

                }
            })
            .catch((err)=>showAlertMessage('Oops!','Network error!',false,true))
        }
    }

    return (
        <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
            <div className="card-header bg-white border-0 p-0" id="headingthree">
                <h2 className="mb-0">
                    <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">
                    <span className="c-number">4</span> Delivery Type
                    </button>
                </h2>
            </div>

            <div id="collapsethree" className="collapse show" aria-labelledby="headingthree" data-parent="#accordionExample">
                <Tabs >
                    <TabList>
                        <Tab>Cash On Delivery</Tab>
                    </TabList>
                   
                    <TabPanel>
                        <div>
                        <div className="tab-pane ">
                            <div class="custom-control custom-checkbox pt-4">
                                <input type="checkbox" class="custom-control-input" id="customControlAutosizing" required />
                                <label class="custom-control-label" for="customControlAutosizing">
                                    <b>Cash</b><br />
                                    <p class="small text-muted m-0">Please keep exact change handy to help us serve you better</p>
                                </label>
                            </div>
                        </div>
                        <div className="pb-3" >
                        <input type="button" onClick={()=>genrate_order_res()} class="btn btn-success btn-lg btn-block mt-3 conti" value="Place Order" />
                        </div>
                        </div>
                      
                    </TabPanel>
                </Tabs>
            </div>
          
        </div>
    )
}

export default PaymentOption;