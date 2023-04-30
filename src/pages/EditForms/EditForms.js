import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi2";
import { Button, Form, Col, Row, Stack, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineShortText } from "react-icons/md";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
// import CustomModalSubmitForm from "./Model";
import { RiCloseLine } from "react-icons/ri";
// import "./styles/Createform.css";
import { SlEye } from "react-icons/sl";
// import ModelPreview from "./ModelPreview";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditForms = () => {

    const baseUrl = "http://127.0.0.1:7000"

    const {formid} = useParams()

    console.log(formid)

  useEffect(() => {
    axios.get(`${baseUrl}/form/edit/${formid}/`)
    .then((res) => {
        //console.log(res.data)
        setForm(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
  },[formid])  

  const [form, setForm] = useState([])

  const [formContent, setFormContent] = useState([
    {
      sequence: 0,
      label: "Untitled Question",
      required: false,
      question_type: "short_answer",
      options: [
        /*{
          label: null,
          fields: [
            //  {
            //    label: "Untitled Question",
            //    required: false,
            //    questionType: "short_answer",
            // },
          ],
        },*/
      ],
    },
  ]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("Option");
  const [editedField, setEditedField] = useState("");

  const [onEditHeader, setOnEditHeader] = useState(false);

  const [formHeader, setFormHeader] = useState("Form Header");

  const [onEditDescription, setOnEditDescription] = useState(false);
  const [description, setDescription] = useState("Form Description");

  // State Model Form
  const [show, setShow] = useState(false);

  const [showModelPreview, setShowModelPreview] = useState(false);

  const [stateCount, setStateCount] = useState(0);

  const submitForm = () => {
    setShow(true);
    console.log(formContent);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShowMoselPreview = () => {
    setShowModelPreview(true);
  };

  const handleCloseShowMoselPreview = () => {
    setShowModelPreview(false);
  };

  console.log(formContent);

  const addQuestion = () => {
    const field = {
      sequence: formContent.length,
      label: `Untitled question ${formContent.length}`,
      required: false,
      question_type: "short_answer",
      options: [
        /*{
          label: null,
          fields: [],
        },*/
      ],
    };
    setFormContent([...formContent, field]);
  };

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.sequence === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.sequence === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel;
      formFields[fieldIndex].options = [
        /*{
          label: null,
          fields: [],
        },*/
      ];
      setFormContent(formFields);
    }
  };

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.sequence === fieldName);
    if (fieldIndex > -1) {
      if (option && option !== "") {
        formFields[fieldIndex].options.push(option);
        setFormContent(formFields);
      }
    }
  };

  const editFieldOptionRadio = (fieldSequence, optionIndex, newLabel) => {
    setFormContent((prevFormContent) => {
      const fieldIndex = prevFormContent.findIndex(
        (f) => f.sequence === fieldSequence
      );
      if (fieldIndex === -1) {
        return prevFormContent;
      }

      const field = prevFormContent[fieldIndex];
      if (!field.options || !field.options[optionIndex]) {
        return prevFormContent;
      }

      const updatedOptions = [...field.options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        label: newLabel.trim(),
      };

      const updatedField = {
        ...field,
        options: updatedOptions,
      };

      return [
        ...prevFormContent.slice(0, fieldIndex),
        updatedField,
        ...prevFormContent.slice(fieldIndex + 1),
      ];
    });
    setTextField("")
  };

  const deleteOptionFields = (fieldSequence, optionIndex) => {
    setFormContent((prevFormContent) => {
      const fieldIndex = prevFormContent.findIndex(
        (f) => f.sequence === fieldSequence
      );
      if (fieldIndex === -1) {
        return prevFormContent; // Field not found, do nothing
      }

      const field = prevFormContent[fieldIndex];
      if (
        !field.options ||
        optionIndex < 0 ||
        optionIndex >= field.options.length
      ) {
        return prevFormContent; // Option field not found or invalid, do nothing
      }

      const updatedOptions = [...field.options];
      updatedOptions.splice(optionIndex, 1); // Remove the option field
      const updatedField = {
        ...field,
        options: updatedOptions,
      };

      return [
        ...prevFormContent.slice(0, fieldIndex),
        updatedField,
        ...prevFormContent.slice(fieldIndex + 1),
      ];
    });
  };

  const editFieldTypeOptions = (field, newType) => {
    setFormContent((prevFormContent) => {
      const updatedOptions = prevFormContent?.map((option) => {
        const updatedFields = option?.options?.map((item) => {
          const updatedItems = item?.fields?.map((items) => {
            if (items?.fieldsequent === field?.fieldsequent) {
              return {
                ...items,
                questionType: newType,
              };
            }
            return items;
          });
          return { ...item, fields: updatedItems };
        });
        return { ...option, options: updatedFields };
      });
      return updatedOptions;
    });
  };

  const deleteFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.label === fieldName);
    if (fieldIndex > -1) {
      const optionIndex = formFields[fieldIndex].options.findIndex(
        (o) => o === option
      );
      if (optionIndex > -1) {
        formFields[fieldIndex].options.splice(optionIndex, 1);
        setFormContent(formFields);
      }
    }
  };

  const deleteField = (fieldName) => {
    setFormContent(formContent.filter((field) => field.sequence !== fieldName));
  };

  const editRequired = (fieldName, fieldrequired) => {
    const required = fieldrequired;
    console.log(required);
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.sequence === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].required = required;
      setFormContent(formFields);
    }
  };

  const editRequiredOptionField = (fieldSequence, optionSequence, fieldRequired) => {

    setFormContent(prevFormContent => {

      console.log(optionSequence)

      return prevFormContent.map(field => {
   
        if (field.sequence === fieldSequence) {

          return {
            ...field,
            options: field.options.map(option => {

              return {
                ...option,
                fields: option.fields.map(fieldItem => {
                  console.log(fieldItem.fieldsequent , optionSequence)
                  if (fieldItem.fieldsequent === optionSequence) {

                    return { ...fieldItem, required: fieldRequired };
                  }

                  return fieldItem;
                }),
              };
            }),
          };
        }

        return field;
      });
    });
  };
  
  

  const editFieldOption = (fieldName, oldOption, newOption) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.label === fieldName);
    if (fieldIndex > -1) {
      const optionIndex = formFields[fieldIndex].options.findIndex(
        (o) => o === oldOption
      );
      if (optionIndex > -1) {
        formFields[fieldIndex].options[optionIndex] = {
          label: newOption,
          fields: [],
        };
        setFormContent(formFields);
      }
    }
  };

  const handleLabelChange = (e, fieldSequence, optionIndex, fieldsequent) => {
    const newLabel = e.target.value;
    console.log(newLabel);
    setFormContent((prevFormContent) => {
      return prevFormContent.map((field) => {
        if (field.sequence === fieldSequence) {
          return {
            ...field,
            options: field.options.map((option, index) => {
              if (index === optionIndex || option.fields) {
                return {
                  ...option,
                  fields: option.fields.map((field) => {
                    if (field.fieldsequent === fieldsequent) {
                      return { ...field, label: newLabel }; // Update the label of the field
                    }
                    return field;
                  }),
                };
              }
              return option;
            }),
          };
        }
        return field 
      });
    });
  };

  const addSubfield = (fieldSequence, optionIndex, subfield) => {
    setFormContent((prevFormContent) => {
      const updatedFormContent = prevFormContent?.map((field) => {
        if (field.sequence === fieldSequence) {
          const updatedOptions = [...field.options];
          const option = updatedOptions[optionIndex];
          const updatedFields = [...option.fields, subfield];
          const updatedOption = { ...option, fields: updatedFields };
          updatedOptions[optionIndex] = updatedOption;
          console.log(updatedOption);
          return { ...field, options: updatedOptions };
        } else {
          return field;
        }
      });

      // Update the form content in state
      return updatedFormContent;
    });
    setStateCount(stateCount + 1);
  };

  const handleEditField = (field) => {
    setEditedField(field);
  };

  const deleteFieldInOption = (
    fieldSequence,
    optionLabelToDelete,
    fieldLabelToDelete
  ) => {
    setFormContent((prevFormContent) => {
      const fieldIndex = prevFormContent.findIndex(
        (f) => f.sequence === fieldSequence
      );
      if (fieldIndex === -1) {
        return prevFormContent;
      }

      const field = prevFormContent[fieldIndex];
      if (!field.options) {
        return prevFormContent;
      }

      const updatedOptions = field.options.map((option) => {
        if (option.label !== optionLabelToDelete) {
          return option;
        }

        const updatedFields = option.fields.filter(
          (field) => field.label !== fieldLabelToDelete
        );

        return {
          ...option,
          fields: updatedFields,
        };
      });

      const updatedField = {
        ...field,
        options: updatedOptions,
      };

      return [
        ...prevFormContent.slice(0, fieldIndex),
        updatedField,
        ...prevFormContent.slice(fieldIndex + 1),
      ];
    });
  };

  const addFieldOptionRadio = (fieldSequence, option) => {
    setFormContent((prevFormContent) => {
      const fieldIndex = prevFormContent.findIndex(
        (f) => f.sequence === fieldSequence
      );
      if (fieldIndex === -1) {
        return prevFormContent; // Field not found, do nothing
      }

      const field = prevFormContent[fieldIndex];
      if (!field.options) {
        return prevFormContent; // Field has no options, do nothing
      }

      if (option && option.trim() !== "") {
        const newOption = {
          label: option.trim(),
          fields: [],
        };

        const updatedField = {
          ...field,
          options: [...field.options, newOption],
        };

        return [
          ...prevFormContent.slice(0, fieldIndex),
          updatedField,
          ...prevFormContent.slice(fieldIndex + 1),
        ];
      } else {
        return prevFormContent; // Option label is invalid, do nothing
      }
    });
  };

  return (
    <div className="box-createform">
      <Stack gap={2} className="col-md-5 mx-auto mt-3">
        {/* <ModelPreview
          formContent={formContent}
          showModelPreview={showModelPreview}
          handleCloseShowMoselPreview={handleCloseShowMoselPreview}
          formHeader={formHeader}
          description={description}
          setShowModelPreview={setShowModelPreview}
        />  */}
        <div className="body-dynamicform">
          <div className="flex flex-col justify-start items-center px-4 h-screen w-4/5 space-y-4 ">
            {/* <CustomModalSubmitForm
              formContent={formContent}
              description={description}
              show={show}
              handleClose={handleClose}
              formHeader={formHeader}
              setFormHeader={setFormHeader}
              CustomModalSubmitForm={CustomModalSubmitForm}
              setShow={setShow}
            /> */}
            <Row
              className="flex flex-col px-4 bg-light rounded-md justify-center item-start w-full shadow-sm border-indigo-800 border-t-8 space-y-2 h-24"
              style={{ borderRadius: "10px" }}
            >
              <Form.Group as={Col}>
                <Form.Label className="block text-sm font-medium text-gray-700 capitalize">
                  {onEditHeader ? (
                    <Form.Control
                      type="text"
                      placeholder="Form Header"
                      value={formHeader}
                      onChange={(e) => setFormHeader(e.target.value)}
                      onBlur={() => setOnEditHeader(false)}
                      autoFocus
                    />
                  ) : (
                    <h1
                      className="text-3xl font-semibold cursor-pointer pt-3"
                      onClick={() => {
                        setOnEditHeader(true);
                      }}
                    >
                      {formHeader || "Form Header"}
                    </h1>
                  )}
                </Form.Label>
              </Form.Group>
              <Form.Group as={Col} className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    handleShowMoselPreview();
                  }}
                  variant="light"
                  style={{
                    width: "50px",
                    border: "none",
                    borderRadius: "50px",
                  }}
                >
                  <SlEye style={{ width: "1.7rem", height: "1.5rem" }} />
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-gray-500/80 capitalize">
                  {onEditDescription ? (
                    <Form.Control
                      type="text"
                      placeholder="Form Header"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onBlur={() => setOnEditDescription(false)}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="text-gray-500/80 capitalize"
                      onClick={() => {
                        setOnEditDescription(true);
                      }}
                    >
                      {description || "Form Description"}
                    </p>
                  )}
                </Form.Label>
              </Form.Group>
            </Row>
            <p className="text-gray-500/120 capitalize"></p>
            <div className="relative flex flex-col w-full space-y-4">
              {formContent.map((field) => {
                return (
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "0.25px solid #E0DEDE",
                    }}
                    key={`${field.sequence}-${field.question_type}`}
                    className="rounded-md bg-white flex w-full shadow-md px-4 pt-3 pb-2 mb-3"
                  >
                    <div className="flex flex-col w-full">
                      <Row>
                        <Form.Group as={Col} xs={6} className="mt-3">
                          <Form.Label className="block text-sm font-medium text-gray-700 capitalize">
                            {onEdit && editedField === field.sequence ? (
                              <Form.Control
                                type="text"
                                placeholder="Untitled question"
                                value={field.label}
                                onChange={(e) =>
                                  editField(field.sequence, e.target.value)
                                }
                                onBlur={() => {
                                  setOnEdit(false);
                                  setEditedField("");
                                }}
                              />
                            ) : (
                              <div
                                onClick={() => {
                                  setOnEdit(true);
                                  setEditedField(field.sequence);
                                }}
                              >
                                {field.label || "Untitled question"}
                              </div>
                            )}
                          </Form.Label>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          xs={6}
                          className="d-flex justify-content-end mt-2"
                        >
                          <Form.Label className="block text-sm font-medium text-gray-700 capitalize">
                            <Dropdown
                              onSelect={(e) => editFieldType(field.sequence, e)}
                            >
                              <Dropdown.Toggle
                                variant="ligth"
                                id="dropdown-basic"
                                style={{ border: "1px solid #A0A0A0" }}
                              >
                                {field.question_type}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item eventKey="short_answer">
                                  {" "}
                                  <MdOutlineShortText /> Short Answer
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="paragraph">
                                  {" "}
                                  <MdOutlineFormatAlignLeft /> Paragraph
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="multichoice">
                                  {" "}
                                  <MdOutlineArrowDropDownCircle /> Multichoice
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="checkbox">
                                  {" "}
                                  <MdOutlineCheckBox /> Checkbox
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="radio">
                                  {" "}
                                  <MdOutlineRadioButtonChecked /> Radio
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="date">
                                  {" "}
                                  <MdDateRange /> Date
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="time">
                                  {" "}
                                  <MdAccessTime /> Time
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="email">
                                  {" "}
                                  <MdOutlineEmail /> Email
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Form.Label>
                        </Form.Group>
                      </Row>

                      <div className="my-3 w-full">
                        {field.question_type === "short_answer" && (
                          <div>
                            <div className="mb-2">
                              <Form.Control
                                style={{
                                  border: "none",
                                  outline: "none",
                                  borderBottom: "1px solid #787878",
                                  borderRadius: "0px",
                                }}
                                type="text"
                                placeholder={field.label}
                              />
                            </div>

                            <Row className="d-flex align-items-center mt-3">
                              <hr className="mt-2 mb-4" />
                              <Form.Group as={Col}>
                                <Form.Check
                                  style={{ borderColor: "#66CCCC" }}
                                  type="switch"
                                  id="custom-switch"
                                  value={field.required}
                                  label="required"
                                  onChange={(e) => {
                                    editRequired(
                                      field.sequence,
                                      e.target.checked
                                    );
                                  }}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  className="btn btn-white btn-sm p-0"
                                  variant="light"
                                  onClick={() => {
                                    deleteField(field.sequence);
                                  }}
                                >
                                  <MdDelete
                                    style={{
                                      height: "1.4rem",
                                      width: "1.4rem",
                                    }}
                                  />
                                </Button>
                              </Form.Group>
                            </Row>
                          </div>
                        )}
                        {field.question_type === "date" && (
                          <div>
                            <div>
                              <Form.Control
                                style={{
                                  border: "none",
                                  outline: "none",
                                  borderBottom: "1px solid #787878",
                                  borderRadius: "0px",
                                }}
                                type="date"
                                className="px-5 h-10 rounded-md block w-full"
                                placeholder={field.label}
                              />
                            </div>
                            <Row className="d-flex align-items-center mt-3">
                              <hr className="mt-2 mb-4" />
                              <Form.Group as={Col}>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  checked={field.required || false}
                                  value={field.required}
                                  label="required"
                                  onChange={(e) => {
                                    editRequired(
                                      field.sequence,
                                      e.target.checked
                                    );
                                  }}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  className="btn btn-white btn-sm p-0"
                                  variant="light"
                                  onClick={() => {
                                    deleteField(field.sequence);
                                  }}
                                >
                                  <MdDelete
                                    style={{
                                      height: "1.4rem",
                                      width: "1.4rem",
                                    }}
                                  />
                                </Button>
                              </Form.Group>
                            </Row>
                          </div>
                        )}
                        {field.question_type === "time" && (
                          <div>
                            <div>
                              <Form.Control
                                style={{
                                  border: "none",
                                  outline: "none",
                                  borderBottom: "1px solid #787878",
                                  borderRadius: "0px",
                                }}
                                type="time"
                                className="px-5 h-10 rounded-md block w-full"
                                placeholder={field.label}
                              />
                            </div>
                            <Row className="d-flex align-items-center mt-3">
                              <hr className="mt-2 mb-4" />
                              <Form.Group as={Col}>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  checked={field.required || false}
                                  value={field.required}
                                  label="required"
                                  onChange={(e) => {
                                    editRequired(
                                      field.sequence,
                                      e.target.checked
                                    );
                                  }}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  className="btn btn-white btn-sm p-0"
                                  variant="light"
                                  onClick={() => {
                                    deleteField(field.sequence);
                                  }}
                                >
                                  <MdDelete
                                    style={{
                                      height: "1.4rem",
                                      width: "1.4rem",
                                    }}
                                  />
                                </Button>
                              </Form.Group>
                            </Row>
                          </div>
                        )}
                        {field.question_type === "paragraph" && (
                          <div>
                            <div>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder={field.label}
                              />
                            </div>
                            <Row className="d-flex align-items-center mt-3">
                              <hr className="mt-2 mb-4" />
                              <Form.Group as={Col}>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  checked={field.required || false}
                                  value={field.required}
                                  label="required"
                                  onChange={(e) => {
                                    editRequired(
                                      field.sequence,
                                      e.target.checked
                                    );
                                  }}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  className="btn btn-white btn-sm p-0"
                                  variant="light"
                                  onClick={() => {
                                    deleteField(field.sequence);
                                  }}
                                >
                                  <MdDelete
                                    style={{
                                      height: "1.4rem",
                                      width: "1.4rem",
                                    }}
                                  />
                                </Button>
                              </Form.Group>
                            </Row>
                          </div>
                        )}
                        {field?.question_type === "multichoice" && (
                          <div className="my-3 flex flex-col space-y-2">
                            {field?.options?.map((item, index) => (
                              <Row className="d-flex align-items-center mt-3 mb-3">
                                <Form.Group as={Col} sm={11}>
                                  <div className="d-flex justify-content-end d-flex align-items-center">
                                    No.{index + 1}{" "}
                                    <Form.Control
                                      style={{
                                        border: "none",
                                        outline: "none",
                                        borderBottom: "1px solid #787878",
                                        borderRadius: "0px",
                                      }}
                                      type="text"
                                      value={item.label}
                                      onChange={(e) => {
                                        const newoptions = [...field.options];
                                        newoptions[index] = e.target.value;
                                        editFieldOption(
                                          field.label,
                                          item,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  className="d-flex justify-content-end"
                                >
                                  <div
                                    className="mb-2"
                                    onClick={() => {
                                      deleteFieldOption(field?.label, item);
                                    }}
                                  >
                                    <RiCloseLine />
                                  </div>
                                </Form.Group>
                              </Row>
                            ))}
                            <div className="flex space-between mt-2">
                              <div className="mt-2 d-flex justify-content-end">
                                <Button
                                  variant="dark"
                                  className="btn btn-primary btn-sm mt-2 p-1"
                                  onClick={() =>
                                    addFieldOption(field.sequence, textField)
                                  }
                                >
                                  <HiPlusCircle
                                    style={{ height: "1rem", width: "1.3rem" }}
                                  />
                                </Button>
                              </div>
                              <Row className="d-flex align-items-center mt-2">
                                <hr className="mt-2 mb-4" />
                                <Form.Group as={Col}>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={field.required || false}
                                    value={field.required}
                                    label="required"
                                    onChange={(e) => {
                                      editRequired(
                                        field.sequence,
                                        e.target.checked
                                      );
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  className="d-flex justify-content-end"
                                >
                                  <Button
                                    className="btn btn-white btn-sm p-0"
                                    variant="light"
                                    onClick={() => {
                                      deleteField(field.sequence);
                                    }}
                                  >
                                    <MdDelete
                                      style={{
                                        height: "1.4rem",
                                        width: "1.4rem",
                                      }}
                                    />
                                  </Button>
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        )}
                        {field.question_type === "checkbox" && (
                          <div className="my-3 flex flex-col space-y-2">
                            {/* <div className="flex space-between">
                        <label>{field.label}</label>
                      </div> */}
                            {field.options.map((item, index) => (
                              <Row
                                key={index}
                                className="d-flex align-items-center mt-2 mb-3"
                              >
                                <FormGroup as={Col} sm={11}>
                                  <div className="d-flex justify-content-end d-flex align-items-center">
                                    <MdCheckBoxOutlineBlank />{" "}
                                    <Form.Control
                                      style={{
                                        border: "none",
                                        outline: "none",
                                        borderBottom: "1px solid #787878",
                                        borderRadius: "0px",
                                      }}
                                      type="text"
                                      value={item.label}
                                      onChange={(e) => {
                                        const newoptions = [...field.options];
                                        newoptions[index] = e.target.value;
                                        editFieldOption(
                                          field.label,
                                          item,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                </FormGroup>
                                <Form.Group
                                  as={Col}
                                  className="d-flex justify-content-end"
                                >
                                  <div
                                    onClick={() => {
                                      deleteFieldOption(field.label, item);
                                    }}
                                  >
                                    <RiCloseLine />
                                  </div>
                                </Form.Group>
                              </Row>
                            ))}
                            <div className="flex space-between">
                              <div>
                              </div>
                              <div className="mt-2 d-flex justify-content-end">
                                <Button
                                  variant="dark"
                                  className="btn btn-primary btn-sm mt-2 p-1"
                                  onClick={() =>
                                    addFieldOption(field.sequence, textField)
                                  }
                                >
                                  <HiPlusCircle
                                    style={{ height: "1rem", width: "1.3rem" }}
                                  />
                                </Button>
                              </div>
                              <Row className="d-flex align-items-center mt-2">
                                <hr className="mt-2 mb-4" />
                                <Form.Group as={Col}>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={field.required || false}
                                    value={field.required}
                                    label="required"
                                    onChange={(e) => {
                                      editRequired(
                                        field.sequence,
                                        e.target.checked
                                      );
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  className="d-flex justify-content-end"
                                >
                                  <Button
                                    className="btn btn-white btn-sm p-0"
                                    variant="light"
                                    onClick={() => {
                                      deleteField(field.sequence);
                                    }}
                                  >
                                    <MdDelete
                                      style={{
                                        height: "1.4rem",
                                        width: "1.4rem",
                                      }}
                                    />
                                  </Button>
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        )}

                        {field.question_type === "radio" && (
                          <div>
                            {field?.options?.map((item, index) => (
                              <Row
                                key={index}
                                className="d-flex justify-content-end align-items-center"
                              >
                                {/* <FormGroup as={Col} sm={1}>
                                  <MdRadioButtonUnchecked />
                                </FormGroup> */}
                                <FormGroup as={Col} sm={10}>
                                  <div className="d-flex justify-content-end d-flex align-items-center">
                                    <MdRadioButtonUnchecked />{" "}
                                    <Form.Control
                                      style={{
                                        border: "none",
                                        outline: "none",
                                        borderBottom: "1px solid #787878",
                                        borderRadius: "0px",
                                      }}
                                      type="text"
                                      value={item?.label}
                                      onChange={(e) => {
                                        editFieldOptionRadio(
                                          field.sequence,
                                          index,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                </FormGroup>
                                <Form.Group as={Col}>
                                  <div className="d-flex justify-content-end d-flex align-items-center">
                                    <Button
                                      variant="white"
                                      onClick={() => {
                                        const subfield = {
                                          fieldsequent: stateCount,
                                          label: `Untitled question${stateCount}`,
                                          required: false,
                                          questionType: "short_answer",
                                        };
                                        addSubfield(
                                          field.sequence,
                                          index,
                                          subfield
                                        );
                                      }}
                                    >
                                      <HiPlusCircle
                                        style={{
                                          height: "1.4rem",
                                          width: "1.4rem",
                                        }}
                                      />
                                    </Button>
                                    <div
                                      style={{ padding: "8px" }}
                                      onClick={() => {
                                        deleteOptionFields(
                                          field.sequence,
                                          index
                                        );
                                      }}
                                    >
                                      <RiCloseLine />
                                    </div>
                                  </div>
                                </Form.Group>
                              </Row>
                            ))}
                            <div>
                              <div className="d-flex justify-content-end">
                                <Button
                                  className="btn btn-primary btn-sm mt-2 p-1"
                                  variant="dark"
                                  onClick={() =>
                                    addFieldOptionRadio(
                                      field.sequence,
                                      textField
                                    )
                                  }
                                >
                                  <HiPlusCircle
                                    style={{ height: "1rem", width: "1.3rem" }}
                                  />
                                </Button>
                              </div>
                              <hr></hr>
                              {field?.options?.map((option) =>
                                option.fields.map((items, index) => {
                                  return (
                                    <div>
                                      <h4 className="pt-2 pb-2">Current {option.label}</h4>
                                      <Row>
                                        <Form.Group
                                          as={Col}
                                          xs={6}
                                          className="mt-3"
                                        >
                                          <Form.Label>
                                            {editedField && (
                                              <Form.Control
                                                type="text"
                                                value={items?.label}
                                                 placeholder="Untitled question"
                                                onChange={(e) => {
                                                  handleLabelChange(
                                                    e,
                                                    field.sequence,
                                                    index,
                                                    items.fieldsequent
                                                  ); // Pass field.sequence and index as arguments
                                                }}
                                                onBlur={() =>
                                                  setEditedField(null)
                                                }
                                              />
                                            )}

                                            {!editedField && (
                                              <div
                                                onClick={() =>
                                                  handleEditField(items)
                                                }
                                              >
                                                {items?.label || "Untitled question"}
                                              </div>
                                            )}
                                          </Form.Label>
                                        </Form.Group>
                                        <Form.Group
                                          as={Col}
                                          xs={6}
                                          className="d-flex justify-content-end"
                                        >
                                          <Form.Label>
                                            <Dropdown
                                              onSelect={(e) =>
                                                editFieldTypeOptions(items, e)
                                              }
                                            >
                                              <Dropdown.Toggle
                                                variant="ligth"
                                                id="dropdown-basic"
                                                style={{
                                                  border: "1px solid #A0A0A0",
                                                }}
                                              >
                                                {items.questionType}
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <Dropdown.Item eventKey="short_answer">
                                                  {" "}
                                                  <MdOutlineShortText /> Short
                                                  Answer
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="paragraph">
                                                  {" "}
                                                  <MdOutlineFormatAlignLeft />{" "}
                                                  Paragraph
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey="date">
                                                  {" "}
                                                  <MdDateRange /> Date
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="time">
                                                  {" "}
                                                  <MdAccessTime /> Time
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </Form.Label>
                                        </Form.Group>
                                      </Row>
                                      {items.questionType === "short_answer" ? (
                                        <div>
                                          <div>
                                            <Form.Control
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                borderBottom:
                                                  "1px solid #787878",
                                                borderRadius: "0px",
                                              }}
                                              type="text"
                                              placeholder={items?.label}
                                            />
                                          </div>

                                          <Row>
                                            <Form.Group as={Col}>
                                              <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                value={items?.required}
                                                label="required"
                                                onChange={(e) => {
                                                  editRequiredOptionField(
                                                    field.sequence,
                                                    items?.fieldsequent,
                                                    e.target.checked
                                                  );
                                                }}
                                              />
                                            </Form.Group>
                                            <Form.Group
                                              as={Col}
                                              className="d-flex justify-content-end"
                                            >
                                              <Button
                                                className="btn btn-sm p-0 mt-2"
                                                variant="light"
                                                onClick={() => {
                                                  deleteFieldInOption(
                                                    field?.sequence,
                                                    option.label,
                                                    items?.label
                                                  );
                                                }}
                                              >
                                                <MdDelete
                                                  style={{
                                                    height: "1.4rem",
                                                    width: "1.4rem",
                                                  }}
                                                />
                                              </Button>
                                            </Form.Group>
                                          </Row>
                                          <hr></hr>
                                        </div>
                                      ) : null}
                                      {items.questionType === "date" && (
                                        <div>
                                          <div>
                                            <Form.Control
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                borderBottom:
                                                  "1px solid #787878",
                                                borderRadius: "0px",
                                              }}
                                              type="date"
                                              className="px-5 h-10 rounded-md block w-full"
                                              placeholder={field.label}
                                            />
                                          </div>
                                          <Row className="d-flex align-items-center mt-3">
                                            <Form.Group as={Col}>
                                              <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                value={field.required}
                                                label="required"
                                                onChange={(e) => {
                                                  editRequiredOptionField(
                                                    field.sequence,
                                                    items.fieldsequent,
                                                    e.target.checked
                                                  );
                                                }}
                                              />
                                            </Form.Group>
                                            <Form.Group
                                              as={Col}
                                              className="d-flex justify-content-end"
                                            >
                                              <Button
                                                className="btn btn-sm p-0"
                                                variant="light"
                                                onClick={() => {
                                                  deleteFieldInOption(
                                                    field?.sequence,
                                                    option.label,
                                                    items?.label
                                                  );
                                                }}
                                              >
                                                <MdDelete
                                                  style={{
                                                    height: "1.4rem",
                                                    width: "1.4rem",
                                                  }}
                                                />
                                              </Button>
                                            </Form.Group>
                                          </Row>
                                          <hr></hr>
                                        </div>
                                      )}
                                      {items.questionType === "time" && (
                                        <div>
                                          <div>
                                            <Form.Control
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                borderBottom:
                                                  "1px solid #787878",
                                                borderRadius: "0px",
                                              }}
                                              type="time"
                                              className="px-5 h-10 rounded-md block w-full"
                                              placeholder={field.label}
                                            />
                                          </div>
                                          <Row className="d-flex align-items-center mt-3">
                                            <Form.Group as={Col}>
                                              <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                value={field.required}
                                                label="required"
                                                onChange={(e) => {
                                                  editRequiredOptionField(
                                                    field.sequence,
                                                    items.fieldsequent,
                                                    e.target.checked
                                                  );
                                                }}
                                              />
                                            </Form.Group>
                                            <Form.Group
                                              as={Col}
                                              className="d-flex justify-content-end"
                                            >
                                              <Button
                                                className="btn btn-sm p-0"
                                                variant="light"
                                                onClick={() => {
                                                  deleteFieldInOption(
                                                    field?.sequence,
                                                    option.label,
                                                    items?.label
                                                  );
                                                }}
                                              >
                                                <MdDelete
                                                  style={{
                                                    height: "1.4rem",
                                                    width: "1.4rem",
                                                  }}
                                                />
                                              </Button>
                                            </Form.Group>
                                          </Row>
                                          <hr></hr>
                                        </div>
                                      )}
                                      {items.questionType === "paragraph" && (
                                        <div>
                                          <div>
                                            <Form.Control
                                              as="textarea"
                                              rows={4}
                                              placeholder={field.label}
                                            />
                                          </div>
                                          <Row className="d-flex align-items-center mt-3">
                                            <Form.Group as={Col}>
                                              <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                value={field.required}
                                                label="required"
                                                onChange={(e) => {
                                                  editRequiredOptionField(
                                                    field.sequence,
                                                    items.fieldsequent,
                                                    e.target.checked
                                                  );
                                                }}
                                              />
                                            </Form.Group>
                                            <Form.Group
                                              as={Col}
                                              className="d-flex justify-content-end"
                                            >
                                              <Button
                                                className="btn btn-sm p-0"
                                                variant="light"
                                                onClick={() => {
                                                  deleteFieldInOption(
                                                    field?.sequence,
                                                    option.label,
                                                    items?.label
                                                  );
                                                }}
                                              >
                                                <MdDelete
                                                  style={{
                                                    height: "1.4rem",
                                                    width: "1.4rem",
                                                  }}
                                                />
                                              </Button>
                                            </Form.Group>
                                          </Row>
                                          <hr></hr>
                                        </div>
                                      )}
                                      {items.questionType === "email" && (
                                        <div>
                                          <Row className="d-flex align-items-center mt-3">
                                            <hr className="mt-2 mb-4" />
                                            <Form.Group as={Col}>
                                              <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                checked={
                                                  field.required || false
                                                }
                                                value={field.required}
                                                label="required"
                                                onChange={(e) => {
                                                  editRequired(
                                                    field.sequence,
                                                    e.target.checked
                                                  );
                                                }}
                                              />
                                            </Form.Group>
                                            <Form.Group
                                              as={Col}
                                              className="d-flex justify-content-end"
                                            >
                                              <Button
                                                className="btn btn-sm p-0"
                                                variant="light"
                                                onClick={() => {
                                                  deleteFieldInOption(
                                                    field?.sequence,
                                                    option.label,
                                                    items?.label
                                                  );
                                                }}
                                              >
                                                <MdDelete
                                                  style={{
                                                    height: "1.4rem",
                                                    width: "1.4rem",
                                                  }}
                                                />
                                              </Button>
                                            </Form.Group>
                                          </Row>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                              <hr></hr>
                              <Row>
                                <Form.Group as={Col}>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={field.required || false}
                                    value={field.required}
                                    label="required"
                                    onChange={(e) => {
                                      editRequired(
                                        field.sequence,
                                        e.target.checked
                                      );
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  className="d-flex justify-content-end "
                                >
                                  <Button
                                    className="btn btn-sm p-0"
                                    variant="light"
                                    onClick={() => {
                                      deleteField(field.sequence);
                                    }}
                                  >
                                    <MdDelete
                                      style={{
                                        height: "1.4rem",
                                        width: "1.4rem",
                                      }}
                                    />
                                  </Button>
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pb-1">
                <Button onClick={() => addQuestion()} style={{ width: "100%" }}>
                  <HiPlusCircle className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => submitForm()}
                  style={{ width: "100%" }}
                  className="btn btn-success"
                >
                  Submit
                </Button>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default EditForms;
