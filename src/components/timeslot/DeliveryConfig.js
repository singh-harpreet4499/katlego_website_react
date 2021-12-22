import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { deliveryconfig } from "../server/api";
import { useSelector, useDispatch } from "react-redux";
import { setOrderConf } from "../../redux/order/order.action";

const moment = require("moment");
const DeliveryConfig = (props) => {
  const orderconfg = useSelector((state) => state.orderConf);
  const dispatch = useDispatch();
  const [delivery_config, setDeliveryConfig] = useState({});
  const [calenderdates, setCalenderDate] = useState([]);
  const [selected_day, setSelectedDay] = useState({});
  const [timeslotobj, setTimeSlotObj] = useState({});
  const [selectedTimeSlot, setTimeSlotSeleted] = useState("");

  const delivery_config_data = async () => {
    await deliveryconfig({}).then((rs) => {
      if (rs.status) {
        setDeliveryConfig(rs.data);
      }
    });
  };

  const select_time_slot = (time_slot) => {
    setTimeSlotSeleted(time_slot);
    dispatch(setOrderConf({ ...orderconfg, schedule_time: time_slot }));
  };

  const date_wise_day_name = async () => {
    var arr = [];
    var datet = moment();
    for (let i = 0; i < 6; i++) {
      const formatdate = moment(datet).format("DD MMMM");
      const datetimestamp = moment(datet).format("YYYY-MM-DD");
      const dayname = moment(datet)
        .format("dddd")
        .substring(0, 3)
        .toLowerCase();
      datet = moment(datet).add("1", "days");
      const obj = {
        id: i,
        date: formatdate,
        datetimestamp: datetimestamp,
        dayname: dayname,
      };
      arr.push(obj);
    }
    setCalenderDate(arr);
  };

  const set_dayname = async (obj) => {
    // alert( JSON.stringify(obj))
    setSelectedDay(obj);
    dispatch(setOrderConf({ ...orderconfg, schedule_date: obj.datetimestamp }));
    const dayname = obj.dayname;
    // alert()
    // const schedule_obj =await search_obj('schedule',delivery_config);
    // alert(JSON.stringify(schedule_obj))
    for (var i = 0; i < delivery_config.length; i++) {
      if (delivery_config[i].type == "schedule") {
        setTimeSlotObj(delivery_config[i].time_slots[dayname]);
      }
    }
  };

  const set_delivery_type = (index) => {
    dispatch(
      setOrderConf({
        ...orderconfg,
        delivery_type: index === 0 ? "now" : "schedule",
      })
    );
  };

  const active_class = "active";

  useEffect(() => {
    delivery_config_data();
    date_wise_day_name();
  }, []);
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
            <span className="c-number">3</span> Delivery Type
          </button>
        </h2>
      </div>

      <div
        id="collapsethree"
        className="collapse show"
        aria-labelledby="headingthree"
        data-parent="#accordionExample"
      >
        <Tabs onSelect={(index) => set_delivery_type(index)}>
          <TabList>
            <Tab>Delivery Now</Tab>
            <Tab>Schedule Delivery</Tab>
          </TabList>
          {/* {
//                         delivery_config.map(({id})=>{
// <Tab>Schedule Delivery</Tab>
//                         })
                    } */}
          {delivery_config.length
            ? delivery_config.map(({ id, type, time_take }) => {
                if (type === "now") {
                  return (
                    <TabPanel>
                      <div>
                        <div className="text-center mb-2 py-2">
                          <p className="display-2">
                            <i className="icofont-clock-time tim"></i>
                          </p>
                          <p className="your-order">Your Order:</p>
                          <h6 className="font-weight-bold text-dark">
                            Your order will be deliver in {time_take} mins
                          </h6>
                        </div>
                        {/* <div className="p-3">
                                            <a href="#" className="btn btn-success btn-lg btn-block sche" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">Proceed to Payment</a>
                                        </div> */}
                      </div>
                    </TabPanel>
                  );
                }
              })
            : ""}

          {/* {
                        delivery_config.length ? delivery_config.map(()=>{
                        return (
                            <>
                            </>
                        )
                        }) : ''
                    } */}
          <TabPanel>
            <div className="card-body p-0">
              <div className="osahan-order_address">
                <div className="text-center mb-2 py-2">
                  <p className="display-2">
                    <i className="icofont-ui-calendar text-success"></i>
                  </p>
                  <p className="mb-1">Your Current Slot:</p>
                </div>
                <div className="schedule">
                  <ul
                    className="nav nav-tabs justify-content-center nav-fill"
                    id="myTab"
                    role="tablist"
                  >
                    {calenderdates.length
                      ? calenderdates.map(
                          ({ id, date, dayname, datetimestamp }) => {
                            return (
                              <li
                                key={id}
                                onClick={() =>
                                  set_dayname({
                                    id,
                                    date,
                                    dayname,
                                    datetimestamp,
                                  })
                                }
                                className="nav-item"
                                role="presentation"
                                style={{ cursor: "pointer" }}
                              >
                                <span
                                  className={`nav-link ${
                                    selected_day.datetimestamp === datetimestamp
                                      ? active_class
                                      : ""
                                  } text-dark`}
                                  aria-selected="true"
                                >
                                  <p className="mb-0 font-weight-bold">
                                    {dayname.toUpperCase()}
                                  </p>
                                  <p className="mb-0">{date}</p>
                                </span>
                              </li>
                            );
                          }
                        )
                      : ""}
                  </ul>

                  {timeslotobj.length
                    ? timeslotobj.map(({ start, end }) => {
                        return (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => select_time_slot(start + "-" + end)}
                            className="tab-content filter bg-white"
                          >
                            <div
                              className="tab-pane fade show active"
                              id={start + "-" + end}
                              role="tabpanel"
                              aria-labelledby="mon-tab"
                            >
                              <div className="custom-control border-bottom px-0 custom-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  name="time_slot"
                                  id={start + "-" + end}
                                  value={start + "-" + end}
                                  checked={
                                    selectedTimeSlot == start + "-" + end
                                      ? true
                                      : false
                                  }
                                />
                                <label
                                  className="custom-control-label py-13 w-100 px-13"
                                  for={start + "-" + end}
                                >
                                  <i className="icofont-clock-time mr-2"></i>{" "}
                                  {start} - {end}
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      {/* <div id="collapsethree" className="collapse show" aria-labelledby="headingthree" data-parent="#accordionExample">
                <ul className="nav nav-tabs" id="tabs-2" role="tablist">
                    <li className="nav-item deliver">
                        <a className="nav-link active" id="tab-5-tab" data-toggle="tab" href="#tab-5" role="tab" aria-controls="tab-5" aria-selected="true">Delivery Now</a> 
                    </li>
                    <li className="nav-item deliver">
                        <a className="nav-link" id="tab-6-tab" data-toggle="tab" href="#tab-6" role="tab" aria-controls="tab-6" aria-selected="false">Delivery Today</a>
                    </li>
                    <li className="nav-item deliver">
                        <a className="nav-link" id="tab-7-tab" data-toggle="tab" href="#tab-7" role="tab" aria-controls="tab-7" aria-selected="false">Schedule Delivery</a>
                    </li>
                </ul>

                <div className="tab-content tab-content" id="tab-content-2">
                    <div className="tab-pane fade show active" id="tab-5" role="tabpanel" aria-labelledby="tab-5-tab">
                        <div className="text-center mb-2 py-2">
                            <p className="display-2"><i className="icofont-clock-time tim"></i></p>
                            <p className="your-order">Your Order:</p>
                            <h6 className="font-weight-bold text-dark">Your order will be deliver in 120 mins</h6>
                        </div>
                        <div className="p-3">
                            <a href="#" className="btn btn-success btn-lg btn-block sche" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">Proceed to Payment</a>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="tab-6" role="tabpanel" aria-labelledby="tab-6-tab">
                        <div className="text-center mb-2 py-2">
                            <p className="display-2"><i className="icofont-clock-time tim"></i></p>
                            <p className="your-order">Your Order:</p>
                            <h6 className="font-weight-bold text-dark">Your order will be deliver in Today</h6>
                        </div>
                        <div className="p-3">
                            <a href="#" className="btn btn-success btn-lg btn-block sche" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">Proceed to Payment</a>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="tab-7" role="tabpanel" aria-labelledby="tab-7-tab">
                        <div className="card-body p-0">
                            <div className="osahan-order_address">
                                <div className="text-center mb-2 py-2">
                                    <p className="display-2"><i className="icofont-ui-calendar text-success"></i></p>
                                    <p className="mb-1">Your Current Slot:</p>
                                </div>
                                <div className="schedule">
                                    <ul className="nav nav-tabs justify-content-center nav-fill" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active text-dark" id="mon-tab" data-toggle="tab" href="#mon" role="tab" aria-controls="mon" aria-selected="true">
                                                <p className="mb-0 font-weight-bold">SUN</p>
                                                <p className="mb-0">6 Sep</p>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content filter bg-white" id="myTabContent">
                                        <div className="tab-pane fade show active" id="mon" role="tabpanel" aria-labelledby="mon-tab">
                                            <div className="custom-control border-bottom px-0 custom-radio">
                                                <input className="custom-control-input" type="radio" name="exampleRadios" id="mon1" value="mon1" checked />
                                                <label className="custom-control-label py-3 w-100 px-3" for="mon1">
                                                    <i className="icofont-clock-time mr-2"></i> 6AM - 10AM
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default DeliveryConfig;
