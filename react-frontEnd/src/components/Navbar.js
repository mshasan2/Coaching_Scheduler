import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Coach-Student App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/coach">Coach Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/student">Student Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;