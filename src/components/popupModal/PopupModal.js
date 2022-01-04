import React from "react";
import { useState, useEffect } from "react";
// import "./PopupModal.css";
import defaultImage1 from "../../libs/img/popupModalPhoto/apple.png";
import defaultImage2 from "../../libs/img/popupModalPhoto/playstore.webp";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import appstore from "../../libs/images/appstore.png";
import playstore from "../../libs/images/playmarket.png";
import { useSelector } from "react-redux";
/*
const PopupModal1 = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, settimedPopup] = useState(false);

  return (<Modal.Dialog>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>)

  // <PopupModal trigger={buttonPopup} setTrigger={setButtonPopup} />;
  // <PopupModal trigger={timedPopup} setTrigger={settimedPopup} />;

  useEffect(() => {
    setTimeout(() => {
      settimedPopup(true);
    }, 3000);
  }, []);

  return props.trigger ? (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="modal-dialog shadow-lg p-3 mb-5 bg-body rounded ">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title  text-primary">Modal title</h5>
                  <button
                    className="btn btn-secondary"
                    onClick={() => props.setTrigger(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                  {props.children}
                </div>
                <div className="modal-body">
                  <button className="col-lg-6 col-md-6 col-6 shadow p-3 mb-5 bg-body rounded">
                    <img className="img" src={defaultImage1} />
                  </button>
                  <button className="col-lg-6 col-md-6 col-6 shadow p-3 mb-5 bg-body rounded">
                    <img className="img" src={defaultImage2} />
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => props.setTrigger(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

*/

const PopupModal =(props) => {
  const settings = useSelector(state=>state.global.settings);

  const [show, setShow] = useState(false);
  const [dw_txt,setDwTxt] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const set_interval = () => {
    const interval = parseInt(settings.show_popup_download);
    setDwTxt(settings.download_text)
    if(interval){
      setTimeout(() => {
        setShow(true)
      }, interval*1000);
  
    }
    
  }
  // download_text
  useEffect(() => {
    if(settings){
      set_interval()
    }
    
}, [settings])


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <div class="download" style={{textAlign:"center"}}>
              <span class="down-app">{dw_txt}</span>
              <a href="https://play.google.com/store" className="mr-2">
                <img style={{width:'200px'}} src={playstore} alt="android" />
              </a>
              <a href="https://www.apple.com/in/app-store/">
                <img style={{width:'200px'}} src={appstore} alt="ios" />
              </a>
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupModal;
