import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notifications, setNotifications] = useState([]);

  const value = {
    notifications,
    setNotifications,
  };
  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
};
