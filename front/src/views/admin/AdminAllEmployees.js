/* eslint-disable react-hooks/exhaustive-deps */
// AdminAllEmployees.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import EmployeeDetail from "../../components/admin/EmployeeDetail";
import ConfirmDeleteEmployee from "../../components/admin/ConfirmDeleteEmployee";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";

import Navbar from "../../components/Navbar";
import AccessDenied from "../AccessDenied";

const AdminAllEmployees = () => {
  const { store, actions } = useContext(Context);
  const [searchError, setSearchError] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const dayNameToNumber = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
  };

  function convertNumberToDay(numDay) {
    // Parsing de la chaîne en tableau si nécessaire
    const daysOffArray = Array.isArray(numDay)
      ? numDay
      : JSON.parse(numDay.replace(/'/g, '"'));

    // Mapping des jours
    const dayNames = daysOffArray.map((numJour) => {
      if (numJour >= 0 && numJour <= 6) {
        return Object.keys(dayNameToNumber).find(
          (key) => dayNameToNumber[key] === numJour
        );
      } else {
        return "Jour invalide";
      }
    });

    return dayNames.join(", ");
  }
  function formatTime(time) {
    if (time !== undefined) {
      const hours = time < 10 ? `0${time}` : `${time}`;
      return `${hours}:00`;
    } else {
      return "";
    }
  }

  useEffect(() => {
    actions.getAllEmployees();
  }, []);

  const headers = [
    {
      field: "firstname",
      label: "Nombre",
      sortable: true,
      className: "table-name-sorting",
    },
    {
      field: "lastname",
      label: "Apellido",
      sortable: true,
      className: "table-lastname-sorting ",
    },
    {
      field: "dni",
      label: "DNI",
      sortable: true,
      className: "table-dniDr-sorting ",
    },
    {
      field: "personalID",
      label: "ID personal",
      sortable: true,
      className: "table-personal-sorting ",
    },
    {
      field: "especialidad",
      label: "Especialidad",
      sortable: true,
      className: "table-specialist-sorting ",
    },
    {
      field: "email",
      label: "Email",
      sortable: true,
      className: "table-emailDr-sorting ",
    },
    {
      field: "days_off",
      label: "Dias Libres",
      sortable: false,
      className: "table-daysoff-sorting ",
    },
    {
      field: "start_time",
      label: "Hora de inicio",
      sortable: false,
      className: "table-start-sorting ",
    },
    {
      field: "end_time",
      label: "Hora de finalizacion",
      sortable: false,
      className: "table-end-sorting ",
    },
    {
      field: "updatedAt",
      label: "Actualizado",
      sortable: false,
      className: "table-updated-sorting ",
    },
    {
      field: "actions",
      label: "Acciones",
      className: "table-actionDr-sorting",
    },
  ];

  const handleDeleteEmployee = async (id) => {
    try {
      await actions.deleteEmployee(id);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar empleado", error);
    }
  };

  const renderRow = (employee) => {
    return (
      <React.Fragment key={employee.id}>
        <tr className="infos-contain">
          <td className="table-name-sorting">{employee.firstname}</td>
          <td className="table-lastname-sorting">{employee.lastname}</td>
          <td className="table-dniDr-sorting">{employee.dni}</td>
          <td className="table-personal-sorting">{employee.personalID}</td>
          <td className="table-specialist-sorting">{employee.specialist}</td>
          <td className="table-emailDr-sorting">{employee.email}</td>
          <td className="table-daysoff-sorting">
            {convertNumberToDay(employee.days_off)}
          </td>
          <td className="table-start-sorting">
            {formatTime(employee.start_time)}
          </td>
          <td className="table-end-sorting">{formatTime(employee.end_time)}</td>
          <td className="table-updated-sorting">
            {employee.updatedAt !== null
              ? actions.dateFormater(employee.updatedAt)
              : null}
          </td>

          <td className="table-actionDr-sorting text-center d-flex justitfy-content-center align-items-center">
            <button
              title="ver y editar datos"
              className="btn-edit"
              style={{
                color: "white",
                border: " 2px solid white",
                padding: "0px 4px",
                borderRadius: "6px",
              }}
              data-bs-toggle="modal"
              data-bs-target={"#employeeModal-" + employee.id}
            >
              <span style={{ fontSize: "18px" }}> &#9998;</span>
            </button>
            <button
              style={{
                color: "white",
                border: " 2px solid white",
                padding: "2px 6px",
                borderRadius: "6px",
              }}
              data-bs-toggle="modal"
              data-bs-target={"#deleteEmployee-" + employee.id}
              className="button btn-eliminar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                className="svgIcon bin-top"
              >
                <g clipPath="url(#clip0_35_24)">
                  <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                className="svgIcon bin-bottom"
              >
                <g clipPath="url(#clip0_35_22)">
                  <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>
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
  };

  const handleSearch = (query) => {
    const filtered = store.employees.filter(
      (employee) =>
        employee.firstname.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(query.toLowerCase()) ||
        employee.dni.toString().includes(query)
    );
    // Set searchError to className: table-name-sorting if no employees found
    setSearchError(filtered.length === 0);
    setFilteredEmployees(filtered);
  };

  return (
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <>
          <Navbar />
          <div className="admin-employee-content mb-5">
            <h1
              className="text-center font-bold my-4"
              style={{ fontSize: "2.5rem" }}
            >
              Lista de empleados:
            </h1>
            <SearchBar onSearch={handleSearch} />
            {searchError && (
              <p className="text-center text-danger search-nf">
                ¡No se encontraron empleados!
              </p>
            )}
            <div
              className="table-responsive "
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
        <AccessDenied />
      )}
    </>
  );
};

export default AdminAllEmployees;
