import React, { useEffect, useState } from "react";
import denied from "../../src/image_processing20221014-5440-1ixmd18.gif";

const AccessDenied = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Load();
  }, []);

  const Load = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center ">
      {isLoading ? (
        <div className="text-center mt-5">
          <div>
            <h1>Cargando...</h1>
          </div>
          <div className="loaderBar"></div>
        </div>
      ) : (
        <div className="denied-container">
          <h1 className="denied-title">ACCESO DENEGADO</h1>
          <img className="denied-image" src={denied} alt="Acceso denegado" />
        </div>
      )}
    </div>
  );
};

export default AccessDenied;
