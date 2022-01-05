import { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import defaultImage from "../../libs/images/demos/demo-2/products/product-5-1.jpg";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  add_cart,
  remove_cart_item,
  get_cart_items,
  add_to_wishlist,
} from "../server/api";
import { updatecarts } from "../../redux/cart/cart.action";
import "./product.css";
import { setRedirectFalse } from "../../redux/redirect/redirect.action";
import ProductLabel from "./ProductLabel";
import LazyImage from "../image/LazyImage";
import HoverImage from "react-hover-image";

const Product = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(props);

  const {
    name,
    imageUrl,
    mrp,
    discount,
    selling_price,
    hifen_name,
    id,
    is_cart,
    cartdata,
    net_wt,
    unit,
    mark_as_new,
    mark_as_bestoffers,
    hoverimageUrl,
    combo_product,
    stock,
  } = props;
  const dispatch = useDispatch();

  const [compData, setCompData] = useState({
    qty: 0,
  });

  const add_wishlist = async (product_id) => {
    alert("added to wishlist");
    await add_to_wishlist({
      product_id: product_id,
    });
    // .then((rs)=>{
    //     debugger;
    //     alert(JSON.parse(rs))
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     debugger
    // })
    // debugger;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const updateCartQty = async (logic) => {
    // console.log('add',logic);
    var old_qty = parseInt(compData.qty);
    var new_qty = old_qty;
    if (logic === "plus") {
      new_qty = old_qty + 1;
      // debugger;
    } else if (logic === "minus") {
      new_qty = old_qty - 1;
      // debugger;
      if (new_qty < 0) {
        new_qty = 0;
      }
      // await remove_cart_item({
      //     id:cartdata?cartdata.id:0,
      // })
    }
    const reqdata = {
      product_id: id,
      qty: new_qty,
    };

    if (new_qty > stock) {
      alert("Out of stock!");
    } else {
      await add_cart(reqdata);
      // debugger;
      await get_cart_items().then((rs) => {
        if (rs && rs.status) {
          dispatch(updatecarts(rs));
        }
      });

      setCompData({
        qty: new_qty,
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    updateCartQty(e.target.name);
  };

  useEffect(() => {
    if (props.is_cart) {
      setCompData({
        qty: props.cartdata.qty,
      });
    } else {
      setCompData({
        qty: 0,
      });
    }
    // console.log('ppppp',props);
  }, [props]);

  var label = "";
  if (mark_as_bestoffers) {
    label = <ProductLabel name="Best Offer" color="red" />;
  } else if (mark_as_new) {
    label = <ProductLabel name="New" color="blue" />;
  }

  return (
    <div className={props.column_not_cut ? "" : "col-6 col-md-3 col-lg-3"}>
      <div className="product product-11 text-center">
        <figure className="product-media">
          {label}

          <Link
            to={{
              pathname: "/product-details/" + hifen_name + "/" + id,
            }}
          >
            {combo_product ? (
              <img
                src={imageUrl ? imageUrl : defaultImage}
                alt="Product"
                className="product-image"
              />
            ) : (
              <HoverImage
                src={imageUrl ? imageUrl : defaultImage}
                hoverSrc={hoverimageUrl}
                alt="Product"
                className="product-image"
              />
            )}
          </Link>
          {user ? (
            <div className="product-action-vertical">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => add_wishlist(id)}
                className="btn-product-icon btn-wishlist"
              >
                <span>add to wishlist</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </figure>

        <div className="product-body">
          <div className="product-cat"></div>
          <h3 className="product-title">
            <Link
              to={{
                pathname: "/product-details/" + hifen_name + "/" + id,
              }}
            >
              {name ? name : ""}
            </Link>
          </h3>
          <div className="product-price">
            {!selling_price ? (
              ""
            ) : mrp > selling_price ? (
              <>
                <span className="new-price">₹{selling_price}</span>
                <span className="old-price">Was ₹{mrp}</span>
              </>
            ) : (
              <span className="new-price">₹{selling_price}</span>
            )}
          </div>
          <div>
            <h5 className="net-weight">
              Net Weight:{net_wt}
              {unit}
            </h5>
          </div>
        </div>
        <div className="product-action">
          {!selling_price || stock == 0 ? (
            <button
              style={{ cursor: "not-allowed" }}
              name="plus"
              value="1"
              onClick={() => alert("Sorry! This Product is Out of stock")}
              className="btn-product btn-cart hsbutonhover button-out-of-stock"
              disabled={true}
            >
              Out Of Stock
            </button>
          ) : parseInt(compData.qty) ? (
            <div className="m-auto">
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
                  readOnly
                />
                <input
                  type="text"
                  name="qty"
                  onClick={handleChange}
                  value={compData.qty}
                  className="qty form-control"
                  readOnly
                />
                <input
                  type="button"
                  name="plus"
                  onClick={handleChange}
                  value="+"
                  className="qtyplus btn btn-success btn-sm"
                  readOnly
                />
              </form>
            </div>
          ) : (
            <button
              name="plus"
              value="1"
              onClick={handleChange}
              className="btn-product btn-cart hsbutonhover"
            >
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect()(Product);
