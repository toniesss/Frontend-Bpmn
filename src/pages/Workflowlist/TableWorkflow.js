import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import "./Styles/Tableworkflow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomModal from "../../components/Model";
import RingLoader from "react-spinners/RingLoader";

const TableWorkflow = ({
  workflowList,
  deleteWorkflowData,
  isLoading,
  setSearchShow,
}) => {
  const [show, setShow] = useState(false);

  const [deleteworkflow, setdeleteworkflow] = useState("");
  console.log(workflowList);
  //handle close Model
  const handleClose = () => {
    setShow(false);
  };

  // Set id Workflow
  const handdleDelete = (id) => {
    setShow(true);
    setdeleteworkflow(id);
    console.log(id);
  };

  const handleDeleteItem = async () => {
    try {
      deleteWorkflowData(deleteworkflow);
    } catch (err) {
      console.log(err);
    }
    setShow(false);
    setSearchShow(false);
  };

  return (
    <div className="table-workflow">
      <CustomModal
        show={show}
        handleClose={handleClose}
        handleApprove={handleDeleteItem}
        modalTitle="Delete Workflow"
        modalBody="Are you sure you want to delete ?"
        buttoncolor="danger"
        buttontitle="Delete"
      />
      <table className="table table-hover bg-white">
        <thead>
          <tr>
            <th scope="col" width="15%">
              Workflow Name
            </th>
            <th scope="col" width="73%">
              Version
            </th>
            <th scope="col" width="12%">
              Action
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <div
            className="pt-8 d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "40vh",
              position: "absolute",
            }}
          >
            <RingLoader color="#6F2DA8" size={100} speedMultiplier={1} />
          </div>
        ) : (
          <tbody>
            {workflowList?.map((workflow) => (
              <tr key={workflow.id}>
                <td>{workflow.name}</td>
                <td>{workflow.version}</td>
                <td className="bt-group-workflowlist">
                  <Link
                    className="edit-workflowlist"
                    to={`Modeler/${workflow.id}`}
                  >
                    <FiEdit />
                  </Link>
                  <button
                    className="delete-workflow"
                    onClick={() => {
                      handdleDelete(workflow.id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableWorkflow;
