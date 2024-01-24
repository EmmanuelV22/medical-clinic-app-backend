import React from "react";
import Login from "../components/Login";
import DarkMode from "../components/DarkMode";

const Home = () => {
  return (
    <>
      <DarkMode />
      <div className="text-center" style={{ height: "77.8vh", width: "100%" }}>
        <img
          style={{ width: "100%", paddingTop: "50px" }}
          src="../clinic-logo-removebg.png"
          alt="logo app clinic"
        />
      </div>
      <Login />
    </>
  );
};

export default Home;
