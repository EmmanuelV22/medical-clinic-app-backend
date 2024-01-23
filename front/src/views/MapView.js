/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import AccessDenied from "../views/AccessDenied"


const MapView = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const handleLoading = async () =>{
setIsLoading(false)
  }

  return (
    <div className="d-flex align-items-center flex-column justify-content-center vh-100">
      <h1 className="pb-2">Encuentranos en el mapa!</h1>
      {isLoading && <AccessDenied />}
      <iframe onLoad={handleLoading} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6545.046465229796!2d-56.16710365401475!3d-34.89331666514969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80544d0dee0d%3A0xf523cfeccb51bb48!2sMedica%20Uruguaya%20Emergencia!5e0!3m2!1ses!2suy!4v1705544537170!5m2!1ses!2suy" className="mb-5" width="80%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      
    </div>
  );
};

export default MapView;
