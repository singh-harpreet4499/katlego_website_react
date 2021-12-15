import { useEffect, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { geolocated } from "react-geolocated";
import {
  check_if_service_location,
  fetch_areas,
  fetch_locations,
  fetch_location_by_id,
} from "../server/api";
import { connect, useSelector, useDispatch } from "react-redux";

import "./LocationModal.css";
import Infomsg from "../app/Infomsg";
import { setUserLocation } from "../../redux/user/user.action";
const LocationModal = (props) => {
  const [show, setShow] = useState(false);
  const [currentLatlon, setCurrentLatLon] = useState({
    latitude: "",
    longitude: "",
  });
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errormessage, setErrormessage] = useState({
    message: "",
    class: "",
  });
  const [successmessage, setSuccessmessage] = useState("");

  const [locationSelection, setLocationSelection] = useState(0);
  const [areas, setAreas] = useState([]);
  const dispatch = useDispatch();
  const address_data = useSelector((state) => state.user.location);

  const [formData, updateFormData] = useState({
    location_id: 0,
    area_id: 0,
  });

  const close_button = () => {
    if (address_data && address_data != "" && address_data.length) {
      handleClose();
    } else {
      setShow(true);
      setErrormessage({
        message: "Please select location!",
        class: "danger",
      });
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    // alert(e.target.value.trim())
    if (e.target.name === "location_id") {
      var location_id = e.target.value.trim();
      fetch_areas({
        location_id: location_id,
      }).then((areas) => (areas ? setAreas(areas.data) : ""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { location_id, area_id } = formData;

    if (!location_id) {
      setErrormessage({
        message: "Please select location!",
        class: "danger",
      });
    } else {
      fetch_location_by_id({
        id: location_id,
      }).then((rs) => {
        console.log("rs", rs);
        if (rs.status) {
          const obj = {
            is_set: 1,
            address_id: location_id,
            society_id: area_id,
            is_current_location: 0,
            latitude: rs.data.lat,
            longitude: rs.data.lon,
            location: rs.data.name,
            formatted_address: rs.data.name,
            name: rs.data.name,
          };
          localStorage.setItem("setUserLocation", JSON.stringify(obj));
          dispatch(setUserLocation(obj));
          handleClose();
          window.location.reload();
        }
      });
    }

    // const obj = {
    //     is_set:1,
    //     latitude:setlc.data.latitude,
    //     longitude:setlc.data.longitude,
    //     location:check_service_location.name,
    //     formatted_address:check_service_location.formatted_address
    // }
    // localStorage.setItem('setUserLocation',JSON.stringify(obj))
    // dispatch(setUserLocation(obj))
  };

  const fetch_current_location = async () => {
    const setlc = !props.isGeolocationAvailable
      ? {
          status: false,
          message: "Your browser does not support Geolocation",
          location_enabled: true,
        }
      : !props.isGeolocationEnabled
      ? {
          status: false,
          message: "Geolocation is not enabled",
          location_enabled: false,
        }
      : props.coords
      ? {
          status: true,
          message: "",
          location_enabled: true,
          data: props.coords,
        }
      : {
          status: false,
          message: "",
          location_enabled: true,
          data: props.coords,
        };

    if (setlc.status) {
      const lat_lon = {
        latitude: setlc.data.latitude,
        longitude: setlc.data.longitude,
      };
      console.log(lat_lon);
      setCurrentLatLon(lat_lon);

      const check_service_location = await check_if_service_location(lat_lon);
      console.log("check_service_location", check_service_location);
      if (check_service_location.status) {
        setPincode(check_service_location.pincode);
        setAddress(check_service_location.formatted_address);
        setErrormessage({
          message: "Congratulations, We are providing services in this area",
          class: "success",
        });
        const obj = {
          is_set: 1,
          is_current_location: 1,
          latitude: setlc.data.latitude,
          longitude: setlc.data.longitude,
          location: check_service_location.name,
          formatted_address: check_service_location.formatted_address,
          name: check_service_location.data.name,
        };
        localStorage.setItem("setUserLocation", JSON.stringify(obj));
        dispatch(setUserLocation(obj));
        handleClose();
      } else {
        setErrormessage({
          message:
            "Sorry we are not providing service in your area, Please choose other location from the list",
          class: "danger",
        });
        // // alert('currently we are not providing services in your area')
      }
    } else {
      setErrormessage(setlc.message);
    }
  };

  useEffect(() => {
    if (props.show) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props]);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
            </Button> */}

      <Modal size="lg" show={show} onHide={close_button} backdrop="static">
        <Modal.Header closeButton className="location-selectDeliveryLocation">
          <Modal.Title>Select Delivery Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <Infomsg
              type={errormessage.class}
              message={errormessage.message}
            ></Infomsg>
          }
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <select
                onChange={handleChange}
                name="location_id"
                className="form-control"
              >
                <option value="">Select location</option>

                {props.locations.length
                  ? props.locations.map((lc) => (
                      <option key={lc.id} value={lc.id}>
                        {lc.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="area_id"
                onChange={handleChange}
              >
                <label htmlFor="location">Area </label>
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
            <div className="form-group">
              <button
                type="submit"
                name="set_location"
                className="btn btn-dark btn-block rounded btn-apple"
              >
                Set Location{" "}
              </button>
            </div>
            {/* <div className="form-group" >
                    <label htmlFor="or" >- OR - </label>
                    </div>

                    <div className="form-group" >

                        <InputGroup className="mb-3">
                            <FormControl 
                            placeholder="Current Location"
                            aria-label="Current Location"
                            value={address}
                            aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                            <Button onClick={fetch_current_location} variant="outline-secondary">Use Current Location</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div> */}
          </form>
        </Modal.Body>
        <Modal.Footer className="location-selectDeliveryLocation">
          <Button
            variant="secondary"
            className="close-button"
            onClick={close_button}
          >
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(connect()(LocationModal));
