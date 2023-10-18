import React from 'react';
import { Notifications } from '../../DummyData';
import Notification from '../Notification/Notifications';
import './noti.scss';

export default function Noti() {
  return (
    <>
      <h3>Notifications</h3>
      <div className="sideBarNotification">
        {Notifications.map((notification, id) => (
          <Notification key={id} notification={notification} />
        ))}
      </div>
    </>
  );
}
