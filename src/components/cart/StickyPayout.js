import { useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../../libs/images/logo1.png"
const StickyPayout = (props) => {
    const cartdata = useSelector(state => state.cart);

    useEffect(() => {
        // debugger;
        // console.log('====================================');
        // console.log('cartdata',cartdata);
        // console.log('====================================');
        // debugger;
        return () => {
        }
    }, [])

    return (
        <div className="col-lg-4">
            <div className="sticky_sidebar">
                <div className="bg-white rounded overflow-hidden shadow-sm mb-3 checkout-sidebar">
                    <div className="d-flex align-items-center osahan-cart-item-profile border-bottom bg-white p-3">
                        <img
                            alt="katlego"
                            src={logo}
                            className="mr-3 img-fluid"
                        />
                    </div>
                    <div>
                        <div className="bg-white p-3 clearfix">
                            <p className="font-weight-bold small mb-2">Bill Details</p>
                            <p className="mb-1">
                            Item Total <span className="small text-muted">({cartdata.items.length} item)</span>
                            <span className="float-right text-dark">₹{cartdata.total_amount}</span>
                            </p>
                            <p className="mb-1">
                            Store Charges{" "}
                            <span className="float-right text-dark">₹0</span>
                            </p>
                            <p className="mb-3">
                            Delivery Fee{" "}
                                <span
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delivery partner fee - $3"
                                    className="text-info ml-1"
                                >
                                    <i className="icofont-info-circle"></i>
                                </span>
                                <span className="float-right text-dark">₹0</span>
                            </p>
                            <h6 className="mb-0 text-success">
                                Total Discount
                                <span className="float-right text-success">₹0</span>
                            </h6>
                        </div>
                        <div className="p-3 border-top">
                            <h5 className="mb-0">
                            TO PAY <span className="float-right text-danger">₹{cartdata.total_amount}</span>
                            </h5>
                        </div>
                    </div>
                </div>
                <p className="text-success text-center">
                    Your Total Savings on this order ₹0
                </p>
            </div>
        </div>
    );
};

    export default StickyPayout;
