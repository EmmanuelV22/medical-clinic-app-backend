import React, { useEffect, useState } from "react";


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
    <div>
      
      {isLoading ? 
      
      <h1>Cargando...</h1>

      
      
      
      : <h1>ACCESO DENEGADO</h1>}
    </div>
  );
};

export default AccessDenied;
