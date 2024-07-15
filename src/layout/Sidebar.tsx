// src/Sidebar.js
// import React from 'react';

import { Nav } from "react-bootstrap";
import { BsPostageFill } from "react-icons/bs";
import { FaComments, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <h1>Welcome</h1>
          <Link to="/users" className="text-decoration-none  ml-2 fs-6 px-2 py-2 bg-navlink">
            <FaUsers className="m-right"/>
            <span className="ml-2">Users</span>
          </Link>
          <Link to="/posts" className="text-decoration-none  ml-2 fs-6 px-2 py-2 bg-navlink">
            <BsPostageFill className="m-right"/>
            <span className="ml-2"> Posts</span>
          </Link>
          <Link to="/comments" className="text-decoration-none  ml-2 fs-6 px-2 py-2 bg-navlink">
            <FaComments className="m-right"/>
            <span className="ml-2">Comments</span>
          </Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
