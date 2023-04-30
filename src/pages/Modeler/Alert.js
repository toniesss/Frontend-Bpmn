import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './Styles/Modeler.css';

export default function AlertDismissible({show, setShow}) {

  return (
    <>
    <Alert className='alert' show={show} variant="primary">
        <Alert.Heading>Deploy Success</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-primary">
            Close
          </Button>
        </div>
      </Alert>

    </>
  );
}

