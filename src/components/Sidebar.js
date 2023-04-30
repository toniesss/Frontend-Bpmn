import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Styles/Sidebar.css";

const Sidebar = ({children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <FaIcons.FaChartBar />,
    },
    {
      path: "/Startworkflow",
      name: "Startworkflow",
      icon: <FaIcons.FaFileExport />,
    },
    {
      path: "/Myforms",
      name: "Myforms",
      icon: <FaIcons.FaClipboard />,
    },
    {
      path: "/Mytasks",
      name: "Mytasks",
      icon: <FaIcons.FaFileAlt />,
    },
    {
      path: "/Workflowlist",
      name: "Workflowlist",
      icon: <FaIcons.FaList />,
    },
    {
      path: "/CreateForms",
      name: "Forms",
      icon: <FaIcons.FaWpforms/>
    },
    {
      path: "/Tableforms",
      name: "Formslist",
      icon: <FaIcons.FaTable/>
    }
  ];

  const handleClick = (item) => {
    setActivePath(item.path);
    navigate(item.path);
  };

  return (
    <div className="containers">
      <div style={{ width: isOpen ? "200px" : "80px" }} className="sidebar">
        <div className="top_section">
          <div
            style={{ marginLeft: isOpen ? "120px" : "0px" }}
            className="bars"
          >
            <FaIcons.FaBars onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <button
            onClick={() => handleClick(item)}
            key={index}
            className={`link ${activePath === item.path ? "active" : ""}`}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="linktext-sb"
            >
              {item.name}
            </div>
          </button>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;