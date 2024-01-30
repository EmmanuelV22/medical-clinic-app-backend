import React from "react";
import Login from "../components/Login";
import DarkMode from "../components/DarkMode";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url("../clinic-logo-removebg.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "93.1vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
      }}
      className="w-100 h-100" 
    >
      <Login />
    </div>
  );
};

export default Home;
