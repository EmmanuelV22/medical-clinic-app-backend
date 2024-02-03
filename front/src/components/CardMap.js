import React from "react";
import { useNavigate } from "react-router-dom";

const CardMap = () => {
  let navigate = useNavigate();

  return (
    <>
      <div
        className="card-dashboard mb-3"
        style={{
          background: `url(
              "https://imgs.search.brave.com/TkrXhgo5Y3goUtgA_mWJN-8BUWZhb9AwXW42vWYtLZc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/dmVjdGV1cnMtcHJl/bWl1bS9jYXJ0ZS1s/b2NhbGlzYXRpb24t/cGxpZWUtbWFycXVl/dXItY2FydGUtdmls/bGUtcG9pbnRldXJf/MzQ5OTk5LTc0Ni5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
            )`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="card-details">
          <button
            onClick={() => navigate("/clinc/maps")}
            className="card-button"
          >
            Ubicacion
          </button>
        </div>
      </div>
    </>
  );
};

export default CardMap;
