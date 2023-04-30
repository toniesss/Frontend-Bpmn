import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./styles/Filtermytasks.css";
import { formatdatecamunda } from "../../utils/formatdate";
import AuthContext from "../../context/AuthContext";

function Filtermytasks({ role, setSarchShow, setItemOffset, setCurrentPage ,setBodyrequsetsearch }) {
  //set Qurey search
  const [querycategorytask, setQuerycategorytask] = useState("Select");
  const [querytaskname, setQuerytaskname] = useState("");
  const [querysendername, setQuerysandername] = useState("");
  const [querycreatedate, setQuerycreatedate] = useState("");
  const [queryformnumber, setQueryformnumber] = useState("");

  const [startdate, setStartdate] = useState("");

  const [employeerole, setEmployeerole] = useState("")

  console.log(querycreatedate)

  useEffect(() => {
    if(role === 1){
      setEmployeerole("Manager")
    }
  },[role])

    //format date for search
    useEffect(() => {
      if (querycreatedate === "") {
        setStartdate("");
      }
      if (querycreatedate !== "") {
        const date = formatdatecamunda(querycreatedate);
        setStartdate(date);
      }
    }, [querycreatedate]);


  const setbodysearch = () => {


    setSarchShow(true);
    setItemOffset(0);
    setCurrentPage(0);

    const bodyrequest = {
      candidateGroup: `${employeerole}`,
      sorting: [
        {
          sortBy: "created",
          sortOrder: "desc",
        },
      ],
    };

    const variables = [];
    if (querysendername !== "") {
      variables.push({
        name: "Name",
        value: `%${querysendername}%`,
        operator: "like",
      });
      bodyrequest.variableValuesIgnoreCase = true;
    }
    if (querycategorytask !== "" && querycategorytask !== "Select") {
      bodyrequest.processDefinitionName = querycategorytask;
    }
    if (querytaskname !== "") {
      bodyrequest.nameLike = `%${querytaskname}%`;
    }
    if (querycreatedate !== "") {
      bodyrequest.createdBefore = `${startdate}T23:59:59.000+0200`;
      bodyrequest.createdAfter = `${startdate}T00:00:00.000+0200`;
    }
    if (queryformnumber !== "") {
      bodyrequest.processInstanceBusinessKey = `${queryformnumber}`;
    }
    if (variables.length > 0) {
      bodyrequest.processVariables = variables;
    }
    setBodyrequsetsearch(bodyrequest);
  };

  const {authTokens} = useContext(AuthContext)
  const baseUrl = "http://127.0.0.1:7000";

  const [workflowcategory, setWorkflowcategory] = useState();

  //fetch workflow for categoty
  useEffect(() => {
    const controller = new AbortController();

    const fetchworkflow = async () => {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      await axios
        .get(`${baseUrl}/process-definition/category`, {
          signal: controller.signal,
          headers:headers
        })
        .then((res) => {
          setWorkflowcategory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchworkflow();

    return () => {
      controller.abort();
    };
  }, [authTokens.access]);


  useEffect(() => {
    if (querycreatedate === "") {
      setStartdate("");
    }
    if (querycreatedate !== "") {
      const date = formatdatecamunda(querycreatedate);
      setStartdate(date);
    }
  }, [querycreatedate]);

  //set category Task
  const handdlecategorytask = (e) => {
    const datacategory = e?.target?.value;
    setQuerycategorytask(datacategory);
  };

  // enter event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setbodysearch();
    }
  };

    //function clear all filter
    const clearfiter = () => {
      setItemOffset(0);
      setCurrentPage(0);
      setQuerycategorytask("Select");
      setQuerytaskname("");
      setQuerysandername("");
      setQuerycreatedate("");
      setQueryformnumber("");
      setSarchShow(false);
    };

  return (
    <div className="boxfilersearch-mytasks">
      <div className="textfilterlogomytasks">
        <p> Filter </p>
      </div>
      <div className="fliter-category-mytasks">
        <p className="textfilter-mytasks"> Category </p>
        <select
          className="seacrh-mytasks"
          aria-label="Default select example"
          value={querycategorytask}
          onChange={(e) => {
            handdlecategorytask(e);
          }}
          onKeyDown={handleKeyDown}
        >
          <option value={"Select"}>Select</option>
          {workflowcategory?.map((category) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="fliter-name-mytasks">
        <p className="textfilter-mytasks"> Name </p>
        <input
          className="seacrh-mytasks"
          type="text"
          placeholder="Search"
          value={querytaskname}
          onChange={(e) => {
            setQuerytaskname(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="fliter-sender-mytasks">
        <p className="textfilter-mytasks"> Sender </p>
        <input
          className="seacrh-mytasks"
          type="text"
          placeholder="Search"
          value={querysendername}
          onChange={(e) => {
            setQuerysandername(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="fliter-date-mytasks">
        <p className="textfilter-mytasks"> Create</p>
        <input
          className="seacrhdatetask"
          type="date"
          placeholder="Search"
          value={querycreatedate}
          onChange={(e) => {
            setQuerycreatedate(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="btnfiltermytasks">
        <button className="btncalermytasks" onClick={clearfiter}>
          Clear All Filter
        </button>
        <button className="btnsearchsmytasks" onClick={setbodysearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Filtermytasks;
