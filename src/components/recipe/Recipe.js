import React from "react";
import RecipeInner from "../OurRecipeSlider/RecipeInner";

const Recipe = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
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
                  onClick={() => setModalShow(true)}
                />
                <RecipeInner
                  show={modalShow}
                  {...props}
                  onHide={() => setModalShow(false)}
                />
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
