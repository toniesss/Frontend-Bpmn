import React, { useEffect, useRef, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import axios from "axios";
import CustomModal from "../../components/Model";
import "./Styles/Startworkflow.css";
import RingLoader from "react-spinners/RingLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../../components/Alert";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import AuthContext from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Navbars from "../../components/Navbar";
const SubmitForm = () => {
  const baseUrl = "http://127.0.0.1:7000";

  let {user,authTokens} = useContext(AuthContext)

  const { id, firstname, lastname } = user

  const controller = useRef(new AbortController());

  const [formContent, setFormContent] = useState([]);
  const [fieldsOptionContent, setFormFieldsOptionContent] = useState([]);

  const [formContentSubmit, setFormContentSubmit] = useState([]);

  const [isloading, setIsloading] = useState(false);
  const [isloadingform, setIsloadingfrom] = useState(false)

  const [form, setForm] = useState([]);
  const [formKey, setFormKey] = useState("");

  const [processdefinitionId, setProcessdefinitionId] = useState("");



  //Model SubmitForm
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //const [header, setHeader] = useState("");

  const navigate = useNavigate();

  console.log(formContent)

  // handle close Model Approve
  const handleClose = () => {
    if (!isSubmitting) {
      setShow(false);
    }
  };

  // get processdifinition
  useEffect(() => {
    const fetchprocess = async () => {
      const spance =' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      try {
        const response = await axios.get(`${baseUrl}/process-definition/`, {
          signal: controller.current.signal, headers:headers
        });
        setForm(response.data);
        //console.log(response);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.log(err);
        }
      }
    };
    fetchprocess();
  }, [authTokens.access]);

  const toggleform = (e) => {
    const formid = e;

  //  setHeader(e.name);
  const spance =' '
  const headers = {
    'content-Type':'application/json',
    'Authorization':'Bearer' + spance + String(authTokens.access)
  }

    setProcessdefinitionId(formid);
    const fetchstartformkey = async () => {
      await axios
        .get(`${baseUrl}/process-definition/formkey/${formid}`,{headers:headers})
        .then((res) => {
          const datakeyforms = res.data;

          const { key } = datakeyforms;
          setFormKey(key);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchstartformkey();
  };
  useEffect(() => {
    const fetchForm = async () => {
        const spance =' '
  const headers = {
    'content-Type':'application/json',
    'Authorization':'Bearer' + spance + String(authTokens.access)
  }
      setIsloading(true);
      await axios
        .get(`${baseUrl}/form/${formKey}/`,{headers:headers})
        .then((res) => {
          console.log(res.data);
          setFormContent(res.data);
          setIsloading(false);
          setIsloadingfrom(true)
        })
        .catch((err) => {
          console.log(err);
          setIsloading(false);
          notifyError("This form does not exist");
          setIsloadingfrom(false)
        });
    };
    if (formKey !== "") {
      fetchForm();
    }
  }, [authTokens.access, formKey]);

  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    //loop through our questions & get values based on the element name
    const formTargets = e.target;

    let data = [];
    formContent?.fields?.map((content) => {
      const element = camelize(content.field_name);
      //console.log(element)

      data.push({
        question: content.field_name,
        answer: formTargets[element].value,
      });
      return content;
    });

    fieldsOptionContent.map((items) => {
      const elementOption = camelize(items.field_name);

      data.push({
        question: items.field_name,
        answer: formTargets[elementOption].value,
      });
      return items;
      //console.log(formTargets[elementOption].value)
    });

    console.log("form data", data);
    setFormContentSubmit(data);
    setShow(true);
  };

  const startForms = async () => {

    const bodyForm = {
      variables: {
        Sender: { value: `${id}`, type: "string" },
        NameSender: {
          value: `${firstname} ${lastname}`,
          type: "string",
        },
        ...formContentSubmit.reduce((acc, curr) => {
          acc[curr.question] = { value: curr.answer, type: "string" };
          return acc;
        }, {}),
      },
    };
    console.log(bodyForm);
    setIsloading(true);
    try {
      setIsSubmitting(true);

      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer '+ String(authTokens.access)
      }

      await axios.post(
        `${baseUrl}/process-definition/startform/${processdefinitionId}`,bodyForm,{headers:headers}
      );

      navigate("/Myforms");
      notifySuccess("Submit seccess");
      setIsloading(false);
    } catch (err) {
      console.log(err);
      notifyError("Submit error");
      setIsloading(false);
    } finally {
      setIsSubmitting(false);
    }
  };


  const fetchfieldsoption = async (id) => {
    const spance =' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }
    await axios
      .get(`${baseUrl}/form/field/option/${id}/`,{headers:headers})
      .then((res) => {
        setFormFieldsOptionContent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(formContent);

  // useEffect(() => {
  //   const selectEl = document.getElementById("form-select");
  //   const removeInvalid = () => {
  //     selectEl.classList.remove("is-invalid");
  //     const invalidTooltip =
  //       selectEl.parentNode.querySelector(".invalid-tooltip");
  //     if (invalidTooltip) {
  //       invalidTooltip.remove();
  //     }
  //   };
  //   selectEl.addEventListener("change", removeInvalid);
  //   return () => selectEl.removeEventListener("change", removeInvalid);
  // }, []);

  return (
    <>
    <div>
    <Sidebar>
    <Navbars />
     <div>
      <ToastContainer />
      {isloading ? (
        <div
          className="pt-8 d-flex justify-content-center align-items-center"
          style={{
            width: "100%",
            height: "87vh",
            overflow: "auto",
            zIndex:"4",
            position: "absolute"
          }}
        >
          <RingLoader color="#6F2DA8" size={100} speedMultiplier={1} />
        </div>
      ) : null}
      <div>
        <CustomModal
          show={show}
          disabled={isSubmitting}
          handleClose={handleClose}
          handleAction={startForms}
          modalTitle="Submit Form?"
          modalBody="Are you sure you want to Submit ?"
          buttoncolor="success"
          buttontitle="Submit"
        />
      </div>
      <div>
        <div className="section1-startworkflow">
          <h1> </h1>
        </div>

        <div className="section2-startworkflow">
          <h1 className="text-select">เลือกแบบฟอร์ม</h1>
          <div className="select-startworkflow">
            <select
              id="form-select"
              className="form-select"
              aria-label="select example"
              onChange={(event) => {
                toggleform(event.target.value);
              }}
              required
            >
              <option value="">Select form</option>
              {form.map((forms) => {
                return (
                  <option key={forms.id} value={forms.id}>
                    {forms.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

      </div>
      <div
        style={{
          width: "100%",
          height: "87vh",
          overflow: "auto",
        }}
      >
        {isloadingform ? (
                <Stack gap={2} className="col-md-5 mx-auto mt-3 ">
                <div
                  style={{ borderRadius: "10px" }}
                  className="bg-white p-3 rounded-md justify-center item-start shadow-sm border-indigo-800 border-t-8 space-y-2 h-24"
                >
                  <h1 className="">{formContent.form_name}</h1>
                  <p className="text-lg">{formContent.description}</p>
                </div>
                <Form
                  onSubmit={submitForm}
                  style={{ borderRadius: "10px" }}
                  className="bg-white shadow-lg rounded-md p-5 my-10"
                >
                  {formContent?.fields?.map((field) => {
                    return (
                      <Row key={field.index}>
                        {/* <Col className="flex justify-between items-center space-y-1"> */}
                        <Form.Label
                          key={field.id}
                          className="block text-sm font-medium text-gray-700 capitalize"
                        >
                          <span>{field.field_name}</span>
                        </Form.Label>
                        {/* </Col> */}
                        <Col className="my-1  w-full">
                          {field.field_type === "short_answer" && (
                            <Form.Control
                              required={field.field_required}
                              type="text"
                              placeholder={field.field_name}
                              className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                              name={camelize(field.field_name)}
                            />
                          )}
                          {field.field_type === "date" && (
                            <Form.Control
                              required={field.field_required}
                              type="date"
                              pattern="\d{4}-\d{2}-\d{2}"
                              className="px-4 mb-4 h-10 rounded-md block w-full"
                              placeholder={field.field_name}
                              name={camelize(field.field_name)}
                            />
                          )}
                          {field.field_type === "time" && (
                            <Form.Control
                              required={field.field_required}
                              type="time"
                              className="px-4 mb-4 h-10 rounded-md block w-full"
                              placeholder={field.field_name}
                              name={camelize(field.field_name)}
                            />
                          )}
                          {field.field_type === "email" && (
                            <Form.Control
                              required={field.field_required}
                              type="email"
                              className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                              placeholder={field.field_name}
                              name={camelize(field.field_name)}
                            />
                          )}
                          {field.field_type === "paragraph" && (
                            <Form.Control
                              required={field.field_required}
                              as="textarea"
                              rows={4}
                              placeholder={field.field_name}
                              className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                              name={camelize(field.field_name)}
                            />
                          )}
                          {field.field_type === "multichoice" && (
                            <Form.Select
                              required={field.field_required}
                              name={camelize(field.field_name)}
                              as="select"
                              className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                            >
                              {field?.options?.map((item) => (
                                <option key={item?.id} value={item.option_text}>
                                  {item.option_text}
                                </option>
                              ))}
                            </Form.Select>
                          )}
                          {field.field_type === "radio" && (
                            <div className="">
                              {field?.options?.map((item) => (
                                <Form.Check
                                  required={field.field_required}
                                  key={item.id}
                                  type="radio"
                                  name={camelize(field.field_name)}
                                  value={item.option_text}
                                  label={item.option_text}
                                  onClick={() => fetchfieldsoption(item.id)}
                                />
                              ))}
                              <div>
                                {fieldsOptionContent.map((optionfileds) => {
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
                                          required={optionfileds.field_required}
                                          type="text"
                                          placeholder={optionfileds.field_name}
                                          className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                                          name={camelize(optionfileds.field_name)}
                                        />
                                      )}
                                      {optionfileds.field_type === "date" && (
                                        <Form.Control
                                          required={optionfileds.field_required}
                                          type="date"
                                          pattern="\d{4}-\d{2}-\d{2}"
                                          className="px-4 mb-4 h-10 rounded-md block w-full"
                                          placeholder={optionfileds.field_name}
                                          name={camelize(optionfileds.field_name)}
                                        />
                                      )}
                                      {optionfileds.field_type === "time" && (
                                        <Form.Control
                                          required={optionfileds.field_required}
                                          type="time"
                                          className="px-4 mb-4 h-10 rounded-md block w-full"
                                          placeholder={optionfileds.field_name}
                                          name={camelize(optionfileds.field_name)}
                                        />
                                      )}
                                      {optionfileds.field_type === "paragraph" && (
                                        <Form.Control
                                          required={optionfileds.field_required}
                                          as="textarea"
                                          rows={4}
                                          placeholder={optionfileds.field_name}
                                          className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                                          name={camelize(optionfileds.field_name)}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
      
                          {field.field_type === "checkbox" && (
                            <div className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full">
                              {field?.options?.map((item) => (
                                <Form.Check
                                  required={field.field_required}
                                  key={item.id}
                                  type="checkbox"
                                  name={camelize(field.field_name)}
                                  value={item.option_text}
                                  label={item.option_text}
                                />
                              ))}
                            </div>
                          )}
                        </Col>
                      </Row>
                    );
                  })}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">Submit</button>
                  </div>
                </Form>
              </Stack>
      ) : null}
      </div>
    </div>
    </Sidebar>
    </div>
    </>
  );
};

export default SubmitForm;
