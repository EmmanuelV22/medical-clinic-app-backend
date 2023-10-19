import axios from "axios";
import Cookies from "js-cookie";

const getState = ({ getStore, getActions, setStore }) => {
  const API_AUTH = "http://localhost:5000/api/auth";
  return {
    store: {
      patients: [],
      admin: [],
      staff: [],
      isAdminAuth: false,
      isDoctorAuth: false,
      isPatientAuth: false,
      isAuth: false,
    },
    actions: {
      getPatients: async () => {
        try {
          const response = await axios.get(`${API_AUTH}/users`);
          if (response.status === 200) {
            const responseData = response.data;
            console.log("GET ALL USERS", responseData);
            setStore({ patients: responseData });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      login: async (email, password) => {
        try {
          console.log("Start login");

          const response = await axios.post(`${API_AUTH}/login`, {
            email: email,
            password: password,
          });
          console.log(response.data);
          if (response.status === 201) {
            const data = response.data;
            console.log(data);

            const store = getStore();
            Cookies.set("jwt", data.token);
            console.log(data);
            setStore({ ...store, isAuth: true, patients: data.user });

            return data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      // isAuth: async () => {
      //   let token = Cookies.get("jwt");
      //   if (token) {
      //     try {
      //       const response = axios.get()
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // },
      logout: () => {
        let token = Cookies.remove("jwt");
        setStore({ isAuth: false });
        return token != null ? true : false;
      },
      // adminAuth: async () => {
      //   try {
      //     const response = await axios.get(`${API_AUTH}/admin`);
      //     if (response.status === 200) {
      //       const data = response.data;
      //       const store = getStore();
      //       setStore({ ...store, isAdminAuth: true, admin: data.user });
      //     }
      //   } catch (error) {
      //     console.error(
      //       "Erreur lors de la vérification de l'authentification du staff medical: ",
      //       error
      //     );
      //   }
      // },
      // staffAuth: async () => {
      //   try {
      //     const response = await axios.get(`${API_AUTH}/admin`);
      //     if (response.status === 200) {
      //       const data = response.data;
      //       const store = getStore();
      //       setStore({ ...store, isDoctorAuth: true, staff: data.user });
      //     }
      //   } catch (error) {
      //     console.error(
      //       "Erreur lors de la vérification de l'authentification du patient: ",
      //       error
      //     );
      //   }
      // },
      // userAuth: async () => {
      //   try {
      //     const response = await axios.get(`${API_AUTH}/admin`);
      //     if (response.status === 200) {
      //       const data = response.data;
      //       const store = getStore();
      //       setStore({ ...store, isPatientAuth: true, patients: data.user });
      //     }
      //   } catch (error) {
      //     console.error(
      //       "Erreur lors de la vérification de l'authentification de l'admin: ",
      //       error
      //     );
      //   }
      // },
    },
  };
};

export default getState;
