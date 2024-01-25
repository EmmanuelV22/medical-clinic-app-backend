import React from "react";
import Login from "../components/Login";
import DarkMode from "../components/DarkMode";

const Home = () => {
  return (
    <div 
    className=""
    // style={{height:""}}
    >
      <DarkMode />
      <div className="d-flex justify-content-center">
        <img
          style={{objectFit:"cover",zIndex:"-100",overflow:"hidden",width:"100%" }}
          src="../clinic-logo-removebg.png"
          alt="logo app clinic"
        />
      </div>
      <Login />
    </div>
  );
};

export default Home;
