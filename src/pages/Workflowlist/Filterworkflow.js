import React, { useState } from "react";
import "./Styles/Filterworkflow.css";

const FilterWorkflow = ({setSearchShow, setWorkflowName}) => {

  const [query, setQuery] = useState("");

  // enter event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchworkflowname();
    }
  };

  // Search Name Workflow
  const searchworkflowname = async () => {
    //setDefaultShow(false);
    setSearchShow(true);
    setWorkflowName(`%${query}%`);
    console.log("Searh one click");
  };

  // CalerFilte
  const CalerFilte = () => {
    searchworkflowname("");
    setQuery("");
    //setDefaultShow(true);
    setSearchShow(false);
  };
  return (
    <div className="boxfilersearch-workflow">
      <div className="textfilterlogoworkflowlisk">
      <p> Filter </p>
      </div>

      <div className="fliter-name-workflowlist">
        <p className="textfilter-workflowlist"> Name </p>
        <input
          className="seacrh-workflow"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <div className="btnfilterworkflowlist">
          <button className="btncancelworkflowlist" onClick={CalerFilte}>
            Clear All Filter
          </button>
          <button
            className="btnsearchworkflowlist"
            onClick={searchworkflowname}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterWorkflow;
