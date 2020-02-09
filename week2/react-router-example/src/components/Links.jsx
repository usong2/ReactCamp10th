import React from "react";
import { Link, NavLink } from "react-router-dom";
import queryString from "query-string";

const activeStyle = { color: "green" };

export default function Links() {
  return (
    <div>
      <p>Links</p>
      <ul>
        <li>
          <NavLink exact activeStyle={activeStyle} to="/">
            /
          </NavLink>
        </li>
        <li>
          <NavLink exact activeStyle={activeStyle} to="/profile">
            /profile
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/1">
            /profile/1
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={activeStyle}
            isActive={(match, location) => {
              if (location.pathname !== "/about") return false;
              const { name } = queryString.parse(location.search);
              return name === undefined;
            }}
            to="/about"
          >
            /about
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={activeStyle}
            isActive={(match, location) => {
              if (location.pathname !== "/about") return false;
              const { name } = queryString.parse(location.search);
              return name !== undefined;
            }}
            to="/about?name=mark"
          >
            /about?name=mark
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
}
