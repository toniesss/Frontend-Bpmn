import React from "react";
import Users from "./User";
import "./Styles/Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbars = () => {
  return (
    <Navbar className="navbar" expand={false}>
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${false}`}
            ></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Link className="btn-linkpages mb-2" to="/Dashboard">Dashboard</Link>
              <Link className="btn-linkpages mb-2 mt-2" to="/Startworkflow">Startworkflow</Link>
              <Link className="btn-linkpages mb-2 mt-2" to="/Myforms">Myforms</Link>
              <Link className="btn-linkpages mb-2 mt-2" to="/Mytasks">Mytasks</Link>
              <Link className="btn-linkpages mb-2 mt-2" to="/Workflowlist">Workflowlist</Link>
              <Link className="btn-linkpages mb-2 mt-2" to="/CreateForms">Forms</Link>
              <Link className="btn-linkpages mb-2 mt-2" to="/Tableforms">Formslist</Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <div className="ms-auto">
          <Users/>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navbars;