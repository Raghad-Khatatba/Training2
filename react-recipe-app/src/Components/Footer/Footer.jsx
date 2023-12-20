import React from "react";
import "./footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer-top text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
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
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
              </p>
              <div className="col-auto social-icons text-white">
                <a href="#">
                  <i className="fa-brands fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa-brands fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa-brands fa-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p className="mb-0">Copyright@2020. All rights Reserved</p>
      </div>
    </footer>
  );
}
