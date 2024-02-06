import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwt");
const config = {
  headers: {
    Authorization: `${token}`,
  },
};
const port = process.env.DB_API_PORT || 5000;

const getState = ({ getStore, getActions, setStore }) => {

  const API_AUTH = `http://localhost:${port}/api/auth`;
  const API = `http://localhost:${port}/api`;

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
      allAppointments: [],
      myAppointments: [],
      appointment: {},
      appointmentsPatient: [],
      treatment: {},
      treatments: [],
      notifications: [],
      notificationPatient: [],
      response: {
        type: "",
        message: "",
      },
    },
    actions: {
      showNotification: async (message, type) => {
        setStore({ response: { message, type } });
      },
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
          const actions = getActions();
          const response = await axios.get(`${API_AUTH}/patients`, config);
          if (response.status && response.status === 200) {
            const responseData = response.data;
            setStore({ patients: responseData.results });
            actions.showNotification(
              "Pacientes obtenidos correctamente",
              "success"
            );
            return true;
          } else {
            actions.showNotification("Error obteniendo pacientes", "danger");
            return [];
          }
        } catch (error) {
          const actions = getActions();
          if (error.response) {
            return error.response.data.message;
          } else {
            actions.showNotification(
              "No se pudo conectar al servidor",
              "danger"
            );
          }
        }
      },
      getAllEmployees: async () => {
        const actions = getActions();
        try {
          const response = await axios.get(`${API_AUTH}/employees`, config);
          if (response.status && response.status === 200) {
            const data = response.data;
            const store = getStore();
            setStore({ ...store, employees: data });
            actions.showNotification(
              "Datos obtenidos correctamente",
              "success"
            );
            return true;
          } else {
            actions.showNotification("Error obteniendo datos", "danger");

            return [];
          }
        } catch (error) {
          const actions = getActions();
          if (error.response) {
            return error.response.data.message;
          } else {
            actions.showNotification(
              "No se pudo conectar al servidor",
              "danger"
            );
          }
        }
      },
      getEmployeeById: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API_AUTH}/employees/${id}`,
            config
          );
          if (response.status && response.status === 200) {
            const data = response.data;
            const store = getStore();
            setStore({ ...store, docData: { docData: data.employee } });
            actions.showNotification(
              "Datos obtenidos correctamente",
              "success"
            );
            return data.employee;
          }
        } catch (error) {
          actions.showNotification("Error obteniendo datos", "danger");
        }
      },
      getPatientById: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API_AUTH}/patients/${id}`,
            config
          );
          if (response.status && response.status === 200) {
            const data = response.data;
            const store = getStore();
            setStore({
              ...store,
              patientData: {
                ...store.patientData,
                patientData: data.patient,
              },
            });
            actions.showNotification(
              "Datos del paciente obtenidos correctamente",
              "success"
            );
            return data.patient;
          }
        } catch (error) {
          actions.showNotification(
            "Error obteniendo datos del paciente",
            "danger"
          );
        }
      },
      registerPatient: async (
        firstname,
        lastname,
        phone,
        sex,
        email,
        dni,
        address,
        birthday,
        password,
        bloodGroup
      ) => {
        const actions = getActions();
        const blood_group = bloodGroup;
        try {
          const response = await axios.post(
            `${API_AUTH}/register-patient`,
            {
              firstname,
              lastname,
              phone,
              sex,
              email,
              dni,
              address,
              birthday,
              password,
              blood_group,
            },
            config
          );

          if (response.status && response.status === 201) {
            actions.showNotification("Registro exitoso", "success");
            return true;
          }
        } catch (error) {
          actions.showNotification(
            "Error en registro, comprueba la informacion",
            "danger"
          );
          console.error(error);
          return false;
        }
      },
      registerEmployee: async (
        firstname,
        lastname,
        phone,
        sex,
        email,
        address,
        birthday,
        dni,
        specialist,
        personalID,
        days_off,
        start_time,
        end_time,
        password
      ) => {
        try {
          const actions = getActions();
          const response = await axios.post(
            `${API_AUTH}/register`,
            {
              firstname,
              lastname,
              phone,
              sex,
              email,
              address,
              birthday,
              dni,
              specialist,
              personalID,
              days_off,
              start_time,
              end_time,
              password,
            },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          if (response.status && response.status === 201) {
            actions.showNotification("Registro exitoso", "success");
            return true;
          }
        } catch (error) {
          const actions = getActions();

          actions.showNotification(
            "Error en registro, comprueba la informacion",
            "danger"
          );
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
          if (response.status && response.status === 201) {
            const data = response.data;

            const store = getStore();
            Cookies.set("jwt", data.token);
            setStore({ ...store, isAuth: true, employee: data.employees });
            return data;
          }
        } catch (error) {
          const actions = getActions();
          if (error.response) {
            return error.response.data.message;
          } else {
            actions.showNotification(
              "No se pudo conectar al servidor",
              "danger"
            );
          }
        }
      },
      loginPatient: async (dni, password) => {
        try {
          const response = await axios.post(`${API_AUTH}/login-patient`, {
            dni: dni,
            password: password,
          });
          if (response.status && response.status === 201) {
            const data = response.data;

            const store = getStore();
            Cookies.set("jwt", data.token);

            setStore({ ...store, isAuth: true, patient: data.patients });

            return response;
          }
        } catch (error) {
          const actions = getActions();
          if (error.response) {
            return error.response.data.message;
          } else {
            actions.showNotification(
              "No se pudo conectar al servidor",
              "danger"
            );
          }
        }
      },
      isAuth: async () => {
        let token = Cookies.get("jwt");
        if (token) {
          try {
            const response = await axios.get(`${API}/private`, {
              headers: { Authorization: `${token}` },
            });
            if (response.status && response.status === 200) {
              const data = await response.data;
              const store = getStore();
              if (data.user.specialist) {
                setStore({ ...store, isAuth: true, employee: data.user });
              } else {
                setStore({ ...store, isAuth: true, patient: data.user });
              }
            }
          } catch (error) {
            const actions = getActions();
            if (error.response) {
              return error.response.data.message;
            } else {
              actions.showNotification(
                "No se pudo conectar al servidor",
                "danger"
              );
            }
          }
        }
      },
      logout: () => {
        const store = getStore();
        let token = Cookies.remove("jwt");
        setStore({
          ...store,
          isAuth: false,
          response: { type: "success", message: "Cierre de sesion exitoso" },
        });
        return token != null ? true : false;
      },
      deleteEmployee: async (employeeId) => {
        const actions = getActions();
        try {
          const response = await axios.delete(
            `${API_AUTH}/delete/${employeeId}`,
            config
          );
          if (response.status && response.status === 200) {
            setStore((prevStore) => {
              const updatedEmployees = prevStore.employees.filter(
                (employee) => employee.id !== employeeId
              );
              actions.showNotification(
                "Funcionario eliminado con exito",
                "success"
              );
              return { ...prevStore, employees: updatedEmployees };
            });
          }
        } catch (error) {
          actions.showNotification("Error eliminando funcionario", "danger");
          throw error;
        }
      },
      deletePatient: async (patientID) => {
        const actions = getActions();
        try {
          const response = await axios.delete(
            `${API_AUTH}/delete-patient/${patientID}`,
            config
          );
          if (response.status && response.status === 200) {
            setStore((prevStore) => {
              const updatedPatient = prevStore.patients.filter(
                (patient) => patient.id !== patientID
              );
              actions.showNotification(
                "Paciente eliminado con exito",
                "success"
              );

              return { ...prevStore, patients: updatedPatient };
            });
          }
        } catch (error) {
          actions.showNotification("Error al eliminar paciente", "danger");

          throw error;
        }
      },
      updateEmployee: async (
        firstname,
        lastname,
        phone,
        personalID,
        email,
        specialist,
        address,
        days_off,
        start_time,
        end_time,
        password,
        id
      ) => {
        try {
          const actions = getActions();
          const response = await axios.put(
            `${API_AUTH}/update/${id}`,
            {
              firstname,
              lastname,
              phone,
              personalID,
              email,
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

          actions.showNotification("Modificacion exitosa", "success");
          return response;
        } catch (error) {
          const actions = getActions();
          actions.showNotification(
            "Error al modificar datos, comprueba la informacion",
            "danger"
          );
        }
      },
      updatePatient: async (
        firstname,
        lastname,
        phone,
        email,
        address,
        password,
        id
      ) => {
        try {
          const actions = getActions();
          const response = await axios.put(
            `${API_AUTH}/update-patient/${id}`,
            { firstname, lastname, phone, email, address, password, id },
            config
          );
          response &&
            actions.showNotification("Modificacion exitosa", "success");
        } catch (error) {
          const actions = getActions();

          actions.showNotification(
            "Error al modificar datos del paciente",
            "danger"
          );
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
          const actions = getActions();
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
          actions.showNotification("Cita reservada con exito", "success");
          return response;
        } catch (error) {
          const actions = getActions();

          actions.showNotification("Error reserva fallida", "danger");
          console.error("Error creando cita", error.message);
        }
      },
      loadMedicalAppointments: async (medical_id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API}/appointments-medical/${medical_id}`,
            config
          );
          if (response.status && response.status === 200) {
            const data = await response.data;
            actions.showNotification(
              "Citas de la agenda obtenidas correctamente",
              "success"
            );
            return data;
          }
        } catch (error) {
          actions.showNotification("No hay citas en la agenda", "danger");
        }
      },
      loadMedicalAppointmentsForDr: async (medical_id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API}/appointments-medical/${medical_id}`,
            config
          );
          if (response.status && response.status === 200) {
            const data = await response.data;
            const store = getStore();
            setStore({ ...store, myAppointments: data.agenda });
            actions.showNotification("Citas cargadas con exito", "success");
            return data;
          }
        } catch (error) {
          actions.showNotification("Error obteniendo citas", "danger");
        }
      },
      loadPatientAppointments: async (patient_id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API}/appointments-patient/${patient_id}`,
            config
          );
          if (response.status && response.status === 200) {
            const data = await response.data;
            const store = getStore();
            setStore({
              ...store,
              appointmentsPatient: data.agenda,
            });
            actions.showNotification("Citas obtenidas con exito", "success");
            return data;
          }
        } catch (error) {
          actions.showNotification(
            "Error obteniendo citas del paciente",
            "danger"
          );
        }
      },
      loadPatientAppointmentById: async (patient_id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API}/appointment-id-patient/${patient_id}`,
            config
          );
          if (response.status && response.status === 200) {
            const data = await response.data;
            const store = getStore();
            setStore({
              ...store,
              appointment: data.agenda,
            });
            actions.showNotification(
              "Datos de la cita obtenidos con exito",
              "success"
            );
            return data;
          }
        } catch (error) {
          actions.showNotification(
            "Error obteniendo datos de la cita",
            "success"
          );
        }
      },
      getAllAppointments: async () => {
        const actions = getActions();
        try {
          const response = await axios.get(`${API}/appointments`, config);
          if (response.status && response.status === 200) {
            const data = response.data;
            setStore({ allAppointments: data.results });
            actions.showNotification("Citas obtenidas con exito", "success");
            return true;
          } else return [];
        } catch (error) {
          actions.showNotification("Error obteniendo citas", "danger");
          console.error(error);
        }
      },
      deleteAppointment: async (id) => {
        const actions = getActions();
        try {
          const response = axios.delete(
            `${API}/delete-appointment/${id}`,
            config
          );
          const data = response.data;
          actions.showNotification("Cita eliminada con exito", "success");
          return data;
        } catch (error) {
          actions.showNotification("Error eliminando cita", "danger");
        }
      },
      createTreatment: async (
        patient_id,
        resume,
        medicineData, // Envoyez le tableau medicineData directement
        initial_date,
        exp_date,
        medical_id,
        patologies,
        surgey,
        finish_treatment
      ) => {
        try {
          const actions = getActions();
          const response = await axios.post(
            `${API}/create-treatment`,
            {
              patient_id,
              resume,
              medicineData, // Utilisez directement le tableau medicineData
              initial_date,
              exp_date,
              medical_id,
              patologies,
              surgey,
              finish_treatment,
            },
            config
          );
          actions.showNotification("Tratamiento creado con exito", "success");
          return response;
        } catch (error) {
          const actions = getActions();

          actions.showNotification("Error creando tratamiento", "danger");
        }
      },
      updateAppointmentState: async (appointmentId, newState) => {
        const actions = getActions();
        try {
          const response = await axios.put(
            `${API}/confirm-agenda/${appointmentId}`,
            { state: newState },
            config
          );
          actions.showNotification("Cita actualizada correctamente", "success");
        } catch (error) {
          actions.showNotification("Error actualizando cita", "danger");
        }
      },
      getTreatmentsPatient: async (patient_id) => {
        const actions = getActions();
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
          actions.showNotification(
            "tratamientos obtenidos correctamente",
            "success"
          );
          return data;
          // }
        } catch (error) {
          actions.showNotification("Error obteniendo tratamientos", "danger");
        }
      },
      getHistoryPatientById: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.get(`${API}/history/${id}`, config);
          const data = response.data;
          const store = getStore();
          setStore({
            ...store,
            patientData: {
              ...store.patientData,
              history: data.historic,
            },
          });
          actions.showNotification("Historia obtenida con exito", "success");
          return data;
        } catch (error) {
          actions.showNotification(
            "Error obteniendo historia del paciente",
            "danger"
          );
        }
      },
      getTreatmentById: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.get(`${API}/treatment/${id}`, config);
          const data = response.data;
          const store = getStore();
          setStore({
            ...store,
            treatment: data.treatment,
          });
          actions.showNotification(
            "Datos del tratamiento obtenidos correctamente",
            "success"
          );
          return data;
        } catch (error) {
          actions.showNotification(
            "Error obteniendo datos del tratamiento",
            "danger"
          );
        }
      },
      getAllTreatments: async () => {
        const actions = getActions();
        try {
          const response = await axios.get(`${API}/treatments`, config);
          if (response.status && response.status === 200) {
            const responseData = response.data;
            setStore({ treatments: responseData });
            actions.showNotification(
              "Tratamientos obtenidos con exito",
              "success"
            );
            return true;
          } else {
            return [];
          }
        } catch (error) {
          actions.showNotification("Error obteniendo tratamientos", "danger");
          return [];
        }
      },
      updateTreatmentById: async (
        id,
        patient_id,
        resume,
        medicineData,
        initial_date,
        exp_date,
        medical_id,
        patologies,
        surgey,
        finish_treatment
      ) => {
        try {
          const actions = getActions();
          const response = await axios.put(
            `${API}/update-treatment/${id}`,
            {
              patient_id,
              resume,
              medicineData,
              initial_date,
              exp_date,
              medical_id,
              patologies,
              surgey,
              finish_treatment,
            },
            config
          );

          actions.showNotification(
            "Tratamiento actualizado con exito",
            "success"
          );
          return response;
        } catch (error) {
          const actions = getActions();

          actions.showNotification("Error actualizando tratamiento", "danger");
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
          const actions = getActions();
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
          actions.showNotification("Historia creada con exito", "success");
        } catch (error) {
          const actions = getActions();

          actions.showNotification("Error creando historia", "danger");
        }
      },
      getNotifications: async () => {
        const actions = getActions();
        try {
          const response = await axios.get(`${API}/notifications`, config);
          const data = response.data;
          const store = getStore();
          setStore({ ...store, notifications: data });
          actions.showNotification(
            "Notificaciones obtenidas con exito",
            "success"
          );
          return data;
        } catch (error) {
          actions.showNotification("Error obteniendo notificaciones", "danger");
        }
      },
      getNotificationsById: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API}/notifications/${id}`,
            config
          );
          const data = response.data;
          const store = getStore();
          setStore({ ...store, notificationById: data.notifications });
          actions.showNotification(
            "Datos de notificacion obtenidos con exito",
            "success"
          );
          return data;
        } catch (error) {
          actions.showNotification(
            "Error obteniendo datos de notificacion",
            "danger"
          );
        }
      },
      getNotificationsByIdForDr: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.get(
            `${API}/notifications-employee/${id}`,
            config
          );
          const data = response.data;
          const store = getStore();
          setStore({ ...store, notificationById: data.notifications });
          actions.showNotification(
            "Datos de notificacion obtenidos con exito",
            "success"
          );
          return data;
        } catch (error) {
          actions.showNotification(
            "Error obteniendo datos de notificacion",
            "danger"
          );
        }
      },
      updateNotificationsState: async (notificationsId, newState) => {
        try {
          const response = await axios.put(
            `${API}/notifications-state/${notificationsId}`,
            { state: newState },
            config
          );
          const actions = getActions();

          actions.showNotification(
            "Notificacion modificada con exito",
            "success"
          );
        } catch (error) {
          const actions = getActions();

          actions.showNotification(
            "Error modificando la notificacion",
            "danger"
          );
        }
      },
      deleteNotifications: async (id) => {
        const actions = getActions();
        try {
          const response = await axios.delete(
            `${API}/notifications/delete/${id}`,
            config
          );
          const data = response.data;
          actions.showNotification(
            "Notificacion eliminada con exito",
            "success"
          );
          return data;
        } catch (error) {
          actions.showNotification(
            "Error eliminando la notificacion",
            "danger"
          );
        }
      },
      sendChangePassword: async (dni) => {
        try {
          const response = await axios.get(
            `${API_AUTH}/patients/send-mail/${dni}`
          );
          return response;
        } catch (error) {
          const actions = getActions();
          if (error.response) {
            return error.response.data.message;
          } else {
            actions.showNotification(
              "No se pudo conectar al servidor",
              "danger"
            );
          }
        }
      },
      saveNewPassword: async (dni, password, token) => {
        const actions = getActions();
        try {
          const response = await axios.put(
            `${API_AUTH}/patients/update-password/${dni}/${token}`,
            { password: password }
          );

          const data = response.data;
          actions.showNotification(
            "Contraseña actualizada con exito",
            "success"
          );
          return data;
        } catch (error) {
          actions.showNotification("Error actualizando contraseña", "danger");
        }
      },
    },
  };
};

export default getState;
