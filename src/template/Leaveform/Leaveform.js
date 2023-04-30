import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Leaveform.css";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function Leaveform({ user, definitionid, form1, formname }) {
  const [formData, setFormData] = useState({
    Position: "",
    Department: "",
    Cause: "",
    StartDate: "",
    EndDate: "",
    Date: "",
    Starttime: "",
    Endtime: "",
    Message: "",
  });
  const [show, setShow] = useState(false);
  const [showcount, setShowcount] = useState(1);
  const [checkcount, setCheckcount] = useState("");
  const navigate = useNavigate();
  const [isDateVisible, setIsDateVisible] = useState(true);
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(definitionid);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxDate = () => {
    setIsDateVisible(!isDateVisible);
    setIsTimeVisible(false);
  };

  const handleCheckboxTime = () => {
    setIsTimeVisible(!isTimeVisible);
    setIsDateVisible(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShowsubmit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const userid = user.map((user) => {
    return user.id;
  });
  console.log(userid)

  const firstname = user.map((first) => {
    return first.firstname;
  });

  const lastname = user.map((user) => {
    return user.lastname;
  });

  const Phone = user.map((user) => {
    return user.phone;
  });

  const Position = user.map((user) => {
    return user.position;
  });

  const Department = user.map((user) => {
    return user.department;
  });

  const BaseUrl = "http://localhost:8080/engine-rest/";

  const Backend_URL = "http://127.0.0.1:7000/";

  const submittask = async () => {
    const headers = { "Content-Type": "application/json" };
    const body = {
        variables: {
          Sender: { value: `${userid}`, type: "string" },
          Name: { value: `${firstname}`, type: "string" },
          Lastname:{value: `${lastname}`, type: "string"},
          Position: { value: `${Position}`, type: "string" },
          Department: { value: `${Department}`, type: "string" },
          Phone: { value: `${Phone}`, type: "string" },
          Cause: { value: `${formData.Cause}`, type: "string" },
          Date: {
            value: `${formData.StartDate} - ${formData.EndDate}`,
            type: "string",
          },
          Hours: {
            value: `${formData.Date} - ${formData.Starttime} - ${formData.Endtime}`,
            type: "string",
          },
          Message: { value: `${formData.Message}`, type: "string" },
          CauseDelete: { value: null, type: "string" },
        },
        businessKey: `LF${format(new Date(), "ddMMyy")}-${showcount
          .toString()
          .padStart(4, "0")}`,
    };
    try {
      await axios.post(
        `${Backend_URL}process-definition/startform/${definitionid}`,
        body,
        {
          headers,
        }
      );
      setShow(false);
    } catch (err) {
      console.log(err);
    }
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        navigate("/Myforms");
      }, 1000);
    });
    setIsSubmitting(true);
  };

  // api count user day
  useEffect(() => {
    const dateformd = new Date();
    const beYear = dateformd.getFullYear() + 543;
    const thaiBuddhistDate = new Date(dateformd);
    thaiBuddhistDate.setFullYear(beYear);
    const formatDate = format(thaiBuddhistDate, "yyyy-MM-dd");

    const headers = { "Cache-Control": "no-cache" };
    const bodycount = {
      startedAfter: `${formatDate}T00:00:00.000+0200`,
      startedBefore: `${formatDate}T23:59:59.000+0200`,
      processDefinitionKey: "Leaveform",
    };
    axios
      .get(
        `${BaseUrl}history/process-instance/count`,
        { params: bodycount },
        { headers: headers }
      )
      .then((res) => {
        console.log("1");
        if (res.data !== checkcount) {
          const { count } = res.data;
          setShowcount(count + 1);
          setCheckcount(count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [checkcount]);

  return (
    <Fragment>
      <div className="setpopup">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submit leave from</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to submit ?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                submittask();
              }}
              disabled={isSubmitting}
            >
              {isSubmitting}
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <form onChange={handleChange} className="box-Leaveform">
        <div className="businesskey-Leaveform">
          <h1>
            LF{format(new Date(), "ddMMyy")}-
            {showcount.toString().padStart(4, "0")}
          </h1>
        </div>
        <hr className="line-lf-1" />
        <fieldset disabled>
          <div className="firstname-Leaveform">
            <label>Firstname</label>
            <input
              required
              type="text"
              className="form-control"
              name="Firstname"
              defaultValue={firstname}
            />
          </div>

          <div className="lastname-Leaveform">
            <label>Lastname</label>
            <input
              type="text"
              className="form-control"
              name="Lastname"
              defaultValue={lastname}
            />
          </div>

          <div className="phone-Leaveform">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="Phone"
              defaultValue={Phone}
            />
          </div>

          <div className="position-Leaveform">
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              name="Position"
              defaultValue={Position}
            />
          </div>

          <div className="department-Leaveform">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              name="Department"
              defaultValue={Department}
            />
          </div>
        </fieldset>

        <div className="textdital-lf">
          <h1>Details of Leave</h1>
        </div>
        <hr className="line-lf-2" />

        <div className="select-Leaveform">
          <label>Cause</label>
          <select name="Cause" className="form-select">
            <option>Select...</option>
            <option key="1">ลากิจ</option>
            <option key="2">ลาป่วย</option>
            <option key="3">ลาพักร้อน</option>
            <option key="4">ลาอุปสมบท</option>
            <option key="5">ลาเพื่อรับราชการทหาร</option>
            <option key="6">ลาคลอด</option>
          </select>
        </div>

        <div className="checkbox-day-Leaveform">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isDateVisible}
            onChange={handleCheckboxDate}
          />
          <label className="form-check-date">Days</label>
        </div>
        <div className="checkbox-hours-Leaveform">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isTimeVisible}
            onChange={handleCheckboxTime}
          />
          <label className="form-check-time">Hours</label>
        </div>
        {isDateVisible && (
          <div>
            <div className="start-date-Leaveform">
              <label>Startdate</label>
              <input type="date" className="form-control" name="StartDate" />
            </div>

            <div className="end-date-Leaveform">
              <label>Enddate</label>
              <input type="date" className="form-control" name="EndDate" />
            </div>
          </div>
        )}
        {isTimeVisible && (
          <div>
            <div className="date-time-Leaveform">
              <label>Date</label>
              <input type="date" className="form-control" name="Date" />
            </div>
            <div className="start-time-Leaveform">
              <label>Starttime</label>
              <input type="time" className="form-control" name="Starttime" />
            </div>
            <div className="end-time-Leaveform">
              <label>Endtime</label>
              <input type="time" className="form-control" name="Endtime" />
            </div>
          </div>
        )}
        <div className="message-Leaveform">
          <label>Cause</label>
          <textarea
            name="Message"
            className="form-control"
            rows="3"
            placeholder="Message"
          />
        </div>

        <div className="submit-Leaveform">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleShowsubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default Leaveform;
