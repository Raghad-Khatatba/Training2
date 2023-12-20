import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid container ">
        <p
          className="navbar-brand text-center"
          style={{
            color: "white",
            fontFamily: '"Dosis", sans-serif',
            fontWeight: 800,
            fontSize: 22,
          }}
        >
          Foodies<span style={{ color: "rgb(245, 117, 43)" }}>Hup</span>
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars text-white" />
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item me-4">
              <Link
                className="nav-link text-light"
                aria-current="page"
                to="/"
              >
                HOME
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link text-light" to="/search">
                SEARCH
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link text-light" to="/favorite">
                FAVORITE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
