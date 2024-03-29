import { useEffect, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserAddressList } from "../../redux/user/user.action";
import Infomsg from "../app/Infomsg";
import {
  add_address,
  check_if_service_location,
  fetch_addresses,
  fetch_areas,
  showAlertMessage,
} from "../server/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { setOrderConf } from "../../redux/order/order.action";

export const getPostcodeByLatLng = async (lat, lng) => {
  if (!lat || !lng) return null;
  const res = await fetch(`https://api.postcodes.io/?lon=${lng}&lat=${lat}`);
  // console.log("====================================");
  // console.log("getPostcodeByLatLng", res);
  // console.log("====================================");
  return res;
};

const AddAddressModal = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [pincode, setPincode] = useState(false);
  const handleClose = () => setShow(false);
  const [formData, updateFormData] = useState({
    state: "",
    city: "",
    landmark: "",
    location_id: "",
    area_id: "",
  });
  const [latlng, setLatLng] = useState({
    lat: "",
    lng: "",
  });
  const [address_type, setAddressType] = useState("");
  const [address, setAddress] = useState("");
  const [areas, setAreas] = useState([]);
  const orderConfd = useSelector((state) => state.orderConf);
  const [address_type_class1, setAddressTypeClass1] = useState(
    "btn btn-outline-secondary"
  );
  const [address_type_class2, setAddressTypeClass2] = useState(
    "btn btn-outline-secondary"
  );
  const [address_type_class3, setAddressTypeClass3] = useState(
    "btn btn-outline-secondary"
  );
  const [errormessage, setErrormessage] = useState("");
  const [cursor_allow, setCursorAllow] = useState(1);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });

    if (e.target.name === "location_id") {
      var location_id = e.target.value.trim();
      fetch_areas({
        location_id: location_id,
      }).then((areas) => (areas ? setAreas(areas.data) : ""));
    }
  };

  const area_fetch = async () => {
    fetch_areas({
      location_id: props.location_id,
    }).then((areas) => (areas ? setAreas(areas.data) : ""));
  };

  const set_address_type = (type = "") => {
    setAddressType(type);
    if (type === "home") {
      setAddressTypeClass1("btn btn-outline-secondary active");
      setAddressTypeClass2("btn btn-outline-secondary");
      setAddressTypeClass3("btn btn-outline-secondary");
    } else if (type === "work") {
      setAddressTypeClass1("btn btn-outline-secondary");
      setAddressTypeClass2("btn btn-outline-secondary active");
      setAddressTypeClass3("btn btn-outline-secondary");
    } else if (type === "other") {
      setAddressTypeClass1("btn btn-outline-secondary");
      setAddressTypeClass2("btn btn-outline-secondary");
      setAddressTypeClass3("btn btn-outline-secondary active");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqdata = { ...formData, address_type: address_type };
    // if(!state){
    //     setErrormessage({
    //         message:"Please add your state!",
    //         class:"danger"
    //     })
    // }else if(!city){
    //     setErrormessage({
    //         message:"Please add your city!",
    //         class:"danger"
    //     })
    // }else if(!address){
    //     setErrormessage({
    //         message:"Please add your complete address!",
    //         class:"danger"
    //     })
    // }else

    if (!address_type) {
      setErrormessage({
        message: "Please select address type!",
        class: "danger",
      });
    } else if (formData.location_id === "") {
      setErrormessage({
        message: "Please select location from the dropdown list!",
        class: "danger",
      });
    }
    // else if(formData.area_id === ''){
    //     setErrormessage({
    //         message:"Please select area from the dropdown list!",
    //         class:"danger"
    //     })
    // }
    // else if(latlng.lat === ''){
    // setErrormessage({
    //     message:"Please select address from the dropdown list!",
    //     class:"danger"
    // })
    // }
    else {
      setCursorAllow(0);
      // console.log('reqdata',reqdata);
      const response = await add_address(reqdata);
      if (response.status) {
        showAlertMessage("Success", "Address added successfully", true, false);
        fetch_addresses({
          location_id: props.location_id,
        }).then((rs) => {
          if (rs.status) {
            dispatch(setUserAddressList(rs.data));
          }
        });

        dispatch(
          setOrderConf({
            ...orderConfd,
            address_id: response.data.id,
          })
        );
      } else {
        showAlertMessage("", response.message, false, true);
      }
      setCursorAllow(1);
      setShow(false);

      // alert(response.message)
    }
  };
  const toggleModal = () => {
    setShow(!show);
  };

  const handleChangeAddress = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then(async (results) => {
        // console.log("====================================", results);

        const ad = {
          state: results[0]["address_components"][2]["long_name"],
          city: results[0]["address_components"][1]["long_name"],
          landmark: results[0]["address_components"][0]["long_name"],
        };
        updateFormData({ ...ad });
        // console.log("====================================");
        // updateFormData({
        //     state:results[0]['address_components'][2]['long_name'],
        //     city:results[0]['address_components'][1]['long_name'],
        //     landmark:results[0]['address_components'][0]['long_name'],
        // })
        getLatLng(results[0]).then(async (res) => {
          const lat_lon = {
            latitude: res.lat,
            longitude: res.lng,
          };
          // const postcode = await getPostcodeByLatLng(res.lat,res.lng);
          // console.log('postcode',postcode);
          // setPincode(postcode)
          // console.log('lat_lon',lat_lon);
          const check_service_location = await check_if_service_location(
            lat_lon
          );
          if (!check_service_location.status) {
            setAddress("");
            showAlertMessage(
              "Oops",
              "Sorry! We are not providing services in this area, Please choose other areas!",
              false,
              true
            );
            setLatLng({
              lat: "",
              lng: "",
            });
          } else {
            setLatLng({ ...res });
          }
        });
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    area_fetch();
    // console.log('====================================');
    // console.log('areas' ,areas);
    // console.log('====================================');
  }, [props]);

  return (
    <div>
      {/* <form method="POST" > */}

      <div className="card-header bg-white border-0 p-0" id="headingtwo">
        <h2 className="mb-0">
          <button
            className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
            type="button"
            data-toggle="collapse"
            data-target="#collapsetwo"
            aria-expanded="true"
            aria-controls="collapsetwo"
          >
            {props.hasOwnProperty("my_account") ? (
              <span
                onClick={toggleModal}
                className="text-decoration-none text-success ml-auto"
                style={{ cursor: "pointer" }}
              >
                {" "}
                <i className="icofont-plus-circle mr-1"></i>Add New Delivery
                Address
              </span>
            ) : (
              <>
                <span className="c-number">2</span> Order Address{" "}
                <span
                  onClick={toggleModal}
                  className="text-decoration-none text-success ml-auto"
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <i className="icofont-plus-circle mr-1"></i>Add New Delivery
                  Address
                </span>
              </>
            )}
          </button>
        </h2>
      </div>
      <Modal
        shouldCloseOnOverlayClick={false}
        size="lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Delivery Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <Infomsg
              type={errormessage.class}
              message={errormessage.message}
            ></Infomsg>
          }
          <div className="form-row">
            {/* <div className="col-md-12 form-group">
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={(e)=>handleChangeAddress(e)}
                                        onSelect={(e)=>handleSelect(e)}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div className="col-md-12 form-group">
                                            <label className="form-label">Complete Address</label>
                                            <input
                                            {...getInputProps({
                                                name:"location",
                                                placeholder: 'Complete Address e.g. house number, street name, landmark',
                                                className: 'form-control',
                                                
                                            })}
                                            />
                                            </div>
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                                const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                    })}
                                                >
                                                    <span  >{suggestion.description}</span>
                                                </div>
                                                );
                                            })}
                                        </div>
                                        </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div> */}

            <div className="col-md-6 form-group">
              <label className="form-label">Selected Location</label>
              <select
                onChange={handleChange}
                name="location_id"
                className="form-control"
              >
                <option value="">Select location</option>

                {props.locations.length
                  ? props.locations.map((lc) => {
                      if (props.location_id == lc.id) {
                        return (
                          <option key={lc.id} value={lc.id}>
                            {lc.name}
                          </option>
                        );
                      } else {
                        return "";
                      }
                    })
                  : ""}
              </select>
            </div>

            <div className="col-md-6 form-group">
              <label className="form-label">Selected Area</label>
              <select
                className="form-control"
                name="area_id"
                onChange={handleChange}
              >
                <option value="">Select Area</option>
                {areas.length
                  ? areas.map((lc) => (
                      <option key={lc.id} value={lc.id}>
                        {lc.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <div className="col-md-6 form-group">
              <label className="form-label">Flat</label>
              <input
                onChange={handleChange}
                name="flat"
                type="text"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 form-group">
              <label className="form-label">Landmark</label>
              <input
                onChange={handleChange}
                name="landmark"
                defaultValue={formData.landmark}
                type="text"
                className="form-control"
              />
            </div>

            {/* <div className="col-md-4 form-group"><label className="form-label">City</label><input onChange={handleChange} placeholder="New Delhi" name="city" defaultValue={formData.city} type="text" className="form-control" /></div>
                                <div className="col-md-4 form-group"><label className="form-label">State</label><input onChange={handleChange}  placeholder="Delhi" type="text" defaultValue={formData.state} name="state" className="form-control" /></div>

                                <div className="col-md-4 form-group"><label className="form-label">Landmark</label><input  onChange={handleChange} placeholder="Metro Station" name="landmark" defaultValue={formData.landmark} type="text" className="form-control" /></div> */}

            <div className="mb-0 col-md-12 form-group">
              <label className="form-label">Nickname</label>
              <div
                className="btn-group btn-group-toggle w-100"
                data-toggle="buttons"
              >
                <label
                  className={address_type_class1}
                  onClick={() => set_address_type("home")}
                >
                  <input type="radio" name="address_type" id="option1" /> Home
                </label>
                <label
                  className={address_type_class2}
                  onClick={() => set_address_type("work")}
                >
                  <input type="radio" name="address_type" id="option2" /> Work
                </label>
                <label
                  className={address_type_class3}
                  onClick={() => set_address_type("other")}
                >
                  <input type="radio" name="address_type" id="option3" /> Other
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div class="col-6 m-0 p-0">
            <button
              type="button"
              class="btn border-top btn-lg btn-block"
              onClick={handleClose}
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
          <div class="col-6 m-0 p-0">
            <button
              type="button"
              onClick={handleSubmit}
              class="btn btn-success btn-lg btn-block conti"
              style={{ cursor: cursor_allow ? "pointer" : "not-allowed" }}
              disabled={cursor_allow ? false : true}
            >
              Save changes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* </form> */}
    </div>
  );
};

export default AddAddressModal;
