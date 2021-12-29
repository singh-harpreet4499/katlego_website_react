import { useState } from "react";
import "./RangeSlider.css";

const RangeSlider = ({ onChange }) => {
  const [slider, setSlider] = useState({
    max: 10000,
    min: 50,
    value: 0,
    type: "range",
    label: "",
  });

  //   const onSlide = () => {
  //     onChange(slider.value);
  //   };
  //   console.log(slider);
  return (
    <div>
      <p>{slider.label}</p>
      <input
        type="range"
        min={slider.min}
        max={slider.max}
        value={slider.value}
        onChange={() => setSlider({ min: 0, max: 10000 })}
        className="slider"
      ></input>
    </div>
  );
};
export default RangeSlider;
