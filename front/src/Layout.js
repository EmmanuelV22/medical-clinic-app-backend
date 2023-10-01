import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import injectContext from "./store/appContext";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
