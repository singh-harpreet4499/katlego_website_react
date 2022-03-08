import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector, useDispatch } from "react-redux";
import {
  generate_order,
  generate_order_req,
  get_cart_items,
  get_session,
  showAlertMessage,
} from "../server/api";
import { useHistory } from "react-router-dom";
import { setOrderConf } from "../../redux/order/order.action";
import { updatecarts } from "../../redux/cart/cart.action";
import { stringify } from "uuid";
import { useEffect } from "react";
import { setCurrentUser } from "../../redux/user/user.action";

const PaymentOption = (props) => {
  const user = props.user;
  const user_login = user;
  const cartdata = useSelector((state) => state.cart);
  const orderconfg = useSelector((state) => state.orderConf);
  const settings = useSelector((state) => state.global.settings);

  const history = useHistory();
  const dispatch = useDispatch();

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
  };

  const displayRazorpay = async (recharge_amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await generate_order_req({
      user_id: user_login.id,
      amount: recharge_amount,
    });

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
      name: user_login ? user_login.name : "",
      description: "Order Payment #" + order_id,
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          user_id: user_login.id,
          recharge_amount: recharge_amount,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        generate_order({ ...orderconfg, txn_id: response.razorpay_payment_id })
          .then((rs) => {
            if (rs.status) {
              setOrderConf({
                address_id: null,
                payment_mode: null,
                schedule_date: null,
                schedule_time: null,
                delivery_type: null,
              });
              get_cart_items().then((rs) => {
                if (rs.status) {
                  dispatch(updatecarts(rs));
                }
              });
              history.replace("/orderSuccess");
            } else {
              showAlertMessage("Oops!", rs.message, false, true);
            }
          })
          .catch((err) =>
            showAlertMessage("Oops!", "Network error!", false, true)
          );
      },
      prefill: {
        name: user_login ? user_login.name : "",
        email: user_login ? user_login.email : "",
        contact: user_login ? user_login.phone : "",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const genrate_order_res = async () => {
    // alert(JSON.stringify(orderconfg))
    const session = await get_session();
    if (session.status) {
      dispatch(
        setCurrentUser(session.data, session.token, session.refreshToken)
      );
      if (!orderconfg.address_id) {
        showAlertMessage(
          "Oops!",
          "Please select your delivery address!",
          false,
          true
        );
      } else if (!orderconfg.delivery_type) {
        showAlertMessage("Oops!", "Please select delivery mode!", false, true);
      } else if (
        orderconfg.delivery_type === "schedule" &&
        !orderconfg.schedule_date
      ) {
        showAlertMessage("Oops!", "Please select schedule date!", false, true);
      } else if (
        orderconfg.delivery_type === "schedule" &&
        !orderconfg.schedule_time
      ) {
        showAlertMessage("Oops!", "Please select schedule time!", false, true);
      } else if (!orderconfg.payment_mode) {
        showAlertMessage("Oops!", "Please select payment mode!", false, true);
      } else if (orderconfg.payment_mode === "cod" && user.cod !== 1) {
        showAlertMessage(
          "Oops!",
          "Your COD mode is disabled from admin! Please contact to support",
          false,
          true
        );
      } else if (
        orderconfg.payment_mode === "wallet" &&
        user.wallet < cartdata.total_amount
      ) {
        history.replace("/recharge-wallet");
      } else if (orderconfg.payment_mode === "online") {
        return displayRazorpay(cartdata.total_amount);
      } else {
        // alert(stringify(orderconfg));
        // return;
        generate_order(orderconfg)
          .then(async (rs) => {
            if (rs.status) {
              setOrderConf({
                address_id: null,
                payment_mode: null,
                schedule_date: null,
                schedule_time: null,
                delivery_type: null,
              });
              get_cart_items().then((rs) => {
                if (rs.status) {
                  dispatch(updatecarts(rs));
                }
              });

              const session = await get_session();

              dispatch(
                setCurrentUser(
                  session.data,
                  session.token,
                  session.refreshToken
                )
              );
              history.replace("/orderSuccess");
            } else {
              showAlertMessage("Oops!", rs.message, false, true);
            }
          })
          .catch((err) =>
            showAlertMessage("Oops!", "Network error!", false, true)
          );
      }
    } else {
      alert("Your login session is expired! Please login first!");
      history.push("/login");
    }
  };

  const set_payment_mode = (index) => {
    // alert(index)
    if (
      !(
        parseFloat(cartdata ? cartdata.total_amount : 0) <
        parseFloat(settings ? settings.cod_setup : 0)
      )
    ) {
      if (index == 0) {
        dispatch(
          setOrderConf({
            ...orderconfg,
            payment_mode: "wallet",
          })
        );
      } else if (index == 1) {
        dispatch(
          setOrderConf({
            ...orderconfg,
            payment_mode: "online",
          })
        );
      }
    } else {
      if (index == 0) {
        dispatch(
          setOrderConf({
            ...orderconfg,
            payment_mode: "cod",
          })
        );
      } else if (index == 1) {
        dispatch(
          setOrderConf({
            ...orderconfg,
            payment_mode: "wallet",
          })
        );
      } else if (index == 2) {
        dispatch(
          setOrderConf({
            ...orderconfg,
            payment_mode: "online",
          })
        );
      }
    }

    // alert(JSON.stringify(orderconfg))
  };

  useEffect(() => {
    if (
      !(
        parseFloat(cartdata ? cartdata.total_amount : 0) <
        parseFloat(settings ? settings.cod_setup : 0)
      )
    ) {
      dispatch(
        setOrderConf({
          ...orderconfg,
          payment_mode: "wallet",
        })
      );
    }
  }, [cartdata]);

  //   .delierybutton {
  //     background-color: #28a745;
  //     color: #fff !important;
  // }

  return (
    <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
      <div className="card-header bg-white border-0 p-0" id="headingthree">
        <h2 className="mb-0">
          <button
            className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
            type="button"
            data-toggle="collapse"
            data-target="#collapsethree"
            aria-expanded="true"
            aria-controls="collapsethree"
          >
            <span className="c-number">4</span> Payment Option
          </button>
        </h2>
      </div>

      <div
        id="collapsethree"
        className="collapse show"
        aria-labelledby="headingthree"
        data-parent="#accordionExample"
      >
        <Tabs onSelect={(index) => set_payment_mode(index)}>
          <TabList>
            {user.cod == 1 &&
            parseFloat(cartdata ? cartdata.total_amount : 0) <
              parseFloat(settings ? settings.cod_setup : 0) ? (
              <Tab>Cash On Delivery</Tab>
            ) : (
              ""
            )}
            <Tab>Wallet</Tab>
            <Tab>Credit/Debit Card/Net Banking</Tab>
          </TabList>

          <TabPanel>
            <div>
              <div className="tab-pane ">
                {!(
                  parseFloat(cartdata ? cartdata.total_amount : 0) <
                  parseFloat(settings ? settings.cod_setup : 0)
                ) ? (
                  ""
                ) : (
                  <div class="custom-control custom-checkbox pt-4 m-4">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customControlAutosizing"
                      required
                    />
                    <label
                      class="custom-control-label"
                      for="customControlAutosizing"
                    >
                      <b>Cash</b>
                      <br />
                      <p class="small text-muted m-0">
                        Please keep exact change handy to help us serve you
                        better
                      </p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
        <div className="pb-3">
          <input
            type="button"
            onClick={() => genrate_order_res()}
            class="btn btn-success btn-lg btn-block mt-3 conti"
            value="Place Order"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
