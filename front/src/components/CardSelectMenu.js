/* eslint-disable react/style-prop-object */
import React from "react";

const CardSelectMenu = () => {
  return (
    <div class="con">
      <div class="con-tooltip left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-layout-sidebar-left-collapse"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#597e8d"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M9 4v16" />
          <path d="M15 10l-2 2l2 2" />
        </svg>
        <div class="tooltip ">
          <button
            style={{
              background: "blue",
              color: "white",
              border: " 2px solid white",
              padding: "2px 3px",
              borderRadius: "6px",
            }}
            data-bs-toggle="modal"
            // data-bs-target={"#patientData-" + patient.id}
          >
            &#9998;
          </button>
          <button
            style={{
              background: "red",
              color: "white",
              border: " 2px solid white",
              borderRadius: "6px",
              padding: "2px 3px",
            }}
            data-bs-toggle="modal"
            // data-bs-target={"#deletePatient-" + patient.id}
            className="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 69 14"
              className="svgIcon bin-top"
            >
              <g clip-path="url(#clip0_35_24)">
                <path
                  fill="black"
                  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_35_24">
                  <rect fill="white" height="14" width="50"></rect>
                </clipPath>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 69 57"
              className="svgIcon bin-bottom"
            >
              <g clip-path="url(#clip0_35_22)">
                <path
                  fill="black"
                  d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_35_22">
                  <rect fill="white" height="57" width="50"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
          <svg
            cursor="pointer"
            // onClick={() => navigate(`/planificar-turno/${patient.id}`)}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-calendar-plus"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
          <svg
            cursor="pointer"
            // onClick={() => navigate(`/turnos-paciente/${patient.id}`)}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-list-search"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M18.5 18.5l2.5 2.5" />
            <path d="M4 6h16" />
            <path d="M4 12h4" />
            <path d="M4 18h4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CardSelectMenu;
