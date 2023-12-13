import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwt");
const config = {
  headers: {
    Authorization: `${token}`,
  },
};

const getState = ({ getStore, getActions, setStore }) => {
  const API_AUTH = "http://localhost:5000/api/auth";
  const API = "http://localhost:5000/api";
  return {
    store: {
      patients: [],
      patient: [],
      patientData: {},
      docData: {},
      employees: [],
      employee: [],
      isAuth: false,
      turnos: {},
      myAppointments: [],
    },
    actions: {
      dateFormater: (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          // hour: "numeric",
          // minute: "numeric",
          // second: "numeric",
        });
      },
      getAllPatients: async () => {
        try {
          const response = await axios.get(`${API_AUTH}/patients`, config);
          if (response.status === 200) {
            const responseData = response.data;
            // console.log("GET ALL Patients", responseData);
            setStore({ patients: responseData.results });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getAllEmployees: async () => {
        try {
          const response = await axios.get(`${API_AUTH}/employees`, config);
          if (response.status === 200) {
            const data = response.data;
            const store = getStore();
            setStore({ ...store, employees: data });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getEmployeeById: async (id) => {
        try {
          const response = await axios.get(
            `${API_AUTH}/employees/${id}`,
            config
          );
          console.log(response);
          if (response.status === 200) {
            const data = response.data;
            const store = getStore();
            setStore({ ...store, docData: { docData: data.employee } });
            console.log("Employee by ID", data);
            return data.employee;
          }
        } catch (error) {
          console.log(error);
        }
      },
      getPatientById: async (id) => {
        try {
          const response = await axios.get(
            `${API_AUTH}/patients/${id}`,
            config
          );
          if (response.status === 200) {
            const data = response.data;
            console.log("Patient by ID", data);
            const store = getStore();
            setStore({
              ...store,
              patientData: {
                ...store.patientData,
                patientData: data.patient,
              },
            });
            return data.patient;
          }
        } catch (error) {
          console.log(error);
          // return [];
        }
      },
      registerPatient: async (
        firstname,
        lastname,
        email,
        dni,
        address,
        birthday,
        password,
        bloodGroup
      ) => {
        const blood_group = bloodGroup;
        try {
          const res = await axios.post(
            `${API_AUTH}/register-patient`,
            {
              firstname,
              lastname,
              email,
              dni,
              address,
              birthday,
              password,
              blood_group,
            },
            config
          );

          if (res.status === 201) {
            console.log("Register patient OK", res);
            return true;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      registerEmployee: async (
        firstname,
        lastname,
        email,
        dni,
        address,
        password,
        personalID,
        specialist,
        days_off,
        start_time,
        end_time
      ) => {
        try {
          const res = await axios.post(
            `${API_AUTH}/register`,
            {
              firstname,
              lastname,
              email,
              dni,
              address,
              password,
              personalID,
              specialist,
              days_off,
              start_time,
              end_time,
            },
            config
          );
          console.log(res);
          if (res.status === 201) {
            console.log("Register employee OK", res);
            return true;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      login: async (personalID, password) => {
        try {
          const response = await axios.post(`${API_AUTH}/login`, {
            personalID: personalID,
            password: password,
          });
          if (response.status === 201) {
            const data = response.data;
            // console.log(data);

            const store = getStore();
            Cookies.set("jwt", data.token);
            console.log(data);
            setStore({ ...store, isAuth: true, employee: data.employees });
            return data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      loginPatient: async (dni, password) => {
        try {
          const response = await axios.post(`${API_AUTH}/login-patient`, {
            dni: dni,
            password: password,
          });
          if (response.status === 201) {
            const data = response.data;
            console.log(data);

            const store = getStore();
            Cookies.set("jwt", data.token);
            console.log(data);

            setStore({ ...store, isAuth: true, patient: data.patients });

            return data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      isAuth: async () => {
        let token = Cookies.get("jwt");
        if (token) {
          try {
            const response = await axios.get(`${API}/private`, {
              headers: { Authorization: `${token}` },
            });
            if (response.status === 200) {
              const data = await response.data;
              const store = getStore();
              if (data.user.specialist) {
                setStore({ ...store, isAuth: true, employee: data.user });
              } else {
                setStore({ ...store, isAuth: true, patient: data.user });
                console.log("log from isAuth", store.patient);
              }
            }
          } catch (error) {
            // Gérer l'erreur ici
            console.log(error);
          }
        }
      },
      logout: () => {
        let token = Cookies.remove("jwt");
        setStore({ isAuth: false });
        return token != null ? true : false;
      },
      deleteEmployee: async (employeeId) => {
        try {
          const response = await axios.delete(
            `${API_AUTH}/delete/${employeeId}`,
            config
          );
          console.log(response, employeeId);
          if (response.status === 200) {
            setStore((prevStore) => {
              const updatedEmployees = prevStore.employees.filter(
                (employee) => employee.id !== employeeId
              );
              console.log("Deleted Employees:", updatedEmployees);

              return { ...prevStore, employees: updatedEmployees };
            });
            console.log("¡Empleado eliminado con éxito!");
            // window.location.reload();
            // Realizar cualquier otra acción necesaria después de eliminar
          }
        } catch (error) {
          console.error("Error al eliminar empleado", error);
          throw error;
        }
      },
      deletePatient: async (patientID) => {
        try {
          const response = await axios.delete(
            `${API_AUTH}/delete-patient/${patientID}`,
            config
          );
          console.log(response, patientID);
          if (response.status === 200) {
            setStore((prevStore) => {
              const updatedPatient = prevStore.patients.filter(
                (patient) => patient.id !== patientID
              );
              console.log("Deleted patients:", updatedPatient);

              return { ...prevStore, patients: updatedPatient };
            });
            console.log("Paciente eliminado con éxito!");
          }
        } catch (error) {
          console.error("Error al eliminar paciente, error");
          throw error;
        }
      },
      updateEmployee: async (
        firstname,
        lastname,
        personalID,
        email,
        dni,
        specialist,
        address,
        days_off,
        start_time,
        end_time,
        password,
        id
      ) => {
        try {
          const response = await axios.put(
            `${API_AUTH}/update/${id}`,
            {
              firstname,
              lastname,
              personalID,
              email,
              dni,
              specialist,
              address,
              days_off,
              start_time,
              end_time,
              password,
              id,
            },
            config
          );

          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      },
      updatePatient: async (
        firstname,
        lastname,
        email,
        address,
        password,
        id
      ) => {
        try {
          const response = await axios.put(
            `${API_AUTH}/update-patient/${id}`,
            { firstname, lastname, email, address, password, id },
            config
          );
          console.log(response.data);
        } catch (error) {
          console.log("Error al modificar paciente", error);
        }
      },
      postAppointment: async (
        date,
        month,
        year,
        day,
        time,
        state,
        patient_id,
        medical_id,
        available
      ) => {
        try {
          const response = await axios.post(
            `${API}/create-appointment/${patient_id}`,
            {
              date,
              month,
              year,
              day,
              time,
              state,
              patient_id,
              medical_id,
              available,
            },
            config
          );
          console.log(response);
          return response;
        } catch (error) {
          console.error(
            "Erreur lors de la création du rendez-vous",
            error.message
          );
        }
      },
      loadMedicalAppointments: async (medical_id) => {
        try {
          const response = await axios.get(
            `${API}/appointments-medical/${medical_id}`,
            config
          );
          if (response.status === 200) {
            const data = await response.data;
            console.log(data);
            return data;
          }
        } catch (error) {
          console.log("Error obteniendo citas del medico:", error);
        }
      },
      loadMedicalAppointmentsForDr: async (medical_id) => {
        try {
          const response = await axios.get(
            `${API}/appointments-medical/${medical_id}`,
            config
          );
          if (response.status === 200) {
            const data = await response.data;
            const store = getStore();
            setStore({ ...store, myAppointments: data.agenda });
            return data;
          }
        } catch (error) {
          console.log("Error obteniendo citas del medico:", error);
        }
      },
      createTreatment: async (
        patient_id,
        resume,
        medicine,
        quantity,
        initial_date,
        exp_date,
        medical_id,
        patologies,
        surgey,
        finish_treatment
      ) => {
        try {
          const response = await axios.post(`${API}/create-treatment`, {
            patient_id,
            resume,
            medicine,
            quantity,
            initial_date,
            exp_date,
            medical_id,
            patologies,
            surgey,
            finish_treatment,
          });
          console.log(response);
          return response;
        } catch (error) {
          console.log("Error creando tratamiento", error);
        }
      },
      updateAppointmentState: async (appointmentId, newState) => {
        try {
          const response = await axios.put(
            `${API}/confirm-agenda/${appointmentId}`,
            { state: newState },
            config
          );
          console.log(response);
        } catch (error) {
          console.log("Error no se pudo actualizar el estado:", error);
        }
      },
      getTreatmentsPatient: async (patient_id) => {
        try {
          const response = await axios.get(
            `${API}/treatments/patient/${patient_id}`,
            config
          );
          // if (response.status === "200"){
          const data = await response.data;
          const store = getStore();
          setStore({
            ...store,
            patientData: {
              ...store.patientData,
              treatments: data.treatments,
            },
          });
          return data;
          // }
        } catch (error) {
          console.log("Error obteniendo tratamientos del paciente", error);
        }
      },
      getHistoryPatientById: async (id) => {
        try {
          const response = await axios.get(`${API}/history/${id}`, config);
          const data = response.data;
          console.log(data);
          const store = getStore();
          setStore({
            ...store,
            patientData: {
              ...store.patientData,
              history: data.historic,
            },
          });
          return data;
        } catch (error) {
          console.log("Error obteniendo historia clínica del paciente", error);
        }
      },
      createHistoric: async (
        patient_id,
        medical_id,
        agenda_id,
        treatment_id,
        description,
        date
      ) => {
        try {
          const response = await axios.post(
            `${API}/create-history/${patient_id}`,
            {
              patient_id,
              medical_id,
              agenda_id,
              treatment_id,
              description,
              date,
            },
            config
          );
          console.log(response);
        } catch (error) {
          console.log("No se pudo crear la hisoria:", error);
        }
      },
    },
  };
};

export default getState;
