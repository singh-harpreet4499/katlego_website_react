import logo from "../../libs/images/logo.png";
import React from "react";
import { geolocated } from "react-geolocated";
import {
  check_if_service_location,
  fetch_locations,
  fetch_navbar_categories,
  fetch_navbar_category_product,
  showAlertMessage,
} from "../server/api";
import NavCart from "../cart/NavCart";
import { connect, useSelector } from "react-redux";
import LocationModal from "../modals/LocationModal";
import { setUserLocation } from "../../redux/user/user.action";
import { Link } from "react-router-dom";
import banner1 from "../../libs/images/menu/banner-1.jpg";
import Search from "./Search";

const MobileMenu = (props) => {
  const { navbar_category } = props;

  return (
    <div>
      <div className="mobile-menu-overlay"></div>

      <div className="mobile-menu-container mobile-menu-light">
        <div className="mobile-menu-wrapper">
          <span onClick={closeMobileMenue} className="mobile-menu-close">
            <i className="icon-close"></i>
          </span>

          {/* <form action="/" method="get" className="mobile-search">
							<label htmlFor="mobile-search" className="sr-only">Search</label>
							<input type="search" className="form-control" name="mobile-search" id="mobile-search" placeholder="Search product ..." required />
							<button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
						</form> */}

          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="mobile-menu-link"
                data-toggle="tab"
                href="#mobile-menu-tab"
                role="tab"
                aria-controls="mobile-menu-tab"
                aria-selected="true"
              >
                Menu
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <ul className="mobile-menu">
                  <li>
                    <Search />
                  </li>
                  <li className="active " style={{ backgroundColor: "#fff" }}>
                    <Link
                      onClick={closeMobileMenue}
                      to={{
                        pathname: "/",
                      }}
                    >
                      Home
                    </Link>
                  </li>

                  {props.nav_categories.length ? (
                    props.nav_categories.map((dt, index) => {
                      if (index < 10) {
                        return (
                          <li>
                            <Link
                              onClick={closeMobileMenue}
                              className="sf-with-ul"
                              to={{
                                pathname:
                                  "/product-list/" +
                                  dt.name.replace(/\s+/g, "-").toLowerCase() +
                                  "/" +
                                  dt.id,
                                state: { ...dt },
                              }}
                            >
                              {dt.name}
                            </Link>
                          </li>
                        );
                      } else {
                        return "";
                      }
                    })
                  ) : (
                    <>
                      <li>
                        <Link
                          onClick={closeMobileMenue}
                          to="/about-us"
                          className="sf-with-ul"
                        >
                          ABOUT US
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={closeMobileMenue}
                          to="/general-enquiry"
                          className="sf-with-ul"
                        >
                          CONTACT US
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link
                      onClick={closeMobileMenue}
                      to={{
                        pathname: "recipe-list",
                      }}
                    >
                      RECIPES
                    </Link>
                  </li>
                  <li>
                    <li>
                      <Link
                        onClick={closeMobileMenue}
                        to={{ pathname: "/wishlist" }}
                      >
                        Wishlists
                      </Link>
                    </li>

                    <Link
                      onClick={closeMobileMenue}
                      to="/about-us"
                      className="sf-with-ul"
                    >
                      ABOUT US
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={closeMobileMenue}
                      to="/general-enquiry"
                      className="sf-with-ul"
                    >
                      CONTACT US
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/katlegofoodsindia"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f"></i>
            </a>
            {/* <a href="/" className="social-icon" target="_blank" title="Twitter"><i className="icon-twitter"></i></a> */}
            <a
              href="https://www.instagram.com/katlego_foods/"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/watch?v=W0UYKgfQi9k"
              className="social-icon"
              target="_blank"
              title="Youtube"
            >
              <i className="icon-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
const openMobileMenue = (event) => {
  document.body.classList.add("loaded");
  document.body.classList.add("mmenu-active");
};
const closeMobileMenue = (event) => {
  document.body.classList.add("loaded");
  document.body.classList.remove("mmenu-active");
};

function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

const ConditionalLink = (props) => {
  const { items } = useSelector((state) => state.cart);
  if (items.length) {
    return (
      <Link
        // onClick={this.props.cart.length==0 ? false : true}
        to={{
          pathname: "/checkout",
        }}
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        {props.children}
      </Link>
    );
  } else {
    return (
      <span
        style={{ cursor: "pointer" }}
        //  href="#"
        onClick={() =>
          showAlertMessage("oops!", "No Items in your Cart", false, true)
        }
        className="dropdown-toggle"
        //  role="button"
        //  data-toggle="dropdown"
        //  aria-haspopup="true"
        //  aria-expanded="false"
        //  data-display="static"
      >
        {props.children}
      </span>
    );
  }
};
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location_modal: false,
      pincode: "",
      latitude: "",
      longitude: "",
      formatted_address: "",
      locations: [],
      all_data_fetch: 0,
      is_location_available: 0,
      city: "",
      state: "",
      navbar_category: [],
      nav: false,
      nav_categories: [],
      searchbar: false,
    };
  }

  toggleSearchBar = () => {
    this.setState({ searchbar: !this.state.searchbar });
  };

  // hideMobileMenu = (event) => {
  // 	document.body.classList.remove('loaded');
  // 	this.setState({ showModal: false });
  // }

  locationstatus = async () => {
    const locationapi = await fetch_locations({});
    if (locationapi.status) {
      this.setState({
        locations: locationapi.data,
      });
    }

    const setlc = !this.props.isGeolocationAvailable
      ? {
          status: false,
          message: "Your browser does not support Geolocation",
          location_enabled: true,
        }
      : !this.props.isGeolocationEnabled
      ? {
          status: false,
          message: "Geolocation is not enabled",
          location_enabled: false,
        }
      : this.props.coords
      ? {
          status: true,
          message: "",
          location_enabled: true,
          data: this.props.coords,
        }
      : {
          status: false,
          message: "",
          location_enabled: true,
          data: this.props.coords,
        };

    if (setlc.status) {
      const lat_lon = {
        latitude: setlc.data.latitude,
        longitude: setlc.data.longitude,
      };
      this.setState(lat_lon);

      const check_service_location = await check_if_service_location(lat_lon);
      if (check_service_location.status) {
        this.setState({
          all_data_fetch: 1,
          is_location_available: 1,
          formatted_address: check_service_location.formatted_address,
          city: check_service_location.city,
          state: check_service_location.state,
          pincode: check_service_location.pincode,
        });
      } else {
        // alert('currently we are not providing services in your area')
        this.setState({
          // city:check_service_location.city,
          // state:check_service_location.state,
          all_data_fetch: 1,
          is_location_available: 0,
          formatted_address: check_service_location.formatted_address,
          pincode: check_service_location.pincode,
        });
      }
    }

    const locationdatalocal = localStorage.getItem("setUserLocation");
    if (locationdatalocal) {
      var savelocationstate = JSON.parse(locationdatalocal);
      this.props.setUserLocation(savelocationstate);
      this.setState({
        location_modal: false,
      });
    } else {
      this.setState({
        location_modal: true,
      });
    }
  };

  fetch_navbar_product = async () => {
    fetch_navbar_category_product({}).then((rs) => {
      if (rs.status) {
        this.setState({
          navbar_category: rs.data,
        });
      }
    });
    fetch_navbar_categories({}).then((rs) => {
      if (rs.status) {
        // alert(JSON.stringify(rs))
        this.setState({
          nav_categories: rs.data,
        });
      }
    });
  };

  handleScroll = () => {
    if (window.pageYOffset > 140) {
      if (!this.state.nav) {
        this.setState({ nav: true });
      }
    } else {
      if (this.state.nav) {
        this.setState({ nav: false });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.locationstatus();
    this.fetch_navbar_product();
    if (this.props.locationstate && this.props.locationstate.is_set) {
      this.setState({
        location_modal: false,
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll");
  }

  render() {
    // console.log("location state", this.state);
    const { locations, location_modal, navbar_category } = this.state;
    var lc_modal = (
      <LocationModal show={location_modal} locations={locations} />
    );

    return (
      <div>
        {lc_modal}
        <MobileMenu
          navbar_category={navbar_category}
          nav_categories={this.state.nav_categories}
        />

        <header className="header">
          {/* sticky-header fixed */}
          <div
            className={
              this.state.nav
                ? "header-middle sticky-header fixed"
                : "header-middle"
            }
          >
            <div className="container">
              <div className="header-left">
                <button
                  onClick={openMobileMenue}
                  className="mobile-menu-toggler"
                >
                  <span className="sr-only">Toggle mobile menu</span>
                  <i className="icon-bars"></i>
                </button>

                <a href="/" className="logo">
                  <img src={logo} alt="Katlego" width="160" />
                </a>

                <nav className="main-nav">
                  {this.state.nav ? (
                    <ul className="menu sf-arrows">
                      {/* <li>
													<Link to="/" className="sf-with-ul">
														Home
													</Link>
												</li> */}

                      {this.state.nav_categories.length ? (
                        this.state.nav_categories.map((dt, index) => {
                          if (index < 5) {
                            return (
                              <li>
                                <Link
                                  className="sf-with-ul"
                                  to={{
                                    pathname:
                                      "/product-list/" +
                                      dt.name
                                        .replace(/\s+/g, "-")
                                        .toLowerCase() +
                                      "/" +
                                      dt.id,
                                    state: { ...dt },
                                  }}
                                >
                                  {dt.name}
                                </Link>
                              </li>
                            );
                          } else {
                            return "";
                          }
                        })
                      ) : (
                        <>
                          <li>
                            <Link
                              to={{
                                pathname: "/recipe-list",
                              }}
                            >
                              RECIPES
                            </Link>
                          </li>
                          <li>
                            <Link to="/about-us" className="sf-with-ul">
                              ABOUT US
                            </Link>
                          </li>

                          <li>
                            <Link to="/general-enquiry" className="sf-with-ul">
                              CONTACT US
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  ) : (
                    <ul className="menu sf-arrows">
                      <li>
                        <Link to="/" className="sf-with-ul">
                          Home
                        </Link>
                      </li>

                      <li className="down_arrow">
                        <a href="#" className="sf-with-ul">
                          Menu
                        </a>
                        <div className="megamenu megamenu-md">
                          <div className="row no-gutters">
                            <div className="col-md-8">
                              <div className="menu-col">
                                <div className="row">
                                  {navbar_category.length
                                    ? navbar_category.map((data) => {
                                        return (
                                          <div className="col-md-6">
                                            <div className="menu-title">
                                              {data.name.toUpperCase()}
                                            </div>
                                            <ul>
                                              {data.products.length
                                                ? data.products.map(
                                                    ({
                                                      id,
                                                      name,
                                                      hifen_name,
                                                    }) => {
                                                      return (
                                                        <li>
                                                          <Link
                                                            to={{
                                                              pathname:
                                                                "/product-details/" +
                                                                hifen_name.toLowerCase() +
                                                                "/" +
                                                                id,
                                                            }}
                                                          >
                                                            {name}
                                                          </Link>
                                                        </li>
                                                      );
                                                    }
                                                  )
                                                : ""}
                                            </ul>
                                          </div>
                                        );
                                      })
                                    : ""}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div class="banner banner-overlay">
                                <a href="#" class="banner banner-menu">
                                  <img src={banner1} alt="Banner" />
                                  <div class="banner-content banner-content-top">
                                    <div class="banner-title text-white">
                                      The <br />
                                      Best
                                      <br />
                                      <span>
                                        <strong>Choice</strong>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <Link to="/recipe-list" className="sf-with-ul">
                          RECIPES
                        </Link>
                      </li>

                      <li>
                        <Link to="/about-us" className="sf-with-ul">
                          ABOUT US
                        </Link>
                      </li>

                      <li className="down_arrow">
                        <Link to="/general-enquiry" className="sf-with-ul">
                          CONTACT US
                        </Link>
                        <ul>
                          <li>
                            <Link to="/general-enquiry">General Enquiry</Link>
                          </li>
                          <li>
                            <Link to="/career">Career</Link>
                          </li>
                          <li>
                            <Link to="/collabrate-with-us">
                              Collaborate With Us
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )}
                </nav>
              </div>

              <div className="header-right">
                <div className="header-search">
                  <span
                    onClick={this.toggleSearchBar}
                    className={
                      this.state.searchbar
                        ? "search-toggle active"
                        : "search-toggle"
                    }
                    role="button"
                    title="Search"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="icon-search"></i>
                  </span>

                  {this.state.searchbar ? <Search /> : ""}
                  {/* <Search  /> */}
                </div>
                {this.props.currentUser ? (
                  <div className="dropdown cart-dropdown">
                    <ConditionalLink>
                      <i className="icon-shopping-cart"></i>
                      {this.props.cart.length ? (
                        <span className="cart-count">
                          {this.props.cart.length}
                        </span>
                      ) : (
                        ""
                      )}
                    </ConditionalLink>

                    {this.props.cart.length ? (
                      <>
                        <NavCart
                          total_amount={this.props.total_amount}
                          cart={this.props.cart}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div className="header-dropdown use-account">
                  <Link to={{ pathname: "/my_account" }} className="use-mar">
                    <i className="icon-user"></i>
                  </Link>
                  <div class="header-menu">
                    <ul>
                      <li>
                        <Link to={{ pathname: "/my_account" }}>My Account</Link>
                      </li>
                      <li>
                        <Link to={{ pathname: "/wishlist" }}>Wishlists</Link>
                      </li>
                      {/* <li><Link to="/collabrate-with-us">Collaborate With Us</Link></li> */}
                    </ul>
                  </div>
                </div>

                <div className="use-account">
                  <Link
                    to={{ pathname: "/wallet-history" }}
                    className="use-mar"
                  >
                    {this.props.currentUser ? (
                      <p className="wallet_text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-wallet2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                        </svg>
                        {nFormatter(this.props.currentUser.wallet)}
                      </p>
                    ) : (
                      ""
                    )}
                  </Link>
                </div>

                <div className="header-dropdown">
                  <a href="#" className="del">
                    <i
                      className="fa fa-map-marker mr-2"
                      onClick={() =>
                        this.setState({
                          location_modal: !this.state.location_modal,
                        })
                      }
                    ></i>{" "}
                    {this.props.locationstate
                      ? this.props.locationstate.name
                      : ""}
                  </a>
                  <div className="header-menu">
                    <ul>
                      {locations.length
                        ? locations.map(({ id, name }) => {
                            return (
                              <li key={id}>
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.setState({
                                      location_modal:
                                        !this.state.location_modal,
                                    })
                                  }
                                >
                                  {name}
                                </div>
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({
  currentUser: user.currentUser,
  cart: cart.items,
  total_amount: cart.total_amount,
  locationstate: user.location,
});
export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(connect(mapStateToProps, { setUserLocation })(Navbar));
