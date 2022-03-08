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
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.imageUrl} alt={props.title} />
        <p>
          {props.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const RecipeInner = ({ onHide, show,...otherData }) => {
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
      {/* {Recipedata &&
        Recipedata.map((td) => { */}
           {/* <RecipeInnerModal {...otherData} />; */}
        {/* })} */}
      <RecipeInnerModal {...otherData} show={show} onHide={() => onHide()} />
    </>
  );
};

export default RecipeInner;
