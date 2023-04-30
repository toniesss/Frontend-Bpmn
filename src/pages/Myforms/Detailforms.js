import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Form, Navbar, Row } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { IoArrowUndoSharp } from "react-icons/io5";
import AuthContext from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function Detailforms() {
  const [variable, setVariable] = useState([]);
  const [formKey, setFormKey] = useState("");
  const [definitionid, setDefinitionid] = useState("");

  const [formContent, setFormContent] = useState([])

  const [formVariableContent, setFormVariableContent] = useState([])

  const[formFiledsOption, setformFilrdsOption] = useState([]);
  const [formFiledsOptionId, setformFilrdsOptionId] = useState("")
  const [filedsOptionContent, setfiledsOptionContent] = useState([]);

  console.log(filedsOptionContent)

  const { Formid } = useParams();
  console.log(Formid)

  const {authTokens, logoutUser} = useContext(AuthContext)



  //const Url = "http://localhost:8080/engine-rest";

  const baseUrl = "http://127.0.0.1:7000/"

  const navigate = useNavigate()


  // fetch Processinstance
  useEffect(() => {
    const controller = new AbortController();
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }
    const fetchdefinitionid = async() => {
      await axios
        .get(`${baseUrl}process-instance/history/${Formid}`, {
          signal: controller.signal,headers:headers
        })
        .then((res) => {
          const { processDefinitionId } = res.data;
          //console.log(processDefinitionId);
          setDefinitionid(processDefinitionId);
        })
        .catch((err) => {
          console.log(err);
          logoutUser()
        });
    };

    if(Formid){
      fetchdefinitionid();
    }

    return () => {
      controller.abort();
    };
  }, [Formid, authTokens.access, logoutUser]);

  // api get form variables in process-instance
  useEffect(() => {
    const controller = new AbortController();
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }

    const getvariable = async () => {
      await axios
        .get(
          `${baseUrl}process-instance/history/variable/${Formid}`,
          { signal: controller.signal, headers:headers }
        )
        .then((res) => {
          console.log(res.data);
          setVariable(res.data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Request was aborted");
          } else {
            console.log(err);
            logoutUser()
          }
        });
    };
    if(Formid){
      getvariable();
    }
    return () => {
      controller.abort();
      console.log("cancelled");
    };
  }, [Formid, authTokens.access, logoutUser]);

  // api get key
  useEffect(() => {
    const controller = new AbortController();
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }

    const fetchformkey = async () => {
      await axios
        .get(`${baseUrl}process-definition/formkey/${definitionid}`, {
          signal: controller.signal,headers:headers
        })
        .then((res) => {
          const keyform = res.data;
          const { key } = keyform;
          setFormKey(key);
        })
        .catch((err) => {
          console.log(err);
          logoutUser()
        });
    };
    if(definitionid) {
      fetchformkey();
    }
    return () => {
      controller.abort();
      console.log("cancelled");
    };
  }, [authTokens.access, definitionid, logoutUser]);

  useEffect(() => {

    const fetchformkey = async() => {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      await axios.get(`${baseUrl}form/${formKey}/`,{headers:headers})
      .then((res) => {
        setFormContent(res.data)
      })
      .catch((err) => {
        console.log(err)
        logoutUser()
      })
    }

  if(formKey) {
    fetchformkey()
  }

  },[authTokens.access, formKey, logoutUser])

  useEffect(() => {
    const formContentArray = Object.values(formContent);

    if (formContentArray && variable ) {
      const updatedFields = formContentArray[6]?.map((obj) => {
        const variableObj = variable.find(
          (item) => obj.field_name === item.name
        );
        if (variableObj) {
          const { value } = variableObj;
          //console.log(value)
          return { ...obj, value };
        }
        return obj;
      });
      setFormVariableContent(updatedFields);
    }
  }, [formContent, variable]);

  console.log(formVariableContent)


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


  },[formContent, formVariableContent])

  useEffect(() => {

    const fetchFiledsOption = async() => {
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      if(formFiledsOptionId) {
        formFiledsOptionId.map(async (option) => {
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
    }

    fetchFiledsOption()

  },[authTokens.access, formFiledsOptionId, logoutUser])

  useEffect(() => {
    //const variableArray = Object.entries(variable);
    if(formFiledsOption ) {

    console.log(variable)
      
     const updatedFieldsOption = formFiledsOption.map((obj) => {
        const variableObj = variable.find(
          (key) => obj.field_name === key?.name
        );
        if (variableObj) {
          const { value }= variableObj;
          return { ...obj, value };
        }
        return obj;
      })
      setfiledsOptionContent(updatedFieldsOption)
    }
   
  },[formFiledsOption, variable])


  const backToFormsList = () => {
    navigate("/Myforms")
  }

    return (
      <>
      <div>
      <Sidebar>
      <Navbar/> 
      <div className="box-ditailmytasks">
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

                    />
                  )}
                  {field.field_type === "multichoice" && (
                    <Form.Select
                      key={field.index}
                      placeholder={field.value}
                      disabled

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
            <button className="btn btn-primary" onClick={backToFormsList}><IoArrowUndoSharp/></button>
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


export default Detailforms;
