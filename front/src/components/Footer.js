import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{ "--bs-gutter-x": " 0", backgroundColor: "black" }}
      className="row footer text-light p-2"
    >
      <div className="col d-flex  ">
        <div className=" container-fluid content-footer align-items-center d-flex justify-content-around ">
          <span className="text-white date-footer">© 2024</span>
          <span className="text-white">
            <Link className="nav-link  text-white" to="clinic/aboutUs">
              Nosotros
            </Link>
          </span>
          <span className="text-white">
            <Link className="nav-link  text-white " to="/">
              Inicio
            </Link>
          </span>
          <div>
            <div className="list-unstyled m-0">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "20px" }}
                  className="icon icon-tabler icon-tabler-brand-instagram homeHover"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#a905b6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M16.5 7.5l0 .01" />
                </svg>
              </a>
              <a
                href="https://twitter.com/i/flow/login?redirect_after_login=%2Flogin%3Flang%3Den"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "20px" }}
                  className="icon icon-tabler icon-tabler-brand-x homeHover"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // style={{ marginRight: "20px" }}
                  className="icon icon-tabler icon-tabler-brand-facebook homeHover"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#597e8d"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
