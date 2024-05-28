import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const {pathname} = useLocation();
  const paths = pathname.split('/')
  const active_path = paths[1];
  
  return (
    <nav className="ps-3 navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Coach-Student App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className={`nav-item `}>
            <Link className={`nav-link ${active_path === 'coach' ? 'active' : ''}`} to="/coach">Coach Dashboard</Link>
          </li>
          <li className="nav-item active">
            <Link className={`nav-link ${active_path === 'student' ? 'active' : ''}`} to="/student">Student Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
