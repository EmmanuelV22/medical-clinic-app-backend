/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const DoctorInfo = ({ medicalId, getDoctorData }) => {
  const [doctorData, setDoctorData] = useState(null);

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
