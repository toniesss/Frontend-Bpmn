import React, { useState, useEffect,useContext } from "react";
import { usePagination } from "../../hooks/usePagination";
import axios from "axios";
import { useWorkflow } from "../Workflowlist/useWorkflow";
import Tableformskey from "./Tableformskey";
import Pagintionformkeys from "./Pagintionformkeys";
import Filterformkey from "./Filterformkey";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/indexformkeys.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbars from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Formskey = () => {
  // Pagintion
  // const [itemOffset, setItemOffset] = useState(0)
  // const [chickeven, setChickeven] = useState(0)
  // const [pageTotal, setPageTotal] = useState(0)
  // const [pageCount, setPageCount] = useState(0)
  // const itemsPerPage = 10;

  const [formList, setFormList] = useState([]);
  // const [countformkeys, setCountformkeys] = useState(0);

  const navigate = useNavigate();

  console.log(formList);

  let {authTokens} = useContext(AuthContext)

  useEffect(() => {
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }
    axios
      .get(`http://127.0.0.1:7000/form/list`,{headers:headers})
      .then((res) => {
        setFormList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authTokens.access]);

  const handleChange = () => {
    navigate("/Createforms");
  };

  return (
    <>
    <div>
      <Sidebar>
      <div className="box-formlist">
     
     <Navbars/>
     <div className="section1-formkeys">
       <Filterformkey />
     </div>
     <div className="section2-formkeys">
       <button onClick={handleChange}>Create Form</button>
     </div>
     <div className="box-tableformkeys">
       <Card className="section3-formkeys">
         <Card.Body className="body-formkeys">
           <Tableformskey formList={formList} />
         </Card.Body>
         <Card.Footer>
           <Row>
             <Pagintionformkeys />
           </Row>
         </Card.Footer>
       </Card>
      </div>
      </div>
      </Sidebar>
    </div>
    </>
  );
};

export default Formskey;
