import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Detail from "../../Image/Detail.svg"
import "./Styles/DetailLeaveform.css";
import "bootstrap/dist/css/bootstrap.min.css";

function DetailLeaveform({ user, form1, statusform }) {

  console.log(form1)

  const [formsDetail, setFormsdetail] = useState({
    Name: "",
    Lastname:"",
    Phone:"",
    Position: "",
    Department: "",
    Cause: "",
    Date: "",
    Hours: "",
    checkbox: "",
    Message: "",
  });
  console.log(formsDetail)
  const [toggledetailforms, setToggledetailforms] = useState(true);
  const [businessKeytask, setBusinessKeytask] = useState([]);
  const [tasktoggle, setTasktoggle] = useState(false);
  const [businessKey, setBusinessKey] = useState([]);
  const [dissible, setDisible] = useState(true);
  const [taskid, setTaskid] = useState([]);

  const navigate = useNavigate();
  const { Formid } = useParams();
  const { Taskid } = useParams();

  // Approve
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  // Reject
  const [showdeldete, setShowdelete] = useState(false);
  const handleClosedelete = () => {
    setShowdelete(false);
  };

  // Show button back pages myforms and mytasks
  const handdlemyforms = () => {
    if (statusform === true) {
      navigate("/Myforms");
      statusform = false;
    } else {
      navigate("/Mytasks");
      setTasktoggle(false);
    }
  };

  const BaseUrl = "http://localhost:8080/engine-rest/";

  // Show data variable
  useEffect(() => {
    const checkforms = statusform;

    if (checkforms === true) {
      setToggledetailforms(true);
      setDisible(true);
      const { Name, Lastname, Phone, Cause, Date, Message, Position, Department, Hours } = form1;
      setFormsdetail({
        Name: Name,
        Lastname: Lastname,
        Phone: Phone,
        Position: Position,
        Department: Department,
        Cause: Cause,
        Date: Date,
        Hours: Hours,
        Message: Message,
      });
    } else {
      setTasktoggle(true);
      setDisible(true);
      const { Name, Lastname, Phone, Cause, Date, Message, Position, Department, Hours } = form1;
      setFormsdetail({
        Name: Name?.value,
        Lastname: Lastname?.value,
        Phone: Phone?.value,
        Position: Position?.value,
        Department: Department?.value,
        Cause: Cause?.value,
        Date: Date?.value,
        Hours: Hours?.value,
        Message: Message?.value,
      });
    }
  }, [form1, statusform]);

  // API show businessKey pages myforms
  useEffect(() => {
    const businessKey = async () => {
      await axios
        .get(`${BaseUrl}history/process-instance/${Formid}`)
        .then((res) => {
          const { businessKey } = res.data;
          setBusinessKey(businessKey);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const checkforms = statusform;
    if (checkforms === true) {
      businessKey();
    }
  }, [Formid, statusform]);

  // API get processInstanceId in taskID
  useEffect(() => {
    const gettaskid = () => {
      axios
        .get(`${BaseUrl}task/${Taskid}`)
        .then((res) => {
          const { processInstanceId } = res.data;
          setTaskid(processInstanceId);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const checkforms = statusform;
    if (checkforms === false) {
      gettaskid();
    }
  }, [Taskid, statusform]);

  //API show businessKey pages mytasks
  /*useEffect(() => {
    const getbusinessKeytask = () => {
      axios
        .get(`${BaseUrl}process-instance?processInstanceIds=${taskid}`)
        .then((res) => {
          const number = res.data;
          const object = number.reduce((obj, item) => {
            obj[item.key] = item;
            return object;
          });
          const { businessKey } = object;
          setBusinessKeytask(businessKey);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getbusinessKeytask();
  }, [taskid]);*/

  // Show Button pages mytask
  const handdleshowapprove = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handdleshowreject = (e) => {
    e.preventDefault();
    setShowdelete(true);
  };

  //API Complete pages mytasks
  const handdleapprove = async () => {
    const headers = { "Content-Type": "application/json" };
    const body = {
      variables: { decision: { value: "Approve" } },
    };
    try {
      await axios.post(`${BaseUrl}task/${Taskid}/complete`, body, { headers });
      setShow(false);
    } catch (err) {
      console.log(err);
    }
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        navigate("/Mytask");
      }, 1000);
    });
  };

  const handdlereject = async () => {
    const headers = { "Content-Type": "application/json" };
    const body = {
      variables: { decision: { value: "Reject" } },
    };
    try {
      await axios.post(`${BaseUrl}task/${Taskid}/complete`, body, { headers });
      setShow(false);
    } catch (err) {
      console.log(err);
    }
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        navigate("/Mytask");
      }, 1000);
    });
  };

  return (
    <Fragment>
      <div className="setpopup">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Complete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to complete ?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handdleapprove}>
              Approve
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancle
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="setpopup">
        <Modal show={showdeldete} onHide={handleClosedelete}>
          <Modal.Header closeButton>
            <Modal.Title>Reject Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to reject ?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handdlereject}>
              Reject
            </Button>
            <Button variant="secondary" onClick={handleClosedelete}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {toggledetailforms && (
        <>
        <div>
          <div className="Detailbox-Leaveform">
            <div className="Detailbox-Leaveformleft">
              <div className="DetailbusinessKey-Leaveform">
              <img src={Detail} alt="Detail" />
                <h1>
                  {businessKey}{businessKeytask}
                </h1>
              </div>
            </div>

            <form className="Detailbox-Leaveformright">
              <fieldset disabled>
                <div className="DetailLeaveform-firstname">
                  <label>Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Firstname"
                    defaultValue={formsDetail.Name}
                  />
                </div>

                <div className="DetailLeaveform-lastname">
                  <label>Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Lastname"
                    defaultValue={formsDetail.Lastname}
                  />
                </div>

                <div className="DetailLeaveform-phone">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="Phone"
                    defaultValue={formsDetail.Phone}
                  />
                </div>
              </fieldset>

              <div className="DetailLeaveform-position">
                <label>Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="Position"
                  defaultValue={formsDetail.Position}
                  disabled={dissible}
                />
              </div>

              <div className="DetailLeaveform-department">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="Department"
                  defaultValue={formsDetail.Department}
                  disabled={dissible}
                />
              </div>

              <div className="textDetailLeaveform-lf">
                <h1>Details of Leave</h1>
              </div>
              <hr className="Detailline-lf-1" />

              <div className="DetailLeaveform-cause">
                <label>Cause</label>
                <input
                  type="text"
                  name="Cause"
                  className="form-control"
                  disabled={dissible}
                  defaultValue={formsDetail.Cause}
                />
              </div>

              <div className="DetailLeaveform-days">
                <label>Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="StartDate"
                  defaultValue={formsDetail.Date}
                  disabled={dissible}
                />
              </div>

              <div className="DetailLeaveform-hours">
                <label>Hours</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={formsDetail.Hours}
                  disabled={dissible}
                />
              </div>

              <div className="DetailLeaveform-message">
                <label>Message</label>
                <textarea
                  name="Message"
                  className="form-control"
                  rows="3"
                  defaultValue={formsDetail.Message}
                  disabled={dissible}
                />
              </div>


              {tasktoggle && (
                <div className="btActiond">
                  <button className="btApprov-detail" onClick={handdleshowapprove}>
                    Approve
                  </button>
                  <button className="btRejrct-detail" onClick={handdleshowreject}>
                    Reject
                  </button>
                </div>
              )}
            </form>
          </div>
          <div>
                <button
                  className="DetailLeaveform-btnback"
                  onClick={handdlemyforms}
                >
                  &#129144;
                </button>
              </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default DetailLeaveform;
