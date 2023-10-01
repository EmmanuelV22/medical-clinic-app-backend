import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
  const API_AUTH = "http://localhost:5000/api/auth";
  return {
    store: {
      patients: [],
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
    },
  };
};

export default getState;
