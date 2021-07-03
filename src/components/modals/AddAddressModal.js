import { useEffect, useState } from "react";
import { Button, Modal,InputGroup,FormControl } from "react-bootstrap";
import Infomsg from "../app/Infomsg";


const AddAddressModal = (props) => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [formData, updateFormData] = useState({
        state:'',city:'',landmark:'',location:'',lat:'',lng:'',address_type:''
    });
    const [errormessage,setErrormessage] = useState('');
    const [can_move,setCanmove] = useState(0);
    const [cursor_allow,setCursorAllow] = useState(1);
    
    const handleChange = (e) => {
        updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
        });
    };

    
  const handleSubmit =async (e) => {
    e.preventDefault()
    const {location_id} = formData;

    if(!location_id){
        setErrormessage({
            message:"Please select location!",
            class:"danger"
        })
    }else{
        
    }
  }
    useEffect(() => {
        if (props.show) {
        setShow(true);
        } else {
        setShow(false);
        }

    }, [props]);

    return (
        <div>
            <Modal size="lg"  show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Delivery Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="">
                    {<Infomsg type={errormessage.class} message={errormessage.message} ></Infomsg>}
                        <div className="form-row">
                            <div className="col-md-4 form-group"><label className="form-label">State</label><input   placeholder="Delhi" type="text" className="form-control" /></div>

                            <div className="col-md-4 form-group"><label className="form-label">City</label><input placeholder="New Delhi" type="text" className="form-control" /></div>

                            <div className="col-md-4 form-group"><label className="form-label">Landmark</label><input placeholder="Metro Station" type="text" className="form-control" /></div>

                            <div className="col-md-12 form-group"><label className="form-label">Complete Address</label><input placeholder="Complete Address e.g. house number, street name, landmark" type="text" className="form-control" /></div>

                            <div className="col-md-12 form-group"><label className="form-label">Delivery Instructions</label><input placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall" type="text" className="form-control" /></div>

                            <div className="mb-0 col-md-12 form-group">
                                <label className="form-label">Nickname</label>
                                <div className="btn-group btn-group-toggle w-100" data-toggle="buttons">
                                    <label className="btn btn-outline-secondary active">
                                        <input type="radio" name="options" id="option1" checked /> Home
                                    </label>
                                    <label className="btn btn-outline-secondary">
                                        <input type="radio" name="options" id="option2" /> Work
                                    </label>
                                    <label className="btn btn-outline-secondary">
                                        <input type="radio" name="options" id="option3" /> Other
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
       
    );
}

export default AddAddressModal;