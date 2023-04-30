import React, { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import PaginationsWorkflow from "./PaginationsWorkflow";
import TableWorkflow from "./TableWorkflow";
import { useWorkflow } from "./useWorkflow";
import "./Styles/Workflowlist.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Filterworkflow from "./Filterworkflow";
import Sidebar from "../../components/Sidebar";
import Navbars from "../../components/Navbar";

const Workflows = () => {
  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const [chickeven, setChickeven] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;

  const [searchShow, setSearchShow] = useState(false);

  const [countWorkflow, setCountworkflow] = useState([]);
  const [startcount, setStartcount] = useState(0);

  //Workflow Name Search
  const [workflowName, setWorkflowName] = useState("");

  console.log(searchShow);

  const {
    workflowList,
    fetchWorkflowListAndCount,
    workflowCount,
    isLoadingWorkflowList,
    deleteWorkflowData,
  } = useWorkflow(itemOffset, itemsPerPage, searchShow, workflowName);

  const navigate = useNavigate();

  const {
    handlePageClick,
    /*scrollContainerRef,*/ currentPage,
    setCurrentPage,
  } = usePagination(itemsPerPage, pageCount, pageTotal, setItemOffset);

  useEffect(() => {
    setPageTotal(workflowCount);
    setPageCount(Math.ceil(workflowCount / itemsPerPage));

    if (workflowCount === 0) {
      setCountworkflow(0);
      setStartcount(0);
    } else if (currentPage === 0) {
      setStartcount(1);
      const min = Math.min(itemsPerPage, workflowCount);
      setCountworkflow(min);
    } else {
      const start = currentPage * itemsPerPage;
      const end = Math.min(start + itemsPerPage, workflowCount);
      console.log(end);
      setStartcount(start + 1);
      setCountworkflow(end);
    }
  }, [currentPage, workflowCount]);

  useEffect(() => {
    const effect = () => {
      setChickeven(Math.ceil(currentPage * itemsPerPage));

      if (chickeven === pageTotal && pageTotal !== 0) {
        setItemOffset(itemOffset - itemsPerPage);
        setCurrentPage((prevPage) => prevPage - 1);
        fetchWorkflowListAndCount();
        setChickeven(0);
      }
    };

    effect();
  }, [
    chickeven,
    currentPage,
    fetchWorkflowListAndCount,
    itemOffset,
    pageTotal,
    setCurrentPage,
  ]);

  //click to createbpmn
  const naviagetCreatBpmn = () => {
    navigate("/Workflowlist/modeler");
  };

  return (
    <>
    <div>
      <Sidebar>
      <div className="box-workflowlist">
      <Navbars/>
      {/*<div className="section1-workflowlist">
        <h1>Workflow List</h1>
  </div>*/}
      <div className="section2-workflowlist">
        <Filterworkflow
          setSearchShow={setSearchShow}
          setWorkflowName={setWorkflowName}
        />
      </div>
      <div>
        <div className="section3-workflowlist">
          <button
            className="create-bpmn-button"
            onClick={() => {
              naviagetCreatBpmn();
            }}
          >
            Create BPMN
          </button>
        </div>

        <Card className="section4-workflowlist">
          <Card.Body className="body-workflowlist">
            <TableWorkflow
              TableWorkflow
              workflowList={workflowList}
              deleteWorkflowData={deleteWorkflowData}
              isLoading={isLoadingWorkflowList}
              setSearchShow={setSearchShow}
            />
          </Card.Body>
          <Card.Footer className="align-items-start" style={{ width: "100%" }}>
            <Row>
              <Col xs lg="10" className="align-items-end">
                {/* <p className="workflow-count">
                  {startcount}-{countWorkflow} out of {countWorkflow}
                </p> */}
              </Col>
              <PaginationsWorkflow
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                currentPage={currentPage}
              />
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

export default Workflows;
