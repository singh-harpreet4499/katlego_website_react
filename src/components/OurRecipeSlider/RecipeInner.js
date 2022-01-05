import { get_recipe_details } from "../server/api";
import React, { useEffect, useState } from "react";

const RecipeInner = (props) => {
  const handleClose = () => false;

  const [Recipedata, setRecipeData] = useState(null);
  const load_data = () => {
    get_recipe_details().then(
      (rs) => rs && rs.status && setRecipeData(rs.data)
    );
  };

  useEffect(() => {
    load_data();
  }, []);

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="chi-hea">{props.title}</h5>
          <button className="close" type="button" dataDismiss="modal">
            <span onClick={handleClose}>x</span>
            <span className="sr-only" onClick={handleClose}>
              Close
            </span>
          </button>
          <h4 className="modal-title"></h4>
        </div>
        <div className="modal-body">
          <img className="img-responsive" src={props.imageUrl} />
        </div>
        <div className="modal-footer">
          <div className="col-md-12 text-justify">
            <p className="moda-para">{props.para}</p>
          </div>
        </div>
      </div>
      {Recipedata &&
        Recipedata.map((td) => {
          return <RecipeInner {...td} />;
        })}
    </div>
  );
};
export default RecipeInner;
