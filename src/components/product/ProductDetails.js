import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect, useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatecarts } from "../../redux/cart/cart.action";
import {
  add_cart,
  get_cart_items,
  remove_cart_item,
  you_may_like,
} from "../server/api";
import ProductCard from "./ProductCard";
import ShowMoreText from "react-show-more-text";
import "./ProductDetails.css";

// img/recommend/thumb.png
// import thumb1 from '../../libs/img/recommend/thumb.png'
// import thumb2 from '../../libs/img/recommend/thumb-1.png'
// import thumb3 from '../../libs/img/recommend/thumb-2.png'
// import thumb4 from '../../libs/img/recommend/thumb-3.png'
// import thumb5 from '../../libs/img/recommend/thumb-4.png'
import defaultImage from "../../libs/images/demos/demo-2/products/product-5-1.jpg";

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [compData, setCompData] = useState({
    qty: 0,
  });
  const {
    name,
    imageUrl,
    description,
    mrp,
    discount,
    selling_price,
    net_wt,
    unit,
    cartdata,
    id,
    is_cart,
    no_of_pieces,
    rating,
    gallery,
    imagePath,
    stock,
  } = props;

  const [main_image, setMainImage] = useState(imageUrl);
  const [paramset, setParamsData] = useState(null);
  const [you_maylike, setYouMayLike] = useState([]);

  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  // console.log('====================================');
  // console.log('product detail',props);
  // console.log('====================================');
  // debugger;

  const fetchOtherData = () => {
    you_may_like({
      not_id: params.id,
    }).then((response) => {
      if (response.status) {
        setYouMayLike(response.data);
      }
    });
  };

  const updateCartQty = async (logic) => {
    var old_qty = parseInt(compData.qty);
    var new_qty = old_qty;
    if (logic === "plus") {
      new_qty = old_qty + 1;
    } else if (logic === "minus") {
      new_qty = old_qty - 1;
      if (new_qty < 0) {
        new_qty = 0;
      }
    } else if (logic === "buynow") {
      new_qty = 1;
    }
    const reqdata = {
      product_id: id,
      qty: new_qty,
    };
    // console.log('reqdata',reqdata);
    // if(new_qty===0){
    //     await remove_cart_item({
    //          id:cartdata?cartdata.id:0,
    //      })
    //  }else{
    //      add_cart(reqdata)
    //  }
    if (new_qty > stock) {
      alert("Out of stock!");
    } else {
      add_cart(reqdata).then((rs) => {
        if (rs.status) {
          if (logic == "buynow") {
            window.location.href = "/checkout";
          }
        }
      });

      await get_cart_items().then((rs) => {
        if (rs.status) {
          dispatch(updatecarts(rs));
        }
      });
      setCompData({
        qty: new_qty,
      });
    }
  };

  const set_page_params = (params) => {
    setParamsData(params);
  };

  useEffect(() => {
    setMainImage(imageUrl);
    if (props.is_cart) {
      setCompData({
        qty: props.cartdata.qty,
      });
    } else {
      setCompData({
        qty: 0,
      });
    }

    if (paramset) {
      if (paramset.id != params.id) {
        fetchOtherData();
        setParamsData(params);
      }
    } else {
      fetchOtherData();
    }
  }, [props, paramset]);

  const handleChange = (e) => {
    e.preventDefault();
    updateCartQty(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const set_main_img = (img) => {
    setMainImage(img);
  };

  return (
    // <main className="main">

    <section className="py-4 osahan-main-body">
      <div className="container">
        <div className="row">
          {/* <div class="col-md-1">  */}

          {gallery ? (
            <ul class="thumb-bann">
              <li class="thumb-sli active">
                <div
                  className="image-responsive"
                  style={{ cursor: "pointer" }}
                  onClick={() => set_main_img(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    className="image-responsive"
                    height="70"
                    width="80"
                  />
                </div>
              </li>
              {gallery &&
                gallery.split("|").map((dt) => {
                  return (
                    <li class="thumb-sli active">
                      <div
                        className="image-responsive-hide "
                        style={{ cursor: "pointer" }}
                        onClick={() => set_main_img(imagePath + dt)}
                      >
                        <img
                          src={imagePath + dt}
                          className="image-responsive"
                          width="70"
                          height="80"
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          ) : (
            ""
          )}

          {/* </div> */}

          <div className="col-lg-6">
            <div className="recommend-slider mb-3 ">
              <div className="osahan-slider-item ">
                <img
                  src={main_image}
                  style={{ width: "700px", height: "554px" }}
                  className="img-fluid mx-auto shadow-sm rounded mobile-view"
                  alt="Responsive"
                />
              </div>
            </div>
            <div className="pd-f d-flex align-items-center mb-3">
              {
                !selling_price || stock == 0 ? (
                  <button
                    style={{ cursor: "not-allowed" }}
                    name="plus"
                    value="1"
                    onClick={() => alert("Sorry! This Product is Out of stock")}
                    className="btn-product btn-cart hsbutonhover"
                    disabled={true}
                  >
                    Out Of Stock
                  </button>
                ) : parseInt(compData.qty) ? (
                  <div className="ml-auto">
                    <form
                      id="myform"
                      onSubmit={handleSubmit}
                      className="cart-items-number d-flex"
                      method="POST"
                    >
                      <input
                        type="button"
                        name="minus"
                        onClick={handleChange}
                        value="-"
                        className="qtyminus btn btn-success btn-sm"
                      />
                      <input
                        type="text"
                        name="qty"
                        onClick={handleChange}
                        value={compData.qty}
                        className="qty form-control"
                      />
                      <input
                        type="button"
                        name="plus"
                        onClick={handleChange}
                        value="+"
                        className="qtyplus btn btn-success btn-sm"
                      />
                    </form>
                  </div>
                ) : (
                  //  <div class="pd-f d-flex align-items-center mb-3">
                  <>
                    <button
                      name="plus"
                      onClick={handleChange}
                      class="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg gre"
                    >
                      <i class="icofont-plus m-0 mr-2"></i> ADD TO CART
                    </button>
                    <button
                      name="buynow"
                      onClick={handleChange}
                      class="btn btn-success p-3 rounded btn-block d-flex align-items-center justify-content-center btn-lg m-0 sche"
                    >
                      <i class="icofont-cart m-0 mr-2"></i> BUY NOW
                    </button>
                  </>
                )

                //  <button type="button"  name="plus" onClick={handleChange} className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg"><i className="icofont-plus m-0 mr-2"></i> ADD TO CART</button>
              }
            </div>
          </div>

          {/* product details start */}
          <div className="col-lg-5">
            <div className="p-4 bg-white rounded shadow-sm">
              <div className="pt-0">
                <div className="row">
                  <div className="col-md-8 col-xs-8">
                    <h2 className="font-weight-bold chi-cut">{name}</h2>
                  </div>

                  <div className="col-md-4 col-xs-4">
                    <div className="chi-off">
                      {/* <img src="assets/images/product-list.svg" /> */}
                      {discount ? (
                        <span className="badge badge-danger ml-2">
                          {discount}% OFF
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <a href="#">
                  <div className="rating-wrap d-flex align-items-center mt-1">
                    {rating ? (
                      <>
                        <ul className="rating-stars list-unstyled">
                          <li>
                            <i
                              className={`icofont-star ${
                                parseFloat(rating.average) >= 1
                                  ? "text-warning"
                                  : ""
                              }`}
                            ></i>
                            <i
                              className={`icofont-star ${
                                parseFloat(rating.average) >= 2
                                  ? "text-warning"
                                  : ""
                              }`}
                            ></i>
                            <i
                              className={`icofont-star ${
                                parseFloat(rating.average) >= 3
                                  ? "text-warning"
                                  : ""
                              }`}
                            ></i>
                            <i
                              className={`icofont-star ${
                                parseFloat(rating.average) >= 4
                                  ? "text-warning"
                                  : ""
                              }`}
                            ></i>
                            <i
                              className={`icofont-star ${
                                parseFloat(rating.average) >= 5
                                  ? "text-warning"
                                  : ""
                              }`}
                            ></i>
                          </li>
                        </ul>
                        <p className="label-rating text-muted ml-2 small">
                          {" "}
                          ({rating.total_reviews
                            ? rating.total_reviews
                            : 0}{" "}
                          Reviews)
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </a>
              </div>
              <div className="pt-2">
                <div className="row">
                  <div className="col-6">
                    <p className="font-weight-bold m-0">Available in</p>
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="bg-white">
                  <div className="d-flex align-items-center">
                    <div
                      className="btn-group osahan-radio btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label className="btn btn-secondary active">
                        <input
                          type="radio"
                          name="options"
                          id="option1"
                          checked
                        />{" "}
                        {net_wt} {unit}
                      </label>
                    </div>
                    {!selling_price || stock == 0 ? (
                      ""
                    ) : (
                      <div className="ml-auto">
                        <form
                          id="myform"
                          onSubmit={handleSubmit}
                          className="cart-items-number d-flex"
                          method="POST"
                        >
                          <input
                            type="button"
                            name="minus"
                            onClick={handleChange}
                            value="-"
                            className="qtyminus btn btn-success btn-sm"
                          />
                          <input
                            type="text"
                            name="qty"
                            onClick={handleChange}
                            value={compData.qty}
                            className="qty form-control"
                          />
                          <input
                            type="button"
                            name="plus"
                            onClick={handleChange}
                            value="+"
                            className="qtyplus btn btn-success btn-sm"
                          />
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-3">
                  <div className="bor-lin">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <p className="qun-pri">
                          {no_of_pieces ? "Pieces: " + no_of_pieces : ""} <br />
                          Net Wt: {net_wt} {unit}
                        </p>
                      </div>

                      <div className="col-md-6 col-6">
                        <div className="rat-pri">
                          {!selling_price ? (
                            ""
                          ) : mrp > selling_price ? (
                            <>
                              <h6 className="kg-pri">₹{selling_price}</h6>
                              <strike className="pri"> MRP₹{mrp}</strike>
                            </>
                          ) : (
                            <h6 className="kg-pri">₹{selling_price}</h6>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="font-weight-bold mt-1">Product Details</p>
                  {/* <p className="text-muted small mb-0"> */}
                  <ShowMoreText
                    lines={8}
                    more="Read more"
                    less="Show less"
                    className="text-muted small mb-0"
                    anchorClass="my-anchor-css-class"
                    // onClick={this.executeOnClick}
                    // expanded={false}
                    // width={280}
                    // truncatedEndingComponent={"... "}
                  >
                    {description ? ReactHtmlParser(description) : ""}
                  </ShowMoreText>

                  {/* </p> */}
                </div>
              </div>
            </div>
          </div>
          {/* product details end */}
        </div>
        {you_maylike.length ? (
          <>
            <h5 className="mt-1 mb-3">Maybe You Like this</h5>
            <div className="row col-md-12">
              {you_maylike.map(({ id, ...otherData }) => {
                return (
                  <ProductCard
                    column_not_cut={false}
                    key={id}
                    id={id}
                    {...otherData}
                  />
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
    // </main>
  );
};

export default connect()(ProductDetails);
