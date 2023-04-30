import React,{useContext} from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import './Styles/User.css'
import AuthContext from '../context/AuthContext';

const Users = () => {

  const {logoutUser} = useContext(AuthContext)

  const handleDropdownSelection = (e) => {
    console.log(e);
    if(e === "logout") {
      logoutUser()
    }

  };

  

  return (
    <div className="dropdown-user">
      <Dropdown onSelect={(e) => handleDropdownSelection(e)}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <FaUser /> User Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="profile">Profile</Dropdown.Item>
          <Dropdown.Item eventKey="settings">Settings</Dropdown.Item>
          <Dropdown.Item eventKey="help">Help</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="logout"> Log out </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Users;
