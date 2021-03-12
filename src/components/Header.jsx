import React from "react";
import logoPng from "../assets/images/movie.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header(param) {
  function _handleKeyDown(e) {
    if (e.key === "Enter") {
      param.searchwithFilter(e);
    }
  }
  return (
    <header className="App-header">
      <div className="header">
        <section className="logo">
          <img className="image" src={logoPng} alt="" />
        </section>
        <section className="search-bar">
          <input
            type="text"
            placeholder="Search ..."
            onChange={param.onchangeFilter}
            onKeyDown={_handleKeyDown}
          />
          <button
            type="submit"
            className="search-button"
            onClick={param.searchwithFilter}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </section>
        <section className="nav-bar">
          <span className="nav-button">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <ul className="menu">
            <li>Login</li>
            <li>Register</li>
            <li>About</li>
          </ul>
        </section>
      </div>
    </header>
  );
}
