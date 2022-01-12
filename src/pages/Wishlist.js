import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpinLoader from "../components/loader/SpinLoader";
import {
  add_cart,
  fetch_wishlists,
  get_cart_items,
  remove_to_wishlist,
} from "../components/server/api";
import { updatecarts } from "../redux/cart/cart.action";
import { setWishlistData } from "../redux/global/global.action";
import "./Wishlist.css";

const ProductRow = (props) => {
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

  const handleChange = (e) => {
    e.preventDefault();
    updateCartQty(e.target.name);
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

  const fetchwishlists = async () => {
    await fetch_wishlists().then((rs) => {
      if (rs.status) {
        // setCompData(rs.data)
        // debugger
        dispatch(setWishlistData(rs.data));
      }
    });
  };

  const remove_wishlist = async (id) => {
    // return
    remove_to_wishlist({
      product_id: id,
    }).then((rs) => {
      if (rs.status) {
        fetchwishlists();
        alert("Product removed from wishlist");
      } else {
        alert(rs.message);
      }
    });
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
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <tr>
      <td class="product-col">
        <div class="product">
          <figure class="product-media">
            <Link
              to={{
                pathname: "/product-details/" + hifen_name.toLowerCase() + "/" + id,
              }}
            >
              <img src={imageUrl} alt="Product image" />
            </Link>
          </figure>
          <h3 class="product-title">
            <Link
              to={{
                pathname: "/product-details/" + hifen_name.toLowerCase() + "/" + id,
              }}
            >
              {name}
            </Link>
          </h3>
        </div>
      </td>

      <td class="price-col">₹{selling_price}</td>
      <td class="stock-col">
        <span class="in-stock">
          {!selling_price || stock == 0 ? "Out Stock" : "In Stock"}
        </span>
      </td>
      <td class="action-col">
        {!selling_price || stock == 0 ? (
          <button
            style={{ cursor: "not-allowed" }}
            name="plus"
            value="1"
            onClick={() => alert("Sorry! This Product is Out of stock")}
            className="btn-product btn-cart hsbutonhover out-of-stock"
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
                className="qtyminus btn btn-success btn-sm cart_button_custom"
                style={{
                  height: "28px",
                }}
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
                className="qtyplus btn btn-success btn-sm cart_button_custom"
                style={{
                  height: "28px",
                }}
                readOnly
              />
            </form>
          </div>
        ) : (
          <button
            name="plus"
            value="1"
            onClick={handleChange}
            class="btn btn-block btn btn-primary ca-bt"
          >
            Add to Cart
          </button>
        )}
      </td>
      <td class="action-col">
        <button
          name="buynow"
          value="1"
          onClick={handleChange}
          class="btn btn-block btn btn-primary bu-bt"
        >
          Buy Now
        </button>
      </td>
      <td class="remove-col">
        <button onClick={() => remove_wishlist(id)} class="btn-remove">
          <i class="icon-close"></i>
        </button>
      </td>
    </tr>
  );
};

const Wishlist = (props) => {
  const products = useSelector((state) => state.global.wishlists);
  const dispatch = useDispatch();

  // const [products,setCompData] = useState([])

  const [canMove, setCanMove] = useState(0);

  const fetchwishlists = async () => {
    await fetch_wishlists().then((rs) => {
      if (rs.status) {
        // setCompData(rs.data)
        // debugger
        dispatch(setWishlistData(rs.data));
      }
      setCanMove(1);
    });
  };

  useEffect(() => {
    fetchwishlists();
  }, []);

  if (canMove === 0) {
    return <SpinLoader />;
  } else {
    return (
      <>
        <div className="page-content pb-0">
          <div className="container">
            <table class="table table-wishlist table-mobile">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {products
                  ? products.map((dt) => {
                      return <ProductRow {...dt} />;
                    })
                  : ""}
                {/* <tr>
                                    <td class="product-col">
                                        <div class="product">
                                            <figure class="product-media">
                                                <a href="#">
                                                    <img src="assets/images/products/table/product-1.jpg" alt="Product image" />
                                                </a>
                                            </figure>
                                            <h3 class="product-title">
                                                <a href="#">Chicken boneless</a>
                                            </h3>
                                        </div>
                                    </td>
    
                                    <td class="price-col">₹84.00</td>
                                    <td class="stock-col"><span class="in-stock">In stock</span></td>
                                    <td class="action-col">
                                        <button class="btn btn-block btn btn-primary ca-bt">Add to Cart</button>
                                    </td>
                                    <td class="action-col">
                                        <button class="btn btn-block btn btn-primary bu-bt">Buy Now</button>
                                    </td>
                                    <td class="remove-col"><button class="btn-remove"><i class="icon-close"></i></button></td>
                                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

export default Wishlist;
