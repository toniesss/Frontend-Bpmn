import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FcNext } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import Beacon from "react-status-beacon";
import { convertDateToThaiFormat } from "../../utils/formatdate";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles/Tablemyform.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import CustomModal from "../../components/Model";

const TableForm = ({ formsLists }) => {
  const [currentFormList, setCurrentFormList] = useState([]);
  const [fromListFormatEndDateItems, setFromListFormatEndDateItems] = useState(
    []
  );
  const [fromListFormatStartDateItems, setFromListFormatStartDateItems] =
    useState([]);
  const [formListStatusItem, setFormListStatusItem] = useState([]);
  //const [stateform, setStateform] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [cancelid, setCancel] = useState("");

  useEffect(() => {
    const updateEndFormsList = () => {
      if (Array.isArray(formsLists)) {
        const updatedEndForms = formsLists.map((form) => {
          if (form?.endTime !== null) {
            const endTime = convertDateToThaiFormat(form?.endTime);
            return { ...form, endTime };
          }
          return form;
        });
        setFromListFormatEndDateItems(updatedEndForms);
      }
    };

    updateEndFormsList();
  }, [formsLists]);

  useEffect(() => {
    const updateCreateFormsList = () => {
      const updatedStartForms = fromListFormatEndDateItems?.map((form) => {
        const startTime = convertDateToThaiFormat(form?.startTime);
        return { ...form, startTime };
      });
      setFromListFormatStartDateItems(updatedStartForms);
    };
    updateCreateFormsList();
  }, [fromListFormatEndDateItems]);

  useEffect(() => {
    const updatedCancel = fromListFormatStartDateItems.map((item) => {
      if (item.state === "EXTERNALLY_TERMINATED") {
        return { ...item, state: "CANCEL" };
      } else {
        return item;
      }
    });

    setFormListStatusItem(updatedCancel);
  }, [fromListFormatStartDateItems]);

  useEffect(() => {
    const setStatusFormsColor = async () => {
      const dataStatus = [];
      const disableds = {
        setdissible: false,
      };

      const checkStatusForms = formListStatusItem?.map((form) => {
        return form?.state;
      });

      //console.log(checkStatusForms)

      for (let b = 0; b < checkStatusForms.length; b++) {
        if (checkStatusForms[b] === "COMPLETED") {
          dataStatus.push({
            ...formListStatusItem[b],
            deleteReason: "#42bd41",
            ...disableds,
            setdissible: true,
          });
        } else if (checkStatusForms[b] === "REJECT") {
          dataStatus.push({
            ...formListStatusItem[b],
            deleteReason: "#e84e40",
            ...disableds,
            setdissible: true,
          });
        } else if (checkStatusForms[b] === "CANCEL") {
          dataStatus.push({
            ...formListStatusItem[b],
            deleteReason: "#bdbdbd",
            ...disableds,
            setdissible: true,
          });
        } else if (checkStatusForms[b] === "ACTIVE") {
          dataStatus.push({
            ...formListStatusItem[b],
            deleteReason: "#039be5",
            ...disableds,
            setdissible: false,
          });
        }
      }

      setCurrentFormList(dataStatus);
    };

    setStatusFormsColor();
  }, [formListStatusItem]);

  const handdlecancel = (id) => {
    setCancel(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    // Move the API call inside handleClose
    const headers = { "content-type": "application/json" };
    const body = {
      messageName: "Cancel",
      processInstanceId: `${cancelid}`,
    };
    console.log(body);
    const cancelform = () => {
      axios
        .post("http://localhost:8080/engine-rest/message", body, headers)
        .then(() => {
          setShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    cancelform();
  };

  return (
    <div>
      <div className="setpopup">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request Cancel Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="message">Compose a message:</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Submit
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="table-myforms">
        <table className="table table-hover bg-white">
          <thead>
            <tr>
              <th scope="col" width="0%">
                Form name
              </th>
              <th scope="col" width="0%">
                Create
              </th>
              <th scope="col" width="0%">
                Consider
              </th>
              <th scope="col" width="0%">
                Status
              </th>
              <th scope="col" width="0%">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentFormList?.map((form) => (
              <tr key={form.id}>
                <td>{form.processDefinitionName}</td>
                <td>{form.startTime}</td>
                <td>{form.endTime}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {
                      <Beacon
                        status="negative"
                        colors={{ negative: `${form.deleteReason}` }}
                        id="state"
                      />
                    }
                    {form.state}
                    <p style={{ color: "#e84e40", margin:"0px",marginLeft: "10px" }}>
                      {form?.status}
                    </p>
                  </div>
                </td>
                <td className="bt-group-myforms1">
                  <button
                    className="deleteActionmyforms"
                    value={form.deleteReason}
                    onClick={() => {
                      handdlecancel(form.id);
                    }}
                    disabled={form.setdissible}
                  >
                    <IoIosCloseCircle />
                  </button>
                  <Link
                    className="buttungodetailmyforms"
                    to={`Detail/${form.id}`}
                  >
                    <FcNext />
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableForm;

