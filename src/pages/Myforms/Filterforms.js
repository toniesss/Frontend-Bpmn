import React, { useEffect, useState, useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import "./styles/Filterforms.css";
import { formatdatecamunda } from "../../utils/formatdate";
import AuthContext from "../../context/AuthContext";

function Filterforms({
  setBodyRequest,
  setSearchShow,
  setItemOffset,
  setCurrentPage,
}) {
  // input search
  const [categoryname, setCategoryname] = useState("Select");
  //const [bissineskey, setBissineskey] = useState("");
  const [processname, setProcessName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //set status
  const [externallystatus, setExternallystatus] = useState(false);
  const [completedstatus, setCompletstate] = useState(false);
  const [activestatus, setActivestatus] = useState(false);
  const [radioValue, setRadioValue] = useState("");

  // set for request
  const [datestart, setDatestart] = useState("");
  const [dateend, setDateend] = useState("");

  //set show buttuncancel status
  const [togglecancelstatesearch, setTogglecancelstatedsearch] =
    useState(false);
  /*const [itemcount, setItemcount] = useState([]);
  const [startcount, setStartcount] = useState(0);*/

  const baseUrl = "http://127.0.0.1:7000";

  const [workflowcategory, setWorkflowcategory] = useState();

  const {authTokens, logoutUser, user} = useContext(AuthContext)


  const { id } = user

  const spance = ' '


  //fetch workflow for categoty
  useEffect(() => {
    const controller = new AbortController();

    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }

    const fetchworkflow = async () => {
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
            logoutUser()
        });
    };

    fetchworkflow();

    return () => {
      controller.abort();
    };
  }, [authTokens.access, logoutUser]);

  const radios = [
    { name: "Active", value: "Active", color: "primary" },
    { name: "Completed", value: "Completed", color: "success" },
    { name: "Cancel", value: "Cancel", color: "secondary" },
  ];

  useEffect(() => {
    if (processname !== "") {
      setCategoryname("");
    }
  }, [processname, radioValue]);

  useEffect(() => {
    if (categoryname !== "") {
      setProcessName("");
    }
  }, [categoryname, endDate]);

  // format date for request
  useEffect(() => {
    if (endDate === "") {
      setDateend(endDate);
    } else if (endDate !== "") {
      const Dateend = formatdatecamunda(endDate);
      setDateend(Dateend);
    }
    if (startDate === "") {
      setDatestart(startDate);
    } else if (startDate !== "") {
      const Datestart = formatdatecamunda(startDate);
      setDatestart(Datestart);
    }
  }, [endDate, startDate]);



  // button set request for search
  const handdleclicksearch = () => {
    setItemOffset(0);
    setCurrentPage(0);
    setSearchShow(true);

    const bodyrequestformname = {
      variables: [
        {
          name: "Sender",
          operator: "eq",
          value: `${id}`,
        },
      ],
      sorting: [
        {
          sortBy: "startTime",
          sortOrder: "desc",
        },
      ],
    };

    if (processname !== "") {
      bodyrequestformname.processDefinitionNameLike = `%${processname[0].toUpperCase()}%`;
    }
    if (datestart !== "") {
      bodyrequestformname.startedBefore = `${datestart}T23:59:59.000+0000`;
      bodyrequestformname.startedAfter = `${datestart}T00:00:00.000+0000`;
    }
    if (dateend !== "") {
      bodyrequestformname.finishedBefore = `${dateend}T23:59:59.000+0200`;
      bodyrequestformname.finishedAfter = `${dateend}T00:00:00.000+0200`;
    }
    if (activestatus === true) {
      bodyrequestformname.active = activestatus;
    }
    if (completedstatus === true) {
      bodyrequestformname.completed = completedstatus;
    }
    if (externallystatus === true) {
      bodyrequestformname.externallyTerminated = externallystatus;
    }
    if (categoryname !== "" && categoryname !== "Select") {
      bodyrequestformname.processDefinitionName = categoryname;
    }

    /*if (bissineskey !== "") {
      bodyrequestformname.processInstanceBusinessKey = `${bissineskey}`;
    }*/

    return setBodyRequest(bodyrequestformname);
  };


  const handdleradiostatus = (e) => {
    const datastatus = e.target.value;

    switch (true) {
      // set active
      case datastatus === "Active":
        setTogglecancelstatedsearch(true);
        setActivestatus(true);
        setCompletstate(false);
        setExternallystatus(false);
        setRadioValue("Active");
        break;

      // set complete
      case datastatus === "Completed":
        setTogglecancelstatedsearch(true);
        setCompletstate(true);
        setExternallystatus(false);
        setActivestatus(false);
        setRadioValue("Completed");
        break;

      // set cancel
      case datastatus === "Cancel":
        setTogglecancelstatedsearch(true);
        setExternallystatus(true);
        setActivestatus(false);
        setCompletstate(false);
        setRadioValue("Cancel");
        break;


      default:
        break;
    }
  };

  const handdlecancelstate = () => {
    setActivestatus(false);
    setCompletstate(false);
    setExternallystatus(false);
    setRadioValue("");
    setTogglecancelstatedsearch(false);
  };

  const handdlesetcategory = (e) => {
    const categorydata = e.target.value;
    setCategoryname(categorydata);
  };

  const handdleclearfilter = () => {
    setProcessName("");
    setStartDate("");
    setEndDate("");
    setRadioValue("");
    setDatestart("");
    setDateend("");
    setTogglecancelstatedsearch(false);
    /*setShowhanddlesearch(false);
    setShowfiterhanddlesearch(true);*/
    setCategoryname("Select");
    setActivestatus(false);
    setCompletstate(false);
    setExternallystatus(false);

    setSearchShow(false);
  };

  // enter event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handdleclicksearch();
    }
  };

  return (
    <div className="boxfilersearch-myforms">
      <div className="textfilterlogo-myforms">
        <p> Filter </p>
      </div>

      <div className="fliter-category-myfoms">
        <p className="textfilter-myforms"> Category </p>
        <select
          className="seacrh-myforms"
          aria-label="Default select example"
          value={categoryname}
          onChange={(e) => {
            handdlesetcategory(e);
          }}
          onKeyDown={handleKeyDown}
        >
          <option value={""}>Select</option>
          {workflowcategory?.map((category) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="fliter-name-myfoms">
        <p className="textfilter-myforms"> Name </p>
        <input
          className="seacrh-myforms"
          type="text"
          placeholder="Search"
          value={processname}
          onChange={(e) => setProcessName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="fliter-status-myfoms">
        <p className="textfilter-myforms"> Status </p>
        <ButtonGroup className="state">
          {radios.map((radio, idx) => (
            <div key={idx} tabIndex={0} onKeyDown={handleKeyDown}>
              <ToggleButton
                id={`radio-${idx}`}
                type="radio"
                variant={`outline-${radio.color}`}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={handdleradiostatus}
              >
                <span className="radio-text">{radio.name}</span>
              </ToggleButton>
            </div>
          ))}
        </ButtonGroup>
        {togglecancelstatesearch && (
          <button className="cancelstate" onClick={handdlecancelstate}>
            <ImCancelCircle />
          </button>
        )}
      </div>

      <div className="fliter-Create-myfoms">
        <p className="textfilter-myforms"> Create</p>
        <input
          className="seacrhdate-myforms"
          type="date"
          placeholder="Search"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="fliter-Considered-myfoms">
        <p className="textfilter-myforms"> Consider</p>
        <input
          className="seacrhdate-myforms"
          type="date"
          placeholder="dd/mm/yyyy"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        </div>

      <div className="btnfiltermyforms">
        <button className="btncalermyforms" onClick={handdleclearfilter}>
          Clear All Filter
        </button>
        <button className="btnsearchsmyforms" onClick={handdleclicksearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Filterforms;
