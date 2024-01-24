import React, { useState } from "react";

const SortingTable = ({ headers, data, renderRow }) => {
  // Estado para el campo por el cual se está ordenando
  const [sortField, setSortField] = useState("");
  // Estado para el orden de clasificación (ascendente o descendente)
  const [sortOrder, setSortOrder] = useState("asc");

  // Función para manejar el clic en los encabezados de columna para ordenar
  const handleSort = (field) => {
    if (sortField === field) {
      // Si se hace clic en el mismo campo, invertir el orden
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Si se hace clic en un campo diferente, establecer el campo y reiniciar el orden
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Función para ordenar los datos según el campo y el orden actuales
  const sortData = (a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    // Comparar los valores y determinar el orden
    if (fieldA < fieldB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0; // Si los valores son iguales, no cambiar el orden
  };

  return (
    <>
      {/* Tabla con encabezados */}
      <table className="table">
        <thead className="table-header">
          <tr>
            {headers.map((header) => (
              <th key={header.field}>
                {header.sortable ? (
                  <span onClick={() => handleSort(header.field)}>
                    {header.label}
                    {sortField === header.field && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </span>
                ) : (
                  <span>{header.label}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo de la tabla con filas ordenadas según los datos y el orden actuales */}
        <tbody>
          {data &&
            data.length >= 1 &&
            // Hacer una copia de los datos, ordenarlos y mapear cada fila utilizando la función renderRow
            data.slice().sort(sortData).map(renderRow)}
        </tbody>
      </table>
    </>
  );
};

export default SortingTable;
