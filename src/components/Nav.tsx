import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Candidate Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/SavedCandidates" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
