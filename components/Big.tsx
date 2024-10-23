import React from "react";
import "@/styles/big.css";


const Big = () => {
    
  return (
    <div className="wrapper">
      <div className="container">
        <input type="radio" name="slide" id="c1" />
        <label className="card" htmlFor="c1">

        </label>

        <input type="radio" name="slide" id="c2" />
        <label className="card" htmlFor="c2"></label>

        <input type="radio" name="slide" id="c3" />
        <label className="card" htmlFor="c3">
        </label>
        <input type="radio" name="slide" id="c4" />
        <label className="card" htmlFor="c4"></label>
        <input type="radio" name="slide" id="c5" />
        <label className="card" htmlFor="c5"></label>
        <input type="radio" name="slide" id="c6" />
        <label className="card" htmlFor="c6"></label>
      </div>
    </div>
  );
};

export default Big;