/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

const Notifications = () => {
  const { store, actions } = useContext(Context);

  const getAllNotifications = async () => {
    const notifications = await actions.getNotifications();
    return notifications;
  };

  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <div>
      {store.notifications &&
        store.notifications.map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
          </div>
        ))}
    </div>
  );
};

export default Notifications;
