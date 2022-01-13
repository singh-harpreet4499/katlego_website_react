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
          Chicken Florentine
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="http://139.59.67.166/katlego_website/assets/images/chicken-gallery-big.jpg" />
        <p>
          High quality Fresh Orange fruit exporters from South Korea for sale.
          All citrus trees belong to the single.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const RecipeInner = ({ onHide, show }) => {
  const [Recipedata, setRecipeData] = useState(null);

  const load_data = () => {
    get_recipe_details().then(
      (rs) => rs && rs.status && setRecipeData(rs.data)
    );
  };

  useEffect(() => {
    load_data();
  }, []);
  // const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}></Button> */}
      {Recipedata &&
        Recipedata.map((td) => {
          return <RecipeInnerModal {...td} />;
        })}
      <RecipeInnerModal show={show} onHide={() => onHide()} />
    </>
  );
};

export default RecipeInner;
