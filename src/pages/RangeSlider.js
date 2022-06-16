import React, { useState, useRef, useCallback, useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./RangeSlider.css";

// const RangeSlider = ({ onChange }) => {
//   const [slider, setSlider] = useState({
//     max: 1000,
//     min: 0,
//     value: 0,
//     type: "range",
//     label: "",
//   });

//   const onSlide = () => {
//     onChange(slider.value);
//   };
//   console.log(slider);
//   return (
//     <>
//       <div>
//         <p>{slider.label}</p>
//         <input
//           type="range"
//           min={slider.min}
//           max={slider.max}
//           value={slider.value}
//           onChange={() => setSlider({ min: 0, max: 1000 })}
//           className="slider"
//         ></input>
//       </div>
//     </>
//   );
// };

// export default RangeSlider;

const RangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <div>
        <div className="container-range">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            ref={minValRef}
            onChange={(event) => {
              const value = Math.min(+event.target.value, maxVal - 1);
              setMinVal(value);
              // console.log(minVal);
              event.target.value = value.toString();
            }}
            className={classnames("thumb thumb--zindex-3", {
              "thumb--zindex-5": minVal > max - 100,
            })}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
              const value = Math.max(+event.target.value, minVal + 1);
              setMaxVal(value);
              event.target.value = value.toString();
            }}
            className="thumb thumb--zindex-4"
          />

          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            {/* <div className="slider__left-value">{minVal}</div>
            <div className="slider__right-value">{maxVal}</div> */}
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-6">
          <label>Min</label>
          <input
            class="form-control"
            name="min_amount"
            onChange={(e) => {
              if (e.target.value < maxVal) {
                setMinVal(e.target.value);
              }
            }}
            placeholder="₹0"
            min="0"
            type="number"
            value={minVal}
          />
        </div>
        <div class="form-group text-right col-6">
          <label>Max</label>
          <input
            class="form-control"
            name="max_amount"
            onChange={(e) => {
              const val = e.target.value;
              if (val <= max && val >= min) {
                setMinVal(0);
                setMaxVal(val);
              }
            }}
            placeholder="₹1,000"
            min="0"
            type="number"
            value={maxVal}
          />
        </div>
      </div>
    </>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RangeSlider;
