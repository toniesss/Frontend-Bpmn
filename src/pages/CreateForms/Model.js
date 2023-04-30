import React, { useState,useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { notifySuccess,notifyError } from "../../components/Alert";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";

const CustomModalSubmitForm = ({
  formContent,
  show,
  handleClose,
  buttoncolor,
  formHeader,
  setFormHeader,
  description,
  setShow,
}) => {

  
  let {authTokens} = useContext(AuthContext)

  const [formKey, setFormKey] = useState("")

  const baseUrl = 'http://127.0.0.1:7000'

  console.log(formKey, formHeader)
  const submitForm = async() => {
const bodyform = {
  form_name: formHeader,
  form_key: formKey,
  description: description,
  fields: formContent?.map(fields => ({
    field_name: `${fields?.label.charAt(0).toUpperCase()}${fields?.label.slice(1)}`,
    field_required: fields?.required,
    sequence: fields?.sequence,
    field_type: fields?.question_type,
    options : fields?.options?.map(item => ({
      option_text: item?.label,
      fieldsOption: item?.fields?.map(option => ({
        field_name: `${option?.label.charAt(0).toUpperCase()}${option?.label.slice(1)}`,
        field_required: option?.required,
        field_type: option?.questionType,
        fields_sequence: option?.fieldsequent || 0
      })) || []
    })) || []
  })) || []
};

const spance = ' '
const headers = {
  'content-Type':'application/json',
  'Authorization':'Bearer' + spance + String(authTokens.access)
}
    
  await axios.post(`${baseUrl}/form/create/`,bodyform,{headers:headers})
    .then((res) => {
     console.log(res.data)
      setShow(false)
      notifySuccess("Create Form Success")
    })
    .catch((err) => {
      console.log(err)
      notifyError("Create Form Error")
    })

    console.log(bodyform)
  }

  return (
    <>
    <ToastContainer/>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create From</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="FormName" >
          <Form.Label>From Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="FormKey" 
          value={formHeader}
          onChange={(e) => {setFormHeader(e.target.value)}}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="FormKey">
          <Form.Label>FormKey</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="FormKey" 
          value={formKey}
          onChange={(e) => {setFormKey(e.target.value)}}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={buttoncolor} onClick={submitForm}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default CustomModalSubmitForm;
