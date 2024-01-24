import React from "react";
import Login from "../components/Login";
import DarkMode from "../components/DarkMode";

const Home = () => {

  return (
    <>
      <DarkMode />
      <div className="logo text-center mx-auto" style={{ height: "74.5vh" }}>
        <img
          style={{ transform: "translateY(-13.3%)" }}
          src="../clinic-logo-removebg.png"
          alt="logo app clinic"
          width="790"
        />
      </div>
      <div style={{ position: "relative" }}>
        <Login />
      </div>
    </>
  );
};

export default Home;
