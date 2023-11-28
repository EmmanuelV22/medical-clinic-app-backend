/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import EmployeeDetail from "../../components/admin/EmployeeDetail";
import ConfirmDeleteEmployee from "../../components/admin/ConfirmDeleteEmployee";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AdminAllEmployees = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  useEffect(() => {
    actions.getAllEmployees();
  }, []);

  const handleDeleteEmployee = async (id) => {
    console.log("Deleting employee with ID:", id);
    try {
      await actions.deleteEmployee(id);
      console.log("id del try handleDelete", id);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar empleado", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <img
          src="../clinic-logo-removebg.png"
          alt="logo app clinic"
          style={{ width: "5rem" }}
          onClick={() => navigate("/")}
        />
        <div>
          <button
            onClick={() => navigate("/dashboard-admin")}
            className="btn btn-warning m-3"
          >
            Volver
          </button>
        </div>
      </div>
      <div className="admin-employee-content">
        <h1
          className="text-center font-bold my-4"
          style={{ fontSize: "2.5rem" }}
        >
          Lista de empleados:
        </h1>
        <div
          className="table-responsive"
          style={{ width: "100%", margin: "0 auto" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th className="th-id">ID</th>
                <th className="th-employee-name th-general">Firstname</th>
                <th className="th-employee-name th-general">Lastname</th>
                <th className="th-employee-name th-general">DNI</th>
                <th className="th-employee-name th-general">Address</th>
                <th className="th-employee-name th-general">Personal ID</th>
                <th className="th-email th-general">Email</th>
                <th className="th-employee-name th-general">Created at</th>
                <th className="th-employee-name th-general">Updated at</th>
                <th className="th-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {store.employees &&
                store.employees.length >= 1 &&
                store.employees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    <tr className="infos-contain">
                      <td>{employee.id}</td>
                      <td>{employee.firstname}</td>
                      <td>{employee.lastname}</td>
                      <td>{employee.dni}</td>
                      <td>{employee.address}</td>
                      <td>{employee.personalID}</td>
                      <td>{employee.email}</td>
                      <td>{actions.dateFormater(employee.createdAt)}</td>
                      <td>{actions.dateFormater(employee.updatedAt)}</td>
                      <td className="text-center">
                        <button
                          style={{
                            background: "blue",
                            color: "white",
                            border: " 2px solid white",
                            padding: "2px 3px",
                            borderRadius: "6px",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target={"#employeeModal-" + employee.id}
                        >
                          &#9998;
                        </button>
                        <button
                          style={{
                            background: "red",
                            color: "white",
                            border: " 2px solid white",
                            padding: "2px 3px",
                            borderRadius: "6px",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target={"#deleteEmployee-" + employee.id}
                        >
                          &#10008;
                        </button>
                      </td>
                    </tr>
                    <EmployeeDetail employeeData={employee} />
                    <ConfirmDeleteEmployee
                      employeeData={employee}
                      handleDeleteEmployee={handleDeleteEmployee}
                    />
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminAllEmployees;
