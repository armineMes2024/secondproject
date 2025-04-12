import { Link, NavLink } from "react-router-dom";

import "./appHeader.scss"

export default function AppHeader () {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              end
              to="/"
              style={({ isActive, isPending }) => ({ color: isActive ? "#9F0013" : "#aaa" })}
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              end
              to="/comics/"
              style={({ isActive, isPending }) => ({ color: isActive ? "#9F0013" : "#aaa" })}
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}