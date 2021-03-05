import React, { useState } from "react";
import {
  AiFillHome,
  AiFillProject,
  AiFillPlusCircle,
  AiFillInfoCircle,
  AiFillSmile,
} from "react-icons/ai";
import "./Navbar.scss";
export default function Navbar(params) {
  const [isActive, setisActive] = React.useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <a href="/" className="navbar-item white">
            <AiFillHome color="white" />
          </a>

          <a href="/" className="navbar-item white">
            <AiFillProject color="white" /> <b class="left-margin">Nástěnky</b>
          </a>
        </div>

        <div className="navbar-item">
          <b class="white">PhamRello</b>
        </div>

        <div className="navbar-end">
          <a href="/" className="navbar-item white">
            <AiFillInfoCircle />
          </a>
          <a href="/" className="navbar-item white">
            <AiFillPlusCircle />
          </a>
          <a href="/" className="navbar-item white">
            <AiFillSmile />
          </a>
        </div>
      </div>
    </nav>
  );
}
