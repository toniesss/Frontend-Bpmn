import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Parkingform.css";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function Parkingform({ user, definitionid, form2, formname }) {
    const [formData, setFormData] = useState({
      Position: "",
      Department: "",
      StartDate: "",
      EndDate: "",
      Date: "",
      Starttime: "",
      Endtime: "",
      Address: "",
      VehicleLicense: "",
      VehicleYear: "",
      Numbercar: "",
      VehicleMake: "",
      VehicleColor: "",
    });
    const [show, setShow] = useState(false);
    const [showcount, setShowcount] = useState(1);
    const [checkcount, setCheckcount] = useState("");
    const navigate = useNavigate();
    const [isDateVisible, setIsDateVisible] = useState(true);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(formData);
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
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
          requestdata: {
            variables: {
              Sender: { value: `${userid}`, type: "string" },
              Name: { value: `${firstname} ${lastname}`, type: "string" },
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
              VehicleLicense: { value: `${formData.VehicleLicense}`, type: "string" },

              Address: { value: `${formData.Address}`, type: "string" },
              VehicleYear: { value: `${formData.VehicleYear}`, type: "string" },
              Numbercar: { value: `${formData.Numbercar}`, type: "string" },
              VehicleMake: { value: `${formData.VehicleMake}`, type: "string" },
              VehicleColor: { value: `${formData.VehicleColor}`, type: "string" },
              CauseDelete: { value: null, type: "string" },
            },
            businessKey: `PF${format(new Date(), "ddMMyy")}-${showcount
              .toString()
              .padStart(4, "0")}`,
          },
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
            navigate("/Myform");
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
          processDefinitionKey: "Parkingform",
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
                <Modal.Title>Submit Parkingform</Modal.Title>
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
    
          <form onChange={handleChange} className="box-Parkingform">
            <div className="businesskey-Parkingform">
              <h1>
                PKF{format(new Date(), "ddMMyy")}-
                {showcount.toString().padStart(4, "0")}
              </h1>
            </div>
            <hr className="line-pf-1" />
            <fieldset disabled>
              <div className="firstname-Parkingform">
                <label>Firstname</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="Firstname"
                  defaultValue={firstname}
                />
              </div>
    
              <div className="lastname-Parkingform">
                <label>Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  name="Lastname"
                  defaultValue={lastname}
                />
              </div>
    
              <div className="phone-Parkingform">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="Phone"
                  defaultValue={Phone}
                />
              </div>
    
              <div className="position-Parkingform">
                <label>Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="Position"
                  defaultValue={Position}
                />
              </div>
    
              <div className="department-Parkingform">
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
              <h1>แบบฟอร์มจอดรถ</h1>
            </div>
            <hr className="line-lf-2" />
    
            <div className="select-Parkingform">
              <label>Address</label>
              <textarea
                name="Address"
                className="form-control"
                rows="2"
                placeholder="กรอกที่อยู่ที่ทำการจองที่จอด"
              />
            </div>
            <div className="vehicle">
              <label>Vehicle License Number</label>
              <textarea
                name="VehicleLicense"
                className="form-control"
                rows="1"
                placeholder="เลขทะเบียนรถ"
              />
            </div>
            <div className="Numbercar">
              <label>จำนวนรถ</label>
              <textarea
                name="Numbercar"
                className="form-control"
                rows="1"
                placeholder="จำนวนรถที่ต้องการจอง"
              />
            </div>
            <div className="Vehicle-Make">
              <label>Vehicle Make</label>
              <textarea
                name="VehicleMake"
                className="form-control"
                rows="1"
                placeholder="ยี่ห้อรถ"
              />
            </div>
            <div className="Vehicle-MY">
              <label>Vehicle Model & Year</label>
              <textarea
                name="VehicleYear"
                className="form-control"
                rows="1"
                placeholder="โมเดลรถ & ปี"
              />
            </div>
            <div className="Vehicle-Color">
              <label>Vehicle Color</label>
              <textarea
                name="VehicleColor"
                className="form-control"
                rows="1"
                placeholder="สีรถ"
              />
            </div>
    
            <div className="checkbox-day-Parkingform">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isDateVisible}
                onChange={handleCheckboxDate}
              />
              <label className="form-check-date">Days</label>
            </div>
            <div className="checkbox-hours-Parkingform">
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
                <div className="start-date-Parkingform">
                  <label>Startdate</label>
                  <input type="date" className="form-control" name="StartDate" />
                </div>
    
                <div className="end-date-Parkingform">
                  <label>Enddate</label>
                  <input type="date" className="form-control" name="EndDate" />
                </div>
              </div>
            )}
            {isTimeVisible && (
              <div>
                <div className="date-time-Parkingform">
                  <label>Date</label>
                  <input type="date" className="form-control" name="Date" />
                </div>
                <div className="start-time-Parkingform">
                  <label>Starttime</label>
                  <input type="time" className="form-control" name="Starttime" />
                </div>
                <div className="end-time-Parkingform">
                  <label>Endtime</label>
                  <input type="time" className="form-control" name="Endtime" />
                </div>
                
              </div>
            )}
    
            <div className="submit-Parkingform">
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
    
    export default Parkingform;
    