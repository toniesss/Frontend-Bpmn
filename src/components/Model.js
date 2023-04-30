import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = ({ show, buttontitle, handleClose, handleAction, modalTitle, modalBody, buttoncolor }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={buttoncolor} onClick={handleAction}>
          {buttontitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
