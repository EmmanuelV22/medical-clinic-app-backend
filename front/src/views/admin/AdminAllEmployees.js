// AdminAllEmployees.js
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import EmployeeDetail from "../../components/admin/EmployeeDetail";
import ConfirmDeleteEmployee from "../../components/admin/ConfirmDeleteEmployee";
import { useNavigate } from "react-router";
import SortingTable from "../../components/SortingTable";

const AdminAllEmployees = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    actions.getAllEmployees();
  }, []);

  const headers = [
    { field: "id", label: "ID" },
    { field: "firstname", label: "Firstname" },
    { field: "lastname", label: "Lastname" },
    { field: "dni", label: "DNI" },
    { field: "address", label: "Address" },
    { field: "personalID", label: "Personal ID" },
    { field: "email", label: "Email" },
    { field: "createdAt", label: "Created at" },
    { field: "updatedAt", label: "Updated at" },
    { field: "actions", label: "Acciones" },
  ];

  const handleDeleteEmployee = async (id) => {
    try {
      await actions.deleteEmployee(id);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar empleado", error);
    }
  };

  const renderRow = (employee) => (
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
        <td>
          {employee.updatedAt !== null
            ? actions.dateFormater(employee.updatedAt)
            : null}
        </td>
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
  );

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
          <SortingTable
            headers={headers}
            data={store.employees}
            renderRow={renderRow}
          />
        </div>
      </div>
    </>
  );
};

export default AdminAllEmployees;
