import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/Drtailmytasks.css'
import { Col, Form, Navbar, Row } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import CustomModal from "../../components/Model";
import useTask from "./useTask";
import { IoArrowUndoSharp } from "react-icons/io5";
import AuthContext from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";


function Detailmytasks() {
  const [variable, setVariable] = useState([]);
  const [processDefinition, setProcessDefinition] = useState("");
  const [formKey, setFormKey] = useState("");
  const [formContent, setFormContent] = useState([]);

  const navigate = useNavigate()

  const [formVariableContent, setFormVariableContent] = useState([]);

  const [show, setShow] = useState(false)
  const [showReject, setShowReject] = useState(false)

  const[formFiledsOption, setformFilrdsOption] = useState([]);
  const [formFiledsOptionId, setformFilrdsOptionId] = useState("")
  const [filedsOptionContent, setfiledsOptionContent] = useState([]);

  console.log(variable)
  /*console.log(processDefinition)*/

  ///console.log(formVariableContent);

  const { taskid } = useParams();

  const {authTokens, logoutUser} = useContext(AuthContext)





  const baseUrl = "http://127.0.0.1:7000/";

  // api get Task
  useEffect(() => {
    const controller = new AbortController();
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }

    const fetchTask = async () => {
      await axios
        .get(`${baseUrl}task/${taskid}`, {
          signal: controller.signal,
          headers:headers
        })
        .then((res) => {
          const { processDefinitionId } = res.data;
          setProcessDefinition(processDefinitionId);
        })
        .catch((err) => {
          console.log(err);
          logoutUser()
        });
    };

    if (taskid) {
      fetchTask();
    }
    return () => {
      controller.abort();
      console.log("cancelled");
    };
  }, [authTokens.access, logoutUser, taskid]);

  useEffect(() => {
    const fetchFormKey = async () => {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      await axios
        .get(`${baseUrl}process-definition/formkey/${processDefinition}`,
        {headers:headers}
        )
        .then((res) => {
          const data = res.data;
          const { key } = data;
          setFormKey(key);
        })
        .catch((err) => {
          console.log(err);
          logoutUser()
        });
    };

    if (processDefinition !== "") {
      fetchFormKey();
    }
  }, [authTokens.access, logoutUser, processDefinition]);

  useEffect(() => {
    const fetchForm = async () => {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      await axios
        .get(`${baseUrl}form/${formKey}/`,{headers:headers})
        .then((res) => {
          setFormContent(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
          logoutUser()
        });
    };
    if (formKey !== "") {
      fetchForm();
    }
  }, [authTokens.access, formKey, logoutUser]);

  //API data variables
  useEffect(() => {
    const controller = new AbortController();
    const fetchsiggletask = async () => {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      await axios
        .get(`${baseUrl}task/${taskid}/form-variables`, {
          signal: controller.signal,
          headers:headers
        })
        .then((res) => {
          setVariable(res.data);
        })
        .catch((err) => {
          console.log(err);
          logoutUser()
        });
    };
    fetchsiggletask();

    return () => {
      controller.abort();
    };
  }, [authTokens.access, logoutUser, taskid]);

  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };

 useEffect(() => {
    const formContentArray = Object.values(formContent);
    const variableArray = Object.entries(variable);

    /*console.log(formContentArray)
    console.log(variableArray)*/

    if (formContentArray && variableArray) {
      const updatedFields = formContentArray[6]?.map((obj) => {
        const variableObj = variableArray.find(
          ([key]) => obj.field_name === key
        );
        if (variableObj) {
          const [, { value }] = variableObj;
          return { ...obj, value };
        }
        return obj;
      });
      setFormVariableContent(updatedFields);
    }
  }, [formContent, variable]);


  useEffect(() => {
    const formContentArray = Object.values(formContent);

    let filedsValueId = []

    let checkFieldType = []

  if(formContentArray) {
      formContentArray[6]?.forEach((fileds) => { 
        if(fileds.field_type === "radio" ) { return checkFieldType.push(fileds) }
        if(checkFieldType) {
          checkFieldType?.forEach((option) => { 
           option?.options?.forEach((items) => {
            const findvalue = formVariableContent?.find((fileds) => fileds.value === items?.option_text )
             if(findvalue){
              return filedsValueId.push(items)
             } 
           })
           })
        }
       }) 
       setformFilrdsOptionId(filedsValueId)
    }

   /* if(formContentArray) {
      formContentArray[6]?.forEach((fileds) => { 
         fileds?.options?.map((option) => {
          console.log(option)
           formVariableContent?.map((fileds) => {
            if(fileds.value === option?.option_text ) {
              return filedsValueId.push(option)
            }
          })

           return option
         })
       }) 
       console.log(filedsValueId)
    }*/

  },[formContent, formVariableContent])

  useEffect(() => {

    if(formFiledsOptionId) {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      formFiledsOptionId.map(async(option) => {
        await axios.get(`${baseUrl}form/field/option/${option.id}/`,{headers:headers})
        .then((res) => {
          setformFilrdsOption(res.data)
        })
        .catch((err) => {
          if(err){
            logoutUser()
          }
        })
      })
     
    }

  },[authTokens.access, formFiledsOptionId, logoutUser])

  useEffect(() => {
    const variableArray = Object.entries(variable);
    if(formFiledsOption && variableArray) {
      
     const updatedFieldsOption = formFiledsOption.map((obj) => {
        const variableObj = variableArray.find(
          ([key]) => obj.field_name === key
        );
        if (variableObj) {
          const [, { value }] = variableObj;
          return { ...obj, value };
        }
        return obj;
      })
      setfiledsOptionContent(updatedFieldsOption)
    }
   
  },[formFiledsOption, variable])


  const { handdleReject, handdleAppove } = useTask();


  const [taskId, setTaskId] = useState("")

  console.log(taskId)

  const handdleSetApproveTask = (e) => {
    e.preventDefault()
    setShow(true);
    setTaskId(taskid)
  };
  const handdleSetRejctTask = (e) => {
    e.preventDefault()
    setShow(true);
    setTaskId(taskid)
  };

    // Handel Approve Task
    const handdleAppoveTask = async () => {
      try {
        handdleAppove(taskId)
        .then(() => {
          navigate("/Mytasks");
        })
      } catch (err) {
        console.log(err);
      }
      setShow(false); 
    }

    // handle close Model Approve
    const handleClose = () => {
      setShow(false);
    };
  
    // handle close Model Reject
    const handleCloseReject = () => {
      setShowReject(false);
    };

      //Handle Rejest Task
  const handdleRejectTask = async () => {
    try {
      handdleReject(taskId)
      .then(() => {
        navigate("/Mytasks");
      })
    } catch (err) {
      console.log(err);
    }
    setShowReject(false);
  };

  const backToTaskList = () => {
    navigate("/Mytasks");
  }




  return (
    <>
    <div>
    <Sidebar>
     <Navbar/>
     <div className="box-ditailmytasks">
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
      <Stack gap={2} className="col-md-5 mx-auto mt-3 ">
        <div
          style={{ borderRadius: "10px" }}
          className="bg-white p-3 rounded-md justify-center item-start shadow-sm border-indigo-800 border-t-8 space-y-2 h-24"
        >
          <h1 className="text-2xl font-bold">{formContent.form_name}</h1>
          <p className="text-lg">{formContent.description}</p>
        </div>
        <Form
          style={{ borderRadius: "10px" }}
          className="bg-white shadow-lg rounded-md p-5 my-10"
        >
          {formVariableContent?.map((field, index) => {
            return (
              <Row key={index}>
                <Form.Label className="block text-sm font-medium text-gray-700 capitalize">
                  <span>{field.field_name}</span>
                </Form.Label>
                <Col className="my-1  w-full" key={field.index}>
                  {field.field_type === "short_answer" && (
                    <Form.Control
                      key={field.index}
                      value={field.value}
                      disabled
                      type="text"
                      placeholder={field.value}
                      className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                      name={camelize(field.field_name)}
                    />
                  )}
                  {field.field_type === "date" && (
                    <Form.Control
                      key={field.index}
                      disabled
                      type="date"
                      pattern="\d{4}-\d{2}-\d{2}"
                      className="px-4 mb-4 h-10 rounded-md block w-full"
                      placeholder={field.value}
                      value={field.value}
                      name={camelize(field.field_name)}
                    />
                  )}
                  {field.field_type === "time" && (
                    <Form.Control
                      key={field.index}
                      disabled
                      type="time"
                      className="px-4 mb-4 h-10 rounded-md block w-full"
                      placeholder={field.value}
                      value={field.value}
                      name={camelize(field.field_name)}
                    />
                  )}
                  {field.field_type === "email" && (
                    <Form.Control
                      key={field.index}
                      disabled
                      value={field.value}
                      type="email"
                      className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                      placeholder={field.value}
                      name={camelize(field.field_name)}
                    />
                  )}
                  {field.field_type === "paragraph" && (
                    <Form.Control
                      key={field.index}
                      disabled
                      value={field.value}
                      as="textarea"
                      rows={4}
                      placeholder={field.value}
                      className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                      name={camelize(field.field_name)}
                    />
                  )}
                  {field.field_type === "multichoice" && (
                    <Form.Select
                      key={field.index}
                      placeholder={field.value}
                      disabled
                      name={camelize(field.field_name)}
                      as="select"
                      className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                    >
                      {field?.options?.map((item) => (
                        <option key={item?.id} value={item.option_text}>
                          {field.value}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {field.field_type === "radio" && (
                    <Row className="d-flex align-items-center mb-1">
                      {field?.options?.map((item) => (
                        <div as={Col} md={12} className="d-flex justify-content-start">
                           <Form.Check
                           className="me-2 mb-2"
                          disabled
                          key={item.id}
                          type="radio"
                          checked={field.value === item.option_text }
                          value={field.value}
                          //label={item.option_text}
                        /> {item.option_text}
                        </div>
                      ))}
                      {filedsOptionContent.map((optionfileds) => {
                      return (
                        <div className="mt-3" key={optionfileds.id}>
                          <Form.Label
                            key={optionfileds.id}
                            className="block text-sm font-medium text-gray-700 capitalize"
                          >
                            <span>{optionfileds.field_name}</span>
                          </Form.Label>
                          {optionfileds.field_type === "short_answer" && (
                            <Form.Control
                              disabled
                              required={optionfileds.field_required}
                              type="text"
                              placeholder={optionfileds.field_name}
                              className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                              value={optionfileds.value}
                              name={camelize(optionfileds.field_name)}
                            />
                          )}
                          {optionfileds.field_type === "date" && (
                            <Form.Control
                            disabled
                              required={optionfileds.field_required}
                              type="date"
                              pattern="\d{4}-\d{2}-\d{2}"
                              className="px-4 mb-4 h-10 rounded-md block w-full"
                              placeholder={optionfileds.field_name}
                              value={optionfileds.value}
                              name={camelize(optionfileds.field_name)}
                            />
                          )}
                          {optionfileds.field_type === "time" && (
                            <Form.Control
                            disabled
                              required={optionfileds.field_required}
                              type="time"
                              className="px-4 mb-4 h-10 rounded-md block w-full"
                              placeholder={optionfileds.field_name}
                              value={optionfileds.value}
                              name={camelize(optionfileds.field_name)}
                            />
                          )}
                          {optionfileds.field_type === "paragraph" && (
                            <Form.Control
                            disabled
                              required={optionfileds.field_required}
                              as="textarea"
                              rows={4}
                              placeholder={optionfileds.field_name}
                              value={optionfileds.value}
                              className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                              name={camelize(optionfileds.field_name)}
                            />
                          )}
                        </div>
                      );
                    })}
                    </Row>
                   
                    
                  )}

                  {field.field_type === "checkbox" && (
                    <div className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full">
                      {field?.options?.map((item) => (
                        <Form.Check
                          disabled
                          key={item.id}
                          type="checkbox"
                          value={field.value}
                          label={field.value}
                        />
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            );
          })}
          <Row>
          <Col xxl={6} className="d-flex justify-content-start">
            <button className="btn btn-primary" onClick={backToTaskList}><IoArrowUndoSharp/></button>
          </Col>
          <Col xxl={6} className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={handdleSetApproveTask}>Complete</button>
            <button className="btn btn-danger ms-1 ps-4 pe-4" onClick={handdleSetRejctTask}>Reject</button>
          </Col>
          </Row>
        </Form>
      </Stack>
    </div>
    </Sidebar>
    </div>
    </>
  );
}

export default Detailmytasks;
