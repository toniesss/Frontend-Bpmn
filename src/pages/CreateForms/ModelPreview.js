import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

const ModelPreview = ({
    formContent, showModelPreview, setShowModelPreview, 
    handleCloseShowMoselPreview, formHeader, description}) => {

      const setfalse = () => {
        setShowModelPreview(false)
      }


  return (
    <>
      <Modal 
      show={showModelPreview} 
      onHide={handleCloseShowMoselPreview}
      size="xl"
      aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
      <div className="flex flex-col w-full space-y-2 my-4">
        <h1 className="text-2xl font-bold">{formHeader}</h1>
        <h2 className="text-lg">{description}</h2>
      </div>
        <Form className="bg-white shadow-lg rounded-md p-5 my-10">
        {formContent.map((field) => {
          return (
            <div key={`${field.label}-${field.question_type}`}>
              <div className="flex justify-between items-center space-y-1">
                <Form.Label
                  key={field.index}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                 <span>{field.label}</span>
                </Form.Label>
              </div>

              <div className="my-1  w-full">
                {field.question_type === "short_answer" && (
                  <Form.Control
                    type="text"
                    placeholder={field.label}
                    className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                  />
                )}
                {field.question_type === "date" && (
                  <Form.Control
                    type="date"
                    className="px-4 mb-4 h-10 rounded-md block w-full"
                    placeholder={field.label}
                  />
                )}
                {field.question_type === "time" && (
                  <Form.Control
                    type="time"
                    className="px-4 mb-4 h-10 rounded-md block w-full"
                    placeholder={field.label}
                  />
                )}
                {field.question_type === "email" && (
                  <Form.Control
                    type="email"
                    className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                    placeholder={field.label}
                  />
                )}
                {field.question_type === "paragraph" && (
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder={field.label}
                    className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                  />
                )}
                {field.question_type === "multichoice" && (
                  <Form.Select
                    as="select"
                    className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full"
                  >
                    {field.options.map((item) => (
                      <option key={item.index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                )}
                {field.question_type === "radio" && (
                  <div className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full">
                    {field?.options?.map((item) => (
                      <Form.Check
                        key={item.index}
                        type="radio"
                        name={field.name}
                        value={item}
                        label={item.label}
                      />
                    ))}
                  </div>
                )}

                {field.question_type === "checkbox" && (
                  <div className="px-4 mb-4 shadow-sm h-10 rounded-md block w-full">
                    {field?.options?.map((item) => (
                      <Form.Check
                        key={item.index}
                        type="checkbox"
                        name={field.name}
                        value={item}
                        label={item}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Form>
        </Modal.Body>
       <Modal.Footer>
          <Button variant="secondary" onClick={()=> {setfalse()}}>
            Close
         </Button>
          {/*   <Button variant="primary" onClick={setShowModelPreview}>
            Save Changes 
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModelPreview
