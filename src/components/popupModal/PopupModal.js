import React from "react";
import { useState, useEffect } from "react";
import "./PopupModal.css";
import defaultImage1 from "../../libs/img/popupModalPhoto/apple.png";
import defaultImage2 from "../../libs/img/popupModalPhoto/playstore.webp";

const PopupModal = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, settimedPopup] = useState(false);

  <PopupModal trigger={buttonPopup} setTrigger={setButtonPopup} />;
  <PopupModal trigger={timedPopup} setTrigger={settimedPopup} />;

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

export default PopupModal;
