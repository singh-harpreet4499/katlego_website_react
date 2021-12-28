import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpinLoader from "../components/loader/SpinLoader";
import { my_order_history } from "../components/server/api";
import defaultImage from "../libs/images/chicken-gallery2.jpg";

const moment = require("moment");
const OrderBody = (props) => {
  const {
    id,
    order_items,
    orderstatus,
    created_at,
    is_paid,
    txn_id,
    shipping_address_type,
    payable_amount,
    shipping_flat,
    shipping_landmark,
    shipping_location,
    shipping_pincode,
  } = props;
  return (
    // <div class="order-body">
    <div class="pb-3">
      <Link to={"/order-details/" + id} class="text-decoration-none text-dark">
        <div class="p-3 rounded shadow-sm bg-white">
          <div class="d-flex align-items-center mb-2">
            <p class="bg-success text-white py-1 px-2 mb-0 rounded small">
              {orderstatus}
            </p>
            <p class="text-muted ml-auto small mb-0">
              <i class="icofont-clock-time"></i>{" "}
              {moment(created_at).format("DD/MM/YY")}
            </p>
          </div>

          {order_items.map((dt) => {
            return (
              <div class="d-flex order-img mb-2">
                <img
                  src={dt.product_image ? dt.product_image : defaultImage}
                  alt="imaged"
                />
                <p class="chicken-detail">
                  {" "}
                  {dt.product_name}
                  <br />
                  <span class="text-dark">Qty:{dt.qty}</span>
                  <br />
                  <span class="text-dark">₹{dt.price}</span>
                </p>
              </div>
            );
          })}

          <div class="d-flex">
            <p class="text-muted m-0">
              Order ID
              <br />
              <span class="text-dark font-weight-bold">#{id}</span>
              <br />
            </p>
            {is_paid == 1 ? (
              <p class="text-muted m-0 ml-auto">
                Transaction. ID
                <br />
                <span class="text-dark font-weight-bold">#{txn_id}</span>
              </p>
            ) : (
              ""
            )}

            <p class="text-muted m-0 ml-auto">
              Delivered to
              <br />
              <span class="text-dark font-weight-bold">
                {shipping_address_type.toUpperCase()}
              </span>
              <br />
              <span class="text-dark font-weight-bold">
                {" " +
                  shipping_flat +
                  " " +
                  shipping_landmark +
                  " " +
                  shipping_location +
                  " " +
                  shipping_pincode}
              </span>
            </p>

            <p class="text-muted m-0 ml-auto">
              Total Payment
              <br />
              <span class="text-dark font-weight-bold">₹{payable_amount}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
    // </div>
  );
};

const OrderHistory = (props) => {
  const [orders, setOrders] = useState([]);
  const [orderstatus, setOrderStatus] = useState("ongoing");
  const [canmove, setCanMove] = useState(0);

  const fetch_orders = (status = "ongoing") => {
    setCanMove(0);
    my_order_history({
      type: status,
    }).then((rs) => {
      // debugger;
      // console.log(rs);
      if (rs.status) {
        setOrders(rs.data);
      }
      setCanMove(1);
    });
  };

  useEffect(() => {
    fetch_orders(orderstatus);
  }, [orderstatus]);

  if (!canmove) {
    return <SpinLoader />;
  } else {
    return (
      <main className="main">
        <section className="py-4 osahan-main-body">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <h2 className="text-center">My Orders</h2>
                <ul
                  className="nav nav-tabs custom-tabs border-0 flex-column bg-white rounded overflow-hidden shadow-sm p-2 c-t-order"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className={
                        orderstatus === "completed"
                          ? "nav-link border-0 text-dark py-3 active"
                          : "nav-link border-0 text-dark py-3"
                      }
                      onClick={() => setOrderStatus("completed")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="icofont-check-alt mr-2 text-success mb-0"></i>{" "}
                      Completed
                    </a>
                  </li>
                  <li className="nav-item border-top" role="presentation">
                    <a
                      className={
                        orderstatus === "ongoing"
                          ? "nav-link border-0 text-dark py-3 active"
                          : "nav-link border-0 text-dark py-3"
                      }
                      onClick={() => setOrderStatus("ongoing")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="icofont-wall-clock mr-2 text-warning mb-0"></i>{" "}
                      In Progress
                    </a>
                  </li>
                  <li className="nav-item border-top" role="presentation">
                    <a
                      className={
                        orderstatus === "cancelled"
                          ? "nav-link border-0 text-dark py-3 active"
                          : "nav-link border-0 text-dark py-3"
                      }
                      onClick={() => setOrderStatus("cancelled")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="icofont-close-line mr-2 text-danger mb-0"></i>{" "}
                      Cancelled
                    </a>
                  </li>
                </ul>
              </div>

              <div class="tab-content col-md-9" id="myTabContent">
                <div
                  class={"tab-pane fade show active"}
                  id="completed"
                  role="tabpanel"
                  aria-labelledby="completed-tab"
                >
                  <div class="order-body">
                    {orders.length ? (
                      orders.map((data) => (
                        <OrderBody {...data} orderstatus={orderstatus} />
                      ))
                    ) : (
                      <h2
                        className="text-center"
                        style={{
                          marginTop: "80px",
                          color: "#f17f39",
                        }}
                      >
                        "Oops! No orders Found!"
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default OrderHistory;
