import React from "react";
import foodImage from "../../Img/Pizza-3007395.jpg";
import "./about.css";
export default function About() {
  return (
    <>
      <div className="row about">
        <div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center">
          <img src={foodImage} alt="food" />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-white">
          <h1>Who we are?</h1>
          <p
            className="navbar-brand text-center mt-4"
            style={{
              color: "white",
              fontFamily: '"Dosis", sans-serif',
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            Foodies<span style={{ color: "rgb(245, 117, 43)" }}>Hup</span>
          </p>
          <p className="w-75">
            We have been in business for over 30 years. We offer you more than
            100 recipes. Choose the recipe you like and try it. We are very
            happy about this topic. Every day makes our lives better.
          </p>
        </div>
      </div>
    </>
  );
}
