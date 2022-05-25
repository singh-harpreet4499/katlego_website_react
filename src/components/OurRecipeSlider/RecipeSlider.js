import OwlCarousel from "react-owl-carousel";
import "./RecipeSlider.css";
import { get_recipes } from "../server/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeInnerModal from "./RecipeInner";

const OwlRecipe = {
  nav: false,
  dots: false,

  margin: 30,
  loop: true,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },

    600: {
      items: 4,
    },
    900: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },
};

const RecipeSliderItem = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  // console.log("recp", props);
  return (
    <>
      <div
        onClick={() => {
          setModalShow(true);
        }}
        className="product product-4 text-center"
      >
        <figure className="product-media">
          <a>
            <img src={props.imageUrl} />
          </a>
        </figure>
        <div className="product-body">
          <h3 className="product-title bone1">
            <a>{props.title}</a>
          </h3>
        </div>
      </div>
      <RecipeInnerModal
        show={modalShow}
        {...props}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

const RecipeSlider = (props) => {
  const [Recipedata, setRecipeData] = useState([]);
  const [isUpdate, setUpdate] = useState(0);

  const load_data = () => {
    get_recipes().then((rs) => {
      if (rs.status) {
        setRecipeData(rs.data);
        setUpdate(1);
      }
    });
  };

  useEffect(() => {
    load_data();
  }, []);

  return (
    <div>
      <center>
        <Link
          className="btn btn-success view-mor"
          to={{
            pathname: "/recipe-list",
          }}
        >
          View More
        </Link>
        {/* </button> */}
      </center>
      <h5 className="mt-3 mb-3">Our Recipes</h5>

      <div
        className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow  owl-loaded owl-drag"
        dataToggle="owl"
      >
        {Recipedata.length ? (
          <OwlCarousel
            className="owl-carousel mt-3 mb-3 owl-simple owl-loading owl-drag"
            {...OwlRecipe}
          >
            {Recipedata &&
              Recipedata.map((td) => {
                return <RecipeSliderItem {...td} />;
              })}
            {/* <RecipeSliderItem /> */}
          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default RecipeSlider;

// Product Details
