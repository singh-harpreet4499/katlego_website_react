import OwlCarousel from "react-owl-carousel";
import "./RecipeSlider.css";
import { get_recipes } from "../server/api";
import React, { useEffect, useState } from "react";

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
  console.log("recp", props);
  return (
    <div className="product product-4 text-center">
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
  );
};

const dataRecipe = {
  nav: true,
  dots: false,
  margin: 21,
  loop: true,
  responsive: {
    0: {
      items: 2,
    },
    480: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 4,
    },
    1600: {
      items: 4,
    },
  },
};

const RecipeSlider = (props) => {
  const [Recipedata, setRecipeData] = useState(null);

  const load_data = () => {
    get_recipes().then((rs) => rs && rs.status && setRecipeData(rs.data));
  };

  useEffect(() => {
    load_data();
  }, []);

  return (
    <div>
      <center>
        <button
          type="submit"
          className="btn btn-success view-mor hidden-sm hidden-xs"
        >
          View More
        </button>
      </center>
      <h5 className="mt-3 mb-3">Our Recipes</h5>

      <div
        className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow  owl-loaded owl-drag"
        dataToggle="owl"
      >
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
      </div>
    </div>
  );
};
export default RecipeSlider;

// Product Details
