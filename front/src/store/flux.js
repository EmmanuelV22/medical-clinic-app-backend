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
          if (response.status === 200) {
            const data = response.data;
            const store = getStore();
            setStore({ ...store, docData: { docData: data.employee } });
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
        phone,
        sex,
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
          const res = await axios.post(
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
        const store = getStore();
        let token = Cookies.remove("jwt");
        setStore({
          ...store,
          isAuth: false,
          response: { type: "success", message: "Log out ok" },
        });
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
        phone,
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
              phone,
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
        phone,
        email,
        address,
        password,
        id
      ) => {
        try {
          const response = await axios.put(
            `${API_AUTH}/update-patient/${id}`,
            { firstname, lastname,phone, email, address, password, id },
            config
          );
          // setStore({...patient, firstname,
          //   lastname,
          //   email,
          //   address})
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
      loadPatientAppointments: async (patient_id) => {
        try {
          const response = await axios.get(
            `${API}/appointments-patient/${patient_id}`,
            config
          );
          if (response.status === 200) {
            const data = await response.data;
            console.log(data);
            const store = getStore();
            setStore({
              ...store,
              appointmentsPatient: data.agenda,
            });
            return data;
          }
        } catch (error) {
          console.log("Error obteniendo citas del medico:", error);
        }
      },
      loadPatientAppointmentById: async (patient_id) => {
        try {
          const response = await axios.get(
            `${API}/appointment-id-patient/${patient_id}`,
            config
          );
          if (response.status === 200) {
            const data = await response.data;
            console.log(data);
            const store = getStore();
            setStore({
              ...store,
              appointment: data.agenda,
            });
            return data;
          }
        } catch (error) {
          console.log("Error obteniendo citas del medico:", error);
        }
      },
      deleteAppointment: async (id) => {
        try {
          const response = axios.delete(
            `${API}/delete-appointment/${id}`,
            config
          );
          const data = response.data;
          return data;
        } catch (error) {
          console.log("Failed delete appointment from flux", error);
        }
      },
      changeAppointment: async (
        date,
        month,
        year,
        day,
        time,
        state,
        medical_id,
        patient_id,
        updatedAt,
        id
      ) => {
        try {
          const response = axios.put(
            `${API}/change-appointment/${id}`,
            {
              date,
              month,
              year,
              day,
              time,
              state,
              medical_id,
              patient_id,
              updatedAt,
              id,
            },
            config
          );
          console.log(response.data);
        } catch (error) {
          console.error(error);
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
      getTreatmentById: async (id) => {
        try {
          const response = await axios.get(`${API}/treatment/${id}`, config);
          const data = response.data;
          const store = getStore();
          setStore({
            ...store,
            treatment: data.treatment,
          });
          return data;
        } catch (error) {
          console.log("Error obteniendo datos del tratamiento", error);
        }
      },
      getAllTreatments: async () => {
        try {
          const response = await axios.get(`${API}/treatments`, config);
          if (response.status === 200) {
            const responseData = response.data;
            console.log(responseData);
            setStore({ treatments: responseData });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
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
          console.log(id);
          console.log(response);
          return response;
        } catch (error) {
          console.log("Error no se pudo actualizar el tratamiento:", error);
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
      getNotifications: async () => {
        try {
          const response = await axios.get(`${API}/notifications`, config);
          const data = response.data;
          const store = getStore();
          setStore({ ...store, notifications: data });
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      getNotificationsById: async (id) => {
        try {
          const response = await axios.get(
            `${API}/notifications/${id}`,
            config
          );
          const data = response.data;
          console.log(data);
          const store = getStore();
          setStore({ ...store, notificationById: data.notifications });
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      getNotificationsByIdForDr: async (id) => {
        try {
          const response = await axios.get(
            `${API}/notifications-employee/${id}`,
            config
          );
          const data = response.data;
          console.log(data);
          const store = getStore();
          setStore({ ...store, notificationById: data.notifications });
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      updateNotificationsState: async (notificationsId, newState) => {
        try {
          const response = await axios.put(
            `${API}/notifications-state/${notificationsId}`,
            { state: newState },
            config
          );
          console.log(response);
        } catch (error) {
          console.log("Error no se pudo actualizar el estado:", error);
        }
      },
      deleteNotifications: async (id) => {
        try {
          const response = await axios.delete(
            `${API}/notifications/delete/${id}`,
            config
          );
          const data = response.data;
          console.log(data);
          return data;
        } catch (error) {
          console.log("Failed delete notification from flux", error);
        }
      },
      sendChangePassword: async (dni) => {
        try {
          const response = await axios.get(
            `${API_AUTH}/patients/send-mail/${dni}`
          );
          const data = response.data;
          return data;
        } catch (error) {
          console.log("error from request mail send to api", error);
        }
      },
      saveNewPassword: async (dni, password, token) => {
        try {
          const response = await axios.put(
            `${API_AUTH}/patients/update-password/${dni}/${token}`,
            { password: password }
          );

          
            const data = response.data;
            return data;
          
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
