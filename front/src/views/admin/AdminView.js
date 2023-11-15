/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import AdminAllPatients from "../../components/admin/AdminAllPatients";
import AdminAllEmployees from "../../components/admin/AdminAllEmployees";
import Navbar from "../../components/Navbar";

const AdminView = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllPatients();
    actions.getAllEmployees();
  }, []);
  return (
    <div>
      <Navbar />
      {store.employee && store.employee.specialist === "admin" ? (
        <div className="container my-5">
          <ul
            className="nav nav-tabs menu-review mx-auto text-center w-100"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item nav-review w-50" role="presentation">
              <button
                className="nav-link active w-100"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                PACIENTES
              </button>
            </li>
            <li className="nav-item nav-review w-50" role="presentation">
              <button
                className="nav-link w-100"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                EMPLEADOS
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <AdminAllPatients />
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <AdminAllEmployees />
            </div>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </div>
  );
};

export default AdminView;
