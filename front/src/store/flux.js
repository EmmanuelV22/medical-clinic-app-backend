import axios from "axios";
import Cookies from "js-cookie";

const getState = ({ getStore, getActions, setStore }) => {
  const API_AUTH = "http://localhost:5000/api/auth";
  const API = "http://localhost:5000/api";
  return {
    store: {
      patients: [],
      admin: [],
      employees: [],
      isAuth: false,
    },
    actions: {
      getPatients: async () => {
        try {
          const response = await axios.get(`${API_AUTH}/patients`);
          if (response.status === 200) {
            const responseData = response.data;
            console.log("GET ALL Patients", responseData);
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
      registerPatient: async (
        firstname,
        lastname,
        email,
        dni,
        address,
        birthday
      ) => {
        try {
          const res = await axios.post(`${API_AUTH}/register`, {
            firstname,
            lastname,
            email,
            dni,
            address,
            birthday,
          });

          if (res.status === 201) {
            console.log("Register OK", res);
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
            setStore({ ...store, isAuth: true, employees: data.employee });
            console.log(data.employee);

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

            setStore({ ...store, isAuth: true, patients: data });

            return data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      isAuth: async () => {
        let token = Cookies.get("jwt");
        console.log(token);
        if (token) {
          try {
            const response = await axios.get(`${API}/private`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
            if (response.status === 200) {
              const data = await response.data;
              const store = getStore();
              if (data.employee) {
                setStore({ ...store, employees: data.employee });
              }
              if (data.patient) {
                setStore({ ...store, patients: data.patient });
              }
              setStore({ isAuth: true });
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
    },
  };
};

export default getState;
