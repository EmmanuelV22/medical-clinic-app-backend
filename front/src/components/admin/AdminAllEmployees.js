import React, { useContext } from "react";
import { Context } from "../../store/appContext";

const AdminAllEmployees = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteEmployee = async (id) => {
    console.log("Deleting employee with ID:", id);
    try {
      await actions.deleteEmployee(id);
    } catch (error) {
      console.error("Error al eliminar empleado", error);
    }
  };

  return (
    <div className="admin-employee-content">
      <h1 className="text-center font-bold my-4" style={{ fontSize: "2.5rem" }}>
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
                <tr className="infos-contain" key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.dni}</td>
                  <td>{employee.address}</td>
                  <td>{employee.personalID}</td>
                  <td>{employee.email}</td>
                  <td>{employee.createdAt}</td>
                  <td>{employee.updatedAt}</td>
                  <td className="text-center">
                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: " 2px solid white",
                        padding: "2px 3px",
                      }}
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      &#10008;
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllEmployees;
