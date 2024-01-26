import React from "react";
import Login from "../components/Login";
import DarkMode from "../components/DarkMode";

const Home = () => {
  return (
    <div
    style={{backgroundImage:`url("../clinic-logo-removebg.png")`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"70%"}}
    className="d-flex flex-column align-items-center justify-content-center text-center min-vh-100 pb-5">
      <DarkMode />
      <Login />
    </div>
  );
};

export default Home;
