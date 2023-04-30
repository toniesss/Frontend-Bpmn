import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';  
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';  
import FormControl from 'react-bootstrap/FormControl';
//import FormCheck from 'react-bootstrap/FormCheck';  
import FormGroup from 'react-bootstrap/FormGroup';
import AuthContext from '../../context/AuthContext';

//import "./LoginPage.css";
  

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)
      
      // const validated = false;

  return (
<Container fluid>
  <Row style={{ minHeight: "100vh"}}>
    <Col className="d-flex flex-column align-items-center justify-content-center mx-auto"
      style={{
        backgroundColor: "white",
        backgroundImage:
          "linear-gradient(#2d3742c9, #007affc9), url(../image/bg.jpg)",
        backgroundSize: "cover"
      }}
    >
      <h4 className="text-white">Log In</h4>
      <Card
        bg="dark"
        text="white"
        className='card'
        style={{ maxHeight: "60vh", maxWidth: "50vh" }}
      >
        <Form
          className="p-5 shadow rounded"
          noValidate
          // validated={validated}
          onSubmit={loginUser}
        >
          <FormGroup>
            <Form.Label htmlFor="emailInput">Email Address</Form.Label>
            <FormControl
              id="emailInput"
              type="email"
              name="email"
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter in a valid email address
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <FormControl
              id="passwordInput"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              type="password"
              name="password"
              required
            />
            <FormControl.Feedback type="invalid">
              Password Incorrect
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            {/* <div className="d-flex align-items-center">
              <FormCheck className="p-1 mt-0 ml-3" id="agree2Terms" />
              <FormCheck.Label htmlFor="agree2Terms">
                Remember Me
              </FormCheck.Label>
            </div> */}
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </FormGroup>
          {/* <FormGroup className="d-flex justify-content-between mb-0">
            <Button variant="link">← Create Account</Button>
            <Button variant="link">Forgot Password</Button>
          </FormGroup> */}
        </Form>
      </Card>
    </Col>
  </Row>
</Container>
  )
}

export default LoginPage  
