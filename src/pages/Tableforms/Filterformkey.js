import React from "react";
import "./styles/Filterformkey.css";

function Filterformkey() {
  return (
    <div className="boxfilersearch-formkeys">
      <div className="textfilterlogo-formkeys">
        <p> Filter </p>
      </div>

      {/* <div className="fliter-key-formkeys">
        <p className="textfilter-formkeys"> Form key </p>
        <input
          className="seacrh-formkeys"
          type="text"
          placeholder="Search"
        />
      </div> */}

      <div className="fliter-name-formkeys">
        <p className="textfilter-formkeys"> Form name </p>
        <input
          className="seacrh-formkeys"
          type="text"
          placeholder="Search"
        />
      </div>

      {/* <div className="fliter-Considered-formkeys">
        <p className="textfilter-formkeys"> Create </p>
        <input
          className="seacrhdate-formkeys"
          type="date"
          placeholder="dd/mm/yyyy"
        />
        </div> */}

        <div className="btnfilterformkeys">
        <button className="btncalerformkeys" >
          Clear All Filter
        </button>
        <button className="btnsearchsformkeys" >
          Search
        </button>
      </div>
    </div>
  );
}

export default Filterformkey;
