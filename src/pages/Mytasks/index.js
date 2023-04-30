import React, { useEffect, useState, useContext } from "react";
import { usePagination } from "../../hooks/usePagination";
import Filtermytasks from "./Filtermytasks";
import TableTask from "./TableTask";
import useTask from "./useTask";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Mytasks.css";
import Paginationmytasks from "./Paginationmytasks";
import AuthContext from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Navbars from "../../components/Navbar";

const Task = () => {
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  //const [currentPage, setCurrentPage] = useState(0);
  const [chickeven, setChickeven] = useState(0);
  const itemsPerPage = 10;

  const [userPosition, setUserPosition] = useState("");

  const [showMultipleApprove, setShowMultipleApprove] = useState(false);

  // BodySearchTask
  const [bodyrequestsearch, setBodyrequsetsearch] = useState([]);

  const [searchShow, setSarchShow] = useState(false);

  const {logoutUser, user} = useContext(AuthContext)


  const { role } = user

  // const spance = ' '
  // const headers = {
  //   'content-Type':'application/json',
  //   'Authorization':'Bearer' + spance + String(authTokens.access)
  // }

  useEffect(() => {
    if(role === 1) {
      setUserPosition("Manager");
    }
  }, [role, user]);

  const {
    handdleReject,
    fetchTaskListAndSearch,
    handdleAppove,
    handleapprovemultiple,
    taskCount,
    variablesAndTaskList,
    isLoading
  } = useTask(
    searchShow,
    itemOffset,
    itemsPerPage,
    userPosition,
    bodyrequestsearch,
    logoutUser
  );

  const {
    handlePageClick,
    /*scrollContainerRef,*/ currentPage,
    setCurrentPage,
  } = usePagination(itemsPerPage, pageCount, pageTotal, setItemOffset);

  const handdleSetMulripleApprove = (id) => {
    setShowMultipleApprove(true);
  };

  console.log(taskCount);

  useEffect(() => {
    setPageTotal(taskCount);
    setPageCount(Math.ceil(taskCount / itemsPerPage));

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
      setCountTasks(end);
    }*/
  }, [currentPage, taskCount]);

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
    <Sidebar>
    <Navbars/>
      <div className="box-mytask">
      <div  className="section2-mytasks">
        <Filtermytasks
          role={role}
          setSarchShow={setSarchShow}
          setItemOffset={setItemOffset}
          setCurrentPage={setCurrentPage}
          setBodyrequsetsearch={setBodyrequsetsearch}
        />
      </div>
      <div className="section3-mytasks">
        <button className="Approvemultiple" onClick={handdleSetMulripleApprove}>
          Approve multiple
        </button>
      </div>

      <Card className="section4-mytasks">
        <Card.Body className="body-mytasks">
          <TableTask
            taskList={variablesAndTaskList}
            handdleAppove={handdleAppove}
            handdleReject={handdleReject}
            handleapprovemultiple={handleapprovemultiple}
            setSarchShow={setSarchShow}
            showMultipleApprove={showMultipleApprove}
            setShowMultipleApprove={setShowMultipleApprove}
            isLoading={isLoading}
          />
        </Card.Body>
        <Card.Footer className="align-items-start" style={{ width: "100%" }}>
          <Row>
            <Col xs lg="10" className="align-items-end">
              {/* <p className="workflow-count">11 out of 11</p> */}
            </Col>
            <Col xs lg="1"></Col>
          </Row>
          <Paginationmytasks
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        </Card.Footer>
      </Card>
    </div>
    </Sidebar>
    </>
  );
};

export default Task;
