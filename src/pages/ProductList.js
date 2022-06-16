import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import {
  fetch_products_by_category,
  fetch_wishlists,
} from "../components/server/api";

import SpinLoader from "../components/loader/SpinLoader";
import FooterSupport from "../components/footer/FooterSupport";
import RangeSlider from "./RangeSlider";

const ProductList = (props) => {
  const urlparamsdata = useParams();

  const [compData, setCompData] = useState({
    products: [],
  });
  const [categoryid, setCategoryId] = useState(0);

  const [filtered, setFiltered] = useState([]);

  const [weightwise, setWeightWise] = useState(null);

  const [formData, updateFormData] = useState({
    sort_by: "",
    min_amount: 0,
    max_amount: 0,
  });

  const [filter_show, showFilter] = useState(0);

  const [canMove, setCanMove] = useState(0);

  const toggleFilterModal = () => showFilter(!filter_show);

  const handleChange = (e) => {
    // alert(e.target.value.trim())
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const fetch_products_list = async () => {
    setCategoryId(urlparamsdata.id);
    await fetch_products_by_category({
      category_id: urlparamsdata.id,
    }).then((rs) => {
      if (rs.status) {
        setCompData({
          products: rs.data,
        });
      }
      setCanMove(1);
    });
  };

  const fetchwishlists = async () => {
    await fetch_wishlists().then((rs) => {
      if (rs.status) {
        setCompData({
          products: rs.data,
        });
      }
      setCanMove(1);
    });
  };

  const set_weight_measure = (ms) => {
    // setFiltered(e);
    // net_Wt
    if (compData.products.length) {
      var dataprod = compData.products;
      if (ms == "250") {
        const d1 = dataprod.filter((obj) => {
          return obj.net_wt == 250;
        });
        setFiltered(d1);
      } else if (ms == "500") {
        const d2 = dataprod.filter((obj) => {
          return obj.net_wt == 500;
        });
        setFiltered(d2);
      } else if (ms == "1") {
        const d3 = dataprod.filter((obj) => {
          return obj.net_wt >= 1 && obj.unit == "KG";
        });
        setFiltered(d3);
      }
    }
  };

  const apply_filter = () => {
    toggleFilterModal();
    const { sort_by } = formData;

    var min_amount = parseFloat(formData.min_amount);
    // console.log(sort_by, "hi");
    // console.log(min_amount, "hello");
    var max_amount = parseFloat(formData.max_amount);
    // console.log(compData, "hi1");
    // console.log(max_amount, "hello1");
    if (compData.products.length) {
      var dataprod = compData.products;
      if (sort_by === "cost_low_to_high") {
        const a = dataprod.sort((a, b) => {
          return a.selling_price - b.selling_price;
        });
        setFiltered(a);
      } else if (sort_by === "cost_high_to_low") {
        const b = dataprod.sort((a, b) => {
          return b.selling_price - a.selling_price;
        });
        setFiltered(b);
      } else if (sort_by === "top_rated") {
        const c = dataprod.sort((a, b) => {
          return b.rating.average - a.rating.average;
        });
        setFiltered(c);
      } else if (sort_by === "most_popular") {
        const c = dataprod.sort((a, b) => {
          return b.rating.average - a.rating.average;
        });
        setFiltered(c);
      }

      if (min_amount != 0 && max_amount == 0) {
        const f = dataprod.sort((a, b) => {
          return a.selling_price >= parseFloat(min_amount);
        });
        // console.log(filtered);
        setFiltered(f);
      } else if (max_amount != 0) {
        const d = dataprod.sort((a, b) => {
          return (
            a.selling_price >= parseFloat(min_amount) &&
            b.selling_price <= parseFloat(max_amount)
          );
        });
        // console.log(filtered);
        setFiltered(d);
      } else if (min_amount != 0) {
        const e = dataprod.sort((a, b) => {
          return (
            a.selling_price >= parseFloat(min_amount) &&
            b.selling_price <= parseFloat(max_amount)
          );
        });
        // console.log(filtered);
        setFiltered(e);
      }
    }
  };

  useEffect(() => {
    if (urlparamsdata.id === "products") {
      fetchwishlists();
    } else {
      if (!compData.products.length) {
        fetch_products_list();
        // console.log(compData.products);
      } else if (categoryid != urlparamsdata.id) {
        fetch_products_list();
      }
    }
  }, [filtered, urlparamsdata]);

  if (canMove === 0) {
    return <SpinLoader />;
  } else {
    return (
      <main>
        <div
          class={`modal fade right-modal ${filter_show ? "show" : ""}`}
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-modal="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Filter
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={toggleFilterModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-0">
                <div class="osahan-filter">
                  <div class="filter">
                    <div class="p-3 bg-light border-bottom">
                      <h6 class="m-0">SORT BY</h6>
                    </div>
                    <div class="custom-control border-bottom px-0  custom-radio">
                      <input
                        type="radio"
                        id="customRadio1"
                        name="sort_by"
                        value="top_rated"
                        onChange={handleChange}
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label py-3 w-100 px-3"
                        for="customRadio1"
                      >
                        Top Rated
                      </label>
                    </div>
                    <div class="custom-control border-bottom px-0  custom-radio">
                      <input
                        type="radio"
                        id="customRadio3"
                        name="sort_by"
                        value="cost_high_to_low"
                        onChange={handleChange}
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label py-3 w-100 px-3"
                        for="customRadio3"
                      >
                        Cost High to Low
                      </label>
                    </div>
                    <div class="custom-control border-bottom px-0  custom-radio">
                      <input
                        type="radio"
                        id="customRadio4"
                        name="sort_by"
                        value="cost_low_to_high"
                        onChange={handleChange}
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label py-3 w-100 px-3"
                        for="customRadio4"
                      >
                        Cost Low to High
                      </label>
                    </div>
                    <div class="custom-control border-bottom px-0  custom-radio">
                      <input
                        type="radio"
                        id="customRadio5"
                        name="sort_by"
                        value="most_popular"
                        onChange={handleChange}
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label py-3 w-100 px-3"
                        for="customRadio5"
                      >
                        Most Popular
                      </label>
                    </div>
                    <div class="p-3 bg-light border-bottom">
                      <h6 class="m-0">ADDITIONAL FILTERS</h6>
                    </div>
                    <div class="px-3 pt-3">
                      <RangeSlider
                        min={0}
                        max={1000}
                        onChange={({ min, max }) =>
                          console.log(`min = ${min}, max = ${max}`)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer p-0 border-0">
                  <div class="col-6 m-0 p-0">
                    <button
                      type="button"
                      class="btn border-top btn-lg btn-block"
                      onClick={toggleFilterModal}
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                  <div class="col-6 m-0 p-0">
                    <button
                      type="button"
                      onClick={apply_filter}
                      class="btn btn-success btn-lg btn-block sche"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-4 osahan-main-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12">
                <div className="osahan-listing">
                  <div className="d-flex align-items-center mb-3">
                    <div className="heading mb-1">
                      <h4 className="headingcold">
                        {urlparamsdata.id == "products"
                          ? "Wishlists"
                          : urlparamsdata.categoryName
                          ? urlparamsdata.categoryName.toUpperCase()
                          : ""}
                      </h4>
                    </div>
                    <ul className="nav nav-pills nav-border-anim gram-tab">
                      <li className="nav-item nav-item-style">
                        <button
                          onClick={() => set_weight_measure("250")}
                          className="nav-link active nav-link-active-style smallButton"
                          id="top-all-link"
                          style={{
                            marginLeft: "5px",
                            marginTop: "5px",
                          }}
                        >
                          250 gms
                        </button>
                      </li>
                      <li className="nav-item nav-item-style2">
                        <button
                          onClick={() => set_weight_measure("500")}
                          className="nav-link smallButton"
                          id="top-fur-link"
                          style={{
                            backgroundColor: "#9b9b9b",
                            marginLeft: "0px",
                            marginTop: "5px",
                          }}
                        >
                          500 gms
                        </button>
                      </li>
                      <li className="nav-item ">
                        <button
                          onClick={() => set_weight_measure("1")}
                          className="nav-link smallButton"
                          id="top-decor-link"
                          style={{
                            backgroundColor: "#d3d3d3",
                            borderBottomRightRadius: "6px",
                            paddingRight: "12px",
                            paddingLeft: "20px",
                            marginLeft: "0px",
                            marginTop: "5px",
                          }}
                        >
                          1 kg+
                        </button>
                      </li>
                    </ul>
                    <div className="m-0 text-center ml-auto">
                      <div
                        onClick={toggleFilterModal}
                        style={{ cursor: "pointer", marginTop: "-20px" }}
                        className=" text-muted bg-white mr-2 smallButton2"
                      >
                        <i className="icofont-filter mr-1"></i> Filter {"&"}{" "}
                        Sort
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {filtered.length
                      ? filtered.map(({ id, ...otherData }) => {
                          return (
                            <ProductCard
                              column_not_cut={false}
                              key={id}
                              id={id}
                              {...otherData}
                            />
                          );
                        })
                      : compData.products.length
                      ? compData.products.map(({ id, ...otherData }) => {
                          return (
                            <ProductCard
                              column_not_cut={false}
                              key={id}
                              id={id}
                              {...otherData}
                            />
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSupport />
        </section>
      </main>
    );
  }
};
export default ProductList;
