import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FcNext } from "react-icons/fc";
import { Link } from "react-router-dom";
import CustomModal from "../../components/Model";
import { convertDateToThaiFormat } from "../../utils/formatdate";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Tablemytasks.css";
import RingLoader from "react-spinners/RingLoader";

const TableTask = ({
  taskList,
  setShowMultipleApprove,
  showMultipleApprove,
  handdleAppove,
  handdleReject,
  setSarchShow,
  handleapprovemultiple,
  isLoading
}) => {
  console.log(taskList);
  const [show, setShow] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showdelete, setShowdelete] = useState(false);

  const [taskId, setTaskId] = useState("");
  const [taskIds, setTaskIds] = useState([]);

  console.log(isLoading)

  const [createTasksList, setCreaetTasksList] = useState([]);

  const [processinstanceid, setProcessinstanceid] = useState("");
  const [datadelete, setDatadelete] = useState([]);
  const [datetable, setDatetable] = useState([]);

  useEffect(() => {
    setCreaetTasksList(datetable);
  }, [datetable]);

  // handle close Model Approve
  const handleClose = () => {
    setShow(false);
  };

  // handle close Model Reject
  const handleCloseReject = () => {
    setShowReject(false);
  };

  // handle close Model Multiple
  const handleCloseMulripleApprove = () => {
    setShowMultipleApprove(false);
  };

  // Set id Task Approve
  const handdleSetApproveTask = (id) => {
    setShow(true);
    setTaskId(id);
    console.log(id);
  };

  // Handel Approve Task
  const handdleAppoveTask = async () => {
    try {
      handdleAppove(taskId);
    } catch (err) {
      console.log(err);
    }
    setShow(false);
    if (taskList.length === 0) {
      setSarchShow(false);
    }
  };

  // Set id Task Reject
  const handdleSetRejectTask = (id) => {
    setShowReject(true);
    setTaskId(id);
  };

  //Handle Rejest Task
  const handdleRejectTask = async () => {
    try {
      handdleReject(taskId);
    } catch (err) {
      console.log(err);
    }
    setShowReject(false);
    if (taskList.length === 0) {
      setSarchShow(false);
    }
  };

  //Handle MultipleApprove Task
  const HandleMultipleApproveTask = async () => {
    try {
      handleapprovemultiple(taskIds);
    } catch (err) {
      console.log(err);
    }
    handleCloseMulripleApprove(false);
    if (taskList.length === 0) {
      setSarchShow(false);
    }
  };

  //Handle  Delete tasks
  const HandleDelete = () => {
    setShowdelete(false);
  };

  //handdle open massage
  const handdleopenmassagerequest = (id) => {
    setProcessinstanceid(id);
    setShowdelete(true);
  };

  //Check All Row
  const handleHeaderCheckboxChange = (event, setTaskIds, taskList) => {
    const isChecked = event.target.checked;
    const taskIds = isChecked ? taskList.map((task) => task.id) : [];
    setTaskIds(taskIds);
  };

  //Check One Row Click
  const handleRowCheckboxChange = (event, taskId, setTaskIds) => {
    const isChecked = event.target.checked;
    const newTaskIds = isChecked
      ? [...taskId, event.target.value]
      : taskId.filter((id) => id !== event.target.value);
    setTaskIds(newTaskIds);
  };

  useEffect(() => {
    const checkrequestcancle = () => {
      const dissibled = { setdissible: true };
      const dissibledtask = taskList?.map((Tasks) => {
        return { ...Tasks, ...dissibled, dissibledtask: true };
      });
      const checkrequest = dissibledtask?.map((tasks) => {
        if (tasks?.taskDefinitionKey === "CancelForm") {
          return {
            ...tasks,
            dissibledtask: false,
          };
        } else {
          return {
            ...tasks,
            dissibledtask,
          };
        }
      });
      setDatadelete(checkrequest);
    };
    checkrequestcancle();
  }, [taskList]);

  useEffect(() => {
    const taskListFormatDate = datadelete?.map((Tasks) => {
      const created = convertDateToThaiFormat(Tasks?.created);
      return { ...Tasks, created };
    });

    setDatetable(taskListFormatDate);
  }, [datadelete]);

  // Api delete processinstance
  /*const hannlecancelform = async () => {
    await axios
      .delete(
        `http://localhost:8080/engine-rest/process-instance/${processinstanceid}`
      )
      .then(() => {
        setShowdelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  return (
    <div>
      <div className="table-mytasks">
        <CustomModal
          show={show}
          handleClose={handleClose}
          handleAction={handdleAppoveTask}
          modalTitle="Approve Task"
          modalBody="Are you sure you want to Approve ?"
          buttoncolor="success"
          buttontitle="Approve"
        />
        <CustomModal
          show={showReject}
          handleClose={handleCloseReject}
          handleAction={handdleRejectTask}
          modalTitle="Reject Task"
          modalBody="Are you sure you want to Reject ?"
          buttoncolor="danger"
          buttontitle="Reject"
        />
        <CustomModal
          show={showMultipleApprove}
          handleClose={handleCloseMulripleApprove}
          handleAction={HandleMultipleApproveTask}
          modalTitle="MultipleApprove Task"
          modalBody="Are you sure you want to MultipleApprove ?"
          buttoncolor="success"
          buttontitle="Approve"
        />
        <CustomModal
          show={showdelete}
          handleClose={HandleDelete}
          handleAction={'hannlecancelform'}
          modalTitle="Request Cancel Form "
          modalBody="Are you sure you want to Cancel ?"
          buttoncolor="danger"
          buttontitle="Delete"
        />
        <table className="table table-hover  bg-white">
          <thead>
            <tr>
              <th scope="col" width="5%">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(event) =>
                    handleHeaderCheckboxChange(event, setTaskIds, taskList)
                  }
                />
              </th>
              <th scope="col" width="20%">
                Task Name
              </th>
              <th scope="col" width="20%">
                Sender
              </th>
              <th scope="col" width="32%">
                Create
              </th>
              <th scope="col" width="0%">
                Action
              </th>
              <th scope="col" width="0%"></th>
            </tr>
          </thead>
          {isLoading ? (
        <div 
        className="pt-8 d-flex justify-content-center align-items-center"
        style={{ 
         width:"100%",
         height:"40vh",
         position:"absolute"
       }}>
       <RingLoader color="#6F2DA8" size={100} speedMultiplier={1} /> 
       </div>
       )  : (
        <tbody /*ref={'scrollContianer'}*/>
            {createTasksList?.map((Tasks) => (
              <tr key={Tasks.id}>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={Tasks.id}
                    checked={taskIds.includes(Tasks.id)}
                    onChange={(event) =>
                      handleRowCheckboxChange(event, taskIds, setTaskIds)
                    }
                  />{" "}
                </td>
                <td>{Tasks.name}</td>
                <td>{Tasks.NameSender?.value}</td>
                <td>{Tasks.created}</td>
                <td className="bt-group-mytasks">
                  <button
                    id="bt-approve-mytasks"
                    onClick={() => {
                      handdleSetApproveTask(Tasks.id);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    id="bt-rejaect-mytasks"
                    onClick={() => {
                      handdleSetRejectTask(Tasks.id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    id="bt-delete-mytasks"
                    onClick={() => {
                      handdleopenmassagerequest(Tasks.processInstanceId);
                    }}
                    disabled={Tasks.dissibledtask}
                  >
                    <MdDelete />
                    {Tasks.taskDefinitionKey === "CancelForm" &&
                      !Tasks.dissibledtask && (
                        <span className="notification-icon">1</span>
                      )}
                  </button>
                </td>
                <td className="path-mytasks">
                  <Link className="edit-mytasks" to={`Detail/${Tasks.id}`}>
                    <FcNext />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
       )
      }
        </table>
      </div>
    </div>
  );
};

export default TableTask;
