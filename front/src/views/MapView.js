/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import AccessDenied from "../views/AccessDenied";
import Navbar from "../components/Navbar";

const MapView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = async () => {
    setIsLoading(false);
  };

  return (
    <>
    <Navbar />
    <div className="d-flex align-items-center flex-column justify-content-center ">
      <h1 className="mt-3 pb-2">Encuentranos en el mapa!</h1>
      {isLoading && <AccessDenied />}
      <iframe
        onLoad={handleLoading}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6545.046465229796!2d-56.16710365401475!3d-34.89331666514969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80544d0dee0d%3A0xf523cfeccb51bb48!2sMedica%20Uruguaya%20Emergencia!5e0!3m2!1ses!2suy!4v1705544537170!5m2!1ses!2suy"
        className=""
        style={{ border: 0 ,minWidth:"245px",maxWidth:"800px",minHeight:"245px",maxHeight:"800px",borderRadius:"30px"}}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    </>
  );
};

export default MapView;
