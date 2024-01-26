import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const Alerts = () => {
  const { actions, store } = useContext(Context);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (store.response.type !== "" && store.response.message !== "") {
      setIsVisible(true);

      //*type success or danger//

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [store.response]);

  if (!isVisible) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: "9999999999999999",
        maxWidth: "600px",
      }}
      className="px-4"
    >
      <div
        className={`alert d-flex gap-3 align-items-center alert-${store.response.type} alert-container fade w-100 alert-dismissible show border-${store.response.type}`}
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-info-circle-filled text-${store.response.type}"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#7bc62d"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
            strokeWidth="0"
            fill="currentColor"
          />
        </svg>
        <p className="m-0">{store.response.message}</p>
        <button
          type="button"
          className="btn-close justify-self-end"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Alerts;
