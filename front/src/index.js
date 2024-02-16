import dotenv from 'dotenv';
dotenv.config();
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
