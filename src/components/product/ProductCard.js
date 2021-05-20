import { useState } from "react";

const ProductCard = async (props) => {
  const [formData, updateFormData] = useState({
    qty: 1,
  });
  const { name, imageUrl, mrp, discount, selling_price, hifen_name, id } =props;

  const updateCartQty = async (logic) => {
    var old_qty = parseInt(formData.qty);
    var new_qty = old_qty;
    if (logic === "plus") {
      new_qty = old_qty + 1;
    } else if (logic === "minus") {
      new_qty = old_qty - 1;
      if (new_qty < 0) {
        new_qty = 0;
      }
    }
    updateFormData({
      qty: new_qty,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    updateCartQty(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="col-6 col-md-3 mb-3">
      <div
        className="
                          list-card
                          bg-white
                          h-100
                          rounded
                          overflow-hidden
                          position-relative
                          shadow-sm
                        "
      >
        <div className="list-card-image">
          <a href="product_details.html" className="text-dark">
            <div className="member-plan position-absolute">
              <span className="badge m-3 badge-danger">10%</span>
            </div>
            <div className="p-3">
              <img
                src={imageUrl}
                className="img-fluid item-img w-100 mb-3"
                alt=""
              />
              <h6>{name}</h6>
              <div className="d-flex align-items-center">
                <h6 className="price m-0 text-success">
                  {parseFloat(mrp) > parseFloat(selling_price) ? (
                    <div>
                      <strike className="pri">₹{mrp}</strike>₹{selling_price}{" "}
                      <br />
                      <span className="off">({discount} % off)</span>
                    </div>
                  ) : (
                    <div>₹{selling_price}</div>
                  )}
                </h6>
                {/* <a
                                  data-toggle="collapse"
                                  href="#collapseExample1"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="collapseExample1"
                                  className="btn btn-success btn-sm ml-auto"
                                  >+</a> */}
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
                      value={formData.qty}
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
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};


export default ProductCard