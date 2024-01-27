import React from "react";
import Login from "../components/Login";
import DarkMode from "../components/DarkMode";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url("../clinic-logo-removebg.png")`,
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        backgroundPosition: "center",
        backgroundSize: "70%",
      }}
      className="d-flex flex-column align-items-center justify-content-center pt-4 pb-5"
    >
      <Login />
    </div>
  );
};

export default Home;
