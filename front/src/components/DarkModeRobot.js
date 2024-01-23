import React, { useState, useEffect } from "react";

const DarkModeRobot = () => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const [isDarkMode, setIsDarkMode] = useState(savedDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <div
        onClick={toggleDarkMode}
        style={{ position: "absolute", top: "150px", right: "80px" }}
      >
        <label className="ui-switch">
          <input type="checkbox" />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
      </div>
    </>
  );
};

export default DarkModeRobot;
