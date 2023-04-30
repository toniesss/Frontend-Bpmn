import React, { useEffect, useState, useContext } from "react";
import TableForm from "./TableForm";
import useForm from "./useForm";
import Filterforms from "./Filterforms";
import { usePagination } from "../../hooks/usePagination";
import Paginationforms from "./Paginationmyforms";
import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Myforms.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Navbars from "../../components/Navbar";


const Form = () => {
  // Pagination
  //const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [chickeven, setChickeven] = useState(0);
  const itemsPerPage = 10;

  const [searchShow, setSearchShow] = useState(false);

  const [bodyRequest, setBodyRequest] = useState([]);

  const [formsLists, setformsLists] = useState([]);

  const {authTokens, logoutUser, user} = useContext(AuthContext)


  const { id } = user

  /*const spance = ' '
  const headers = {
    'content-Type':'application/json',
    'Authorization':'Bearer' + spance + String(authTokens.access)
  }*/


  const { formsList, formsCount, fetchTaskListAndSearch, isloading } = useForm(
    searchShow,
    itemOffset,
    itemsPerPage,
    bodyRequest,
  );

  console.log(formsLists);

  useEffect(() => {
    const body = {
      activityType: "noneEndEvent",
      activityId: "Reject",
    };
    axios
      .post("http://localhost:8080/engine-rest/history/activity-instance", body,)
      .then((res) => {
        const activity = res.data;
        const updatedFormList = formsList?.map((item) => {
          const matchingItem = activity?.find((items) => item.id === items.processInstanceId);
          if (matchingItem) {
            return { ...item, status: "REJECT" };
          }
          return item;
        });
        setformsLists(updatedFormList)
      })        
      .catch((err) => {
        console.log(err);
      });
  }, [formsList]);


  
  useEffect(() => {
    const fetchForms = () => {

      const bodyRequestForm = {
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
      if (!searchShow) {
        setBodyRequest(bodyRequestForm);
      }
    };

    fetchForms();
  }, [id, searchShow]);

  const {
    handlePageClick,
    /*scrollContainerRef,*/ currentPage,
    setCurrentPage,
  } = usePagination(itemsPerPage, pageCount, pageTotal, setItemOffset);

  console.log(formsCount);

  useEffect(() => {
    setPageTotal(formsCount);
    setPageCount(Math.ceil(formsCount / itemsPerPage));

    /*if (taskCount === 0) {
      setCountTasks(0);
      setStartCount(0);
    } else if (currentPage === 0) {
      setStartCount(1);
      const min = Math.min(itemsPerPage, taskCount);
      setCountTasks(min);
    } else {
      const start = currentPage * itemsPerPage;
      const end = Math.min(start + itemsPerPage, taskCount);
      //console.log(end);
      setStartCount(start + 1);
      setCountTasks(end);*
    }*/
  }, [formsCount]);

  useEffect(() => {
    const effect = () => {
      setChickeven(Math.ceil(currentPage * itemsPerPage));

      if (chickeven === pageTotal && pageTotal !== 0) {
        setItemOffset(itemOffset - itemsPerPage);
        setCurrentPage((prevPage) => prevPage - 1);
        fetchTaskListAndSearch();
        setChickeven(0);
      }
    };
    effect();
  }, [
    chickeven,
    currentPage,
    fetchTaskListAndSearch,
    itemOffset,
    pageTotal,
    setCurrentPage,
  ]);

  return (
    <>
    <div>
    <Sidebar>
    <Navbars/>
    <div className="box-myforms">
      {/*<div className="section1-myforms">
        <h1>My Forms</h1>
      </div>*/}

      <div className="section2-myforms">
        <Filterforms
          user={user}
          setSearchShow={setSearchShow}
          setBodyRequest={setBodyRequest}
          setItemOffset={setItemOffset}
          setCurrentPage={setCurrentPage}
          formsLists={formsLists}
        />
      </div>

      <Card className="section3-myforms">
        <Card.Body className="body-myforms">
          <TableForm 
           formsLists={formsLists}
          isloading={isloading}
          />
        </Card.Body>
        <Card.Footer>
          <Paginationforms
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        </Card.Footer>
      </Card>
    </div>
    </Sidebar>
    </div>
    </>
  );
};

export default Form;
