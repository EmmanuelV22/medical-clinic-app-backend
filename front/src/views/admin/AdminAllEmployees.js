/* eslint-disable react-hooks/exhaustive-deps */
// AdminAllEmployees.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import EmployeeDetail from "../../components/admin/EmployeeDetail";
import ConfirmDeleteEmployee from "../../components/admin/ConfirmDeleteEmployee";
import { useNavigate } from "react-router";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";

const AdminAllEmployees = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const [searchError, setSearchError] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    actions.getAllEmployees();
  }, []);

  const headers = [
    { field: "id", label: "ID", sortable: true },
    { field: "firstname", label: "Nombre", sortable: true },
    { field: "lastname", label: "Apellido", sortable: true },
    { field: "dni", label: "DNI", sortable: true },
    { field: "address", label: "Dirección", sortable: true },
    { field: "personalID", label: "ID personal", sortable: true },
    { field: "especialidad", label: "Especialidad", sortable: true },
    { field: "email", label: "Email", sortable: true },

    { field: "days_off", label: "Dias Libres" },
    { field: "start_time", label: "Hora de inicio", sortable: true },
    { field: "end_time", label: "Hora de finalizacion", sortable: true },

    { field: "createdAt", label: "Creado", sortable: true },
    { field: "updatedAt", label: "Actualizado", sortable: true },

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
        <td>{employee.specialist}</td>
        <td>{employee.email}</td>
        <td>{employee.days_off}</td>
        <td>{employee.start_time}</td>
        <td>{employee.end_time}</td>
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

  const handleSearch = (query) => {
    const filtered = store.employees.filter(
      (employee) =>
        employee.firstname.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(query.toLowerCase())
    );
    // Set searchError to true if no employees found
    setSearchError(filtered.length === 0);
    setFilteredEmployees(filtered);
  };

  return (
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
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
            <SearchBar onSearch={handleSearch} />
            {searchError && (
              <p className="text-center text-danger">
                No se encontraron empleados.
              </p>
            )}
            <div
              className="table-responsive"
              style={{ width: "100%", margin: "0 auto" }}
            >
              <SortingTable
                headers={headers}
                data={
                  filteredEmployees.length > 0
                    ? filteredEmployees
                    : store.employees
                }
                renderRow={renderRow}
              />
            </div>
          </div>
        </>
      ) : (
        <h1>componente denegado</h1>
      )}
    </>
  );
};

export default AdminAllEmployees;
