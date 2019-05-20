import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46, 31)"
};

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink className="navLink" to="/" exact activeStyle={activeStyle}>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navLink"
            to="/new"
            exact
            activeStyle={activeStyle}
          >
            New
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
