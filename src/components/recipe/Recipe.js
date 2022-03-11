import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import img2 from "../../libs/img/chicken12.png";
import RecipeInner from "../OurRecipeSlider/RecipeInner";

const Recipe = (props) => {
  const [modal, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  // const [modalShow, setModalShow] = React.useState(false);
  const { title, imageUrl, time, difficulty } = props;
  return (
    <>
      <div className="col-6 col-md-4 mb-3">
        <div className="list-card bac-grey h-100 rounded overflow-hidden position-relative shadow-sm">
          <div className="list-card-image">
            <a href="#" className="text-dark">
              <div className="p-3">
                <img
                  src={imageUrl}
                  className="img-fluid item-img w-100 mb-1"
                  alt={title}
                  onClick={handleShow}

                  // onClick={() => setModalShow(true)}
                />
                {/* <RecipeInner
                  show={modalShow}
                  {...props}
                  onHide={() => setModalShow(false)}
                /> */}
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={modal}
                  onHide={handleClose}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img src={imageUrl} />
                    <p>
                      There's a reason boneless chicken breast recipes are a
                      staple of any good weeknight dinner arsenal. Chicken
                      happens to be a super versatile, crowd-pleasing main, not
                      to mention it's full of the protein and other nutrients
                      that we need every day
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div className="row">
                  <div className="col-md-8">
                    <h6 className="butt">{title}</h6>
                  </div>
                  <div className="col-md-4">
                    <div className="ratings rati">
                      <div
                        className="ratings-val"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="align-items-center">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="easy-pri">
                        {difficulty} | {time}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <button type="submit" className="btn main-btn">
                        MAIN COURSE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
