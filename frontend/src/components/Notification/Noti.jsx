import React, { useContext, useEffect, useState } from 'react';
import Notification from '../Notification/Notifications';
import './noti.scss';
import { NotificationContext } from '../../context/Notification';
export default function Noti({ socket }) {
  const { notifications, setNotifications } = useContext(NotificationContext);

  // const [notifications, setNotification] = useState([]);

  useEffect(() => {
    socket?.on(
      'addUnFriend',
      ({ senderName, message, senderProfile, date }) => {
        setNotifications((prev) => [
          ...prev,
          {
            senderName,
            message,
            senderProfile,
            date,
          },
        ]);
      }
    );
  }, [socket]);

  return (
    <>
      <div className="NotiContainer">
        <h3>Notifications</h3>
        {notifications.length > 0 ? (
          <div className="notification">
            <span>You have {notifications.length} notifications</span>
            {notifications.map((notification, index) => (
              <Notification key={index} notification={notification} />
            ))}
          </div>
        ) : (
          <div className="notification">
            <span>No notification</span>
          </div>
        )}
      </div>
    </>
  );
}
