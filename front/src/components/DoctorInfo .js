import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

const DoctorInfo = ({ medicalId, getDoctorData }) => {
  const [doctorData, setDoctorData] = useState(null);
  const { store } = useContext(Context);

  useEffect(() => {
    if (medicalId) {
      const fetchDoctorData = async () => {
        const data = await getDoctorData(medicalId);
        setDoctorData(data);
      };
      fetchDoctorData();
    }
  }, [medicalId]);

  return doctorData ? (
    <span>{`${doctorData.firstname} ${doctorData.lastname}`}</span>
  ) : (
    <span>Cargando datos del doctor...</span>
  );
};

export default DoctorInfo;
