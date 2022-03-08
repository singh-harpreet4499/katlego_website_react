import { get_recipe_details } from "../server/api";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function RecipeInnerModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <a>{props.title} </a>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.imagrUrl} />
        <p>{props.titles}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const RecipeInner = ({ onHide, show }, props) => {
  const [Recipedatas, getRecipeData] = useState(null);

  const load_data = () => {
    get_recipe_details().then(
      (rs) => rs && rs.status && getRecipeData(rs.data)
    );
  };

  useEffect(() => {
    load_data();
  }, []);
  // const [modalShow, setModalShow] = React.useState(false);
  console.log(Recipedatas);
  return (
    <>
      {Recipedatas &&
        Recipedatas.map((td) => {
          return (
            <RecipeInnerModal
              {...td}
              show={show}
              onHide={() => onHide()}
              // title={"Chicken Florentine"}
              // imagrUrl={
              //   "http://139.59.67.166/katlego_website/assets/images/chicken-gallery-big.jpg"
              // }
              // titles={
              //   "High quality Fresh Orange fruit exporters from South Korea for sale. All citrus trees belong to the single."
              // }
            />
          );
        })}
    </>
  );
};

export default RecipeInner;
