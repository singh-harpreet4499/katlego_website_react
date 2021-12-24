import "./UnitFilter.css";

const UnitFilter = (props) => {
  return (
    <div>
      <ul className="nav nav-pills nav-border-anim gram-tab">
        <li className="nav-item nav-item-style">
          <a
            className="nav-link active nav-link-active-style"
            id="top-all-link"
          >
            250gms
          </a>
        </li>
        <li className="nav-item nav-item-style2">
          <a
            className="nav-link "
            id="top-fur-link"
            style={{ backgroundColor: "#9b9b9b" }}
          >
            500gms
          </a>
        </li>
        <li className="nav-item ">
          <a
            className="nav-link "
            id="top-decor-link"
            style={{
              backgroundColor: "#d3d3d3",
              borderBottomRightRadius: "6px",
              paddingRight: "25px",
              paddingLeft: "20px",
            }}
          >
            1kg+
          </a>
        </li>
      </ul>
    </div>
  );
};
export default UnitFilter;
