import React from "react";
import Dealday from "../components/app/Dealday";
import { Heading } from "../components/app/Heading";
import Category2 from "../components/category/Category2";
import ExperienceRow from "../components/experience/ExperienceRow";
import FooterSupport from "../components/footer/FooterSupport";
import Header from "../components/header/Header";
import Adds from "../components/offers/Adds";
import Product from "../components/product/Product";
import ProductSlider from "../components/product/ProductSlider";
import HomeSlider from "../components/slider/HomeSlider";
import { fetch_homepage_web } from "../components/server/api";
import Aboutus from "../components/app/Aboutus";
import Ourrecipe from "../components/app/Ourecipe";
import SpinLoader from "../components/loader/SpinLoader";
import Pressrelease from "../components/app/Pressrelease";
import Testimonial from "../components/app/Testimonial";
import "./Home.css";
import InstagramEmbed from "react-instagram-embed";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannners: [],
      categories: [],
      best_sellers: [],
      hotselling: [],
      deal_of_the_day: [],
      combos: [],
      canMove: 0,
    };
  }

  loadEssentialdata = async () => {
    console.log("loadEssentialdata");
    await fetch_homepage_web({}).then((response) => {
      if (response.status) {
        this.setState({
          categories: response.categories,
          best_sellers: response.best_sellers,
          bannners: response.banners,
          combos: response.combos,
          hotselling: response.hotselling,
          deal_of_the_day: response.deal_of_the_day,
          canMove: 1,
        });
      }
    });
  };

  componentDidMount() {
    this.loadEssentialdata();
  }

  render() {
    const { best_sellers, categories, combos, bannners, hotselling } =
      this.state;

    return (
      <div className="">
        <Header canMove={1} categories={categories} />
        <HomeSlider banners={bannners} />
        <ExperienceRow />

        <div className="container">
          <Heading title="best sellers" horizontalLine={false} />

          <div className="tab-content">
            <div
              className="tab-pane p-0 fade show active"
              id="top-all-tab"
              role="tabpanel"
              aria-labelledby="top-all-link"
            >
              <div className="products">
                <div className="row justify-content-center">
                  {best_sellers.length ? (
                    best_sellers.map(({ id, ...otherData }) => (
                      <Product id={id} key={id} {...otherData} />
                    ))
                  ) : (
                    <SpinLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Adds />
        <Dealday deal_of_the_day={this.state.deal_of_the_day} />

        {combos.length ? (
          <>
            <Heading title="Combos product" />
            {this.state.canMove ? (
              <ProductSlider products={combos} />
            ) : (
              <SpinLoader />
            )}
          </>
        ) : (
          ""
        )}

        <Heading
          className="lean"
          title="Explore by categories"
          horizontalLine={false}
        />
        <div className="container">
          <div className="row justify-content-center">
            {categories.length
              ? categories.slice(0, 6).map(({ id, ...otherData }) => {
                  return (
                    <Category2
                      key={id}
                      id={id}
                      defaultImage={1}
                      {...otherData}
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <Aboutus />

        {hotselling.length ? (
          <div>
            <Heading title="OUR HOT-SELLING PRODUCTS" />
            <div className="container">
              <div className="row">
                {hotselling.map(({ id, ...otherdata }) => (
                  <Product id={id} key={id} {...otherdata} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <Ourrecipe />
        {/* <Heading title="Our Customers Say" /> */}
        <Testimonial />
        <Pressrelease />

        <FooterSupport />
      </div>
    );
    // debugger;
  }
}

export default Home;
