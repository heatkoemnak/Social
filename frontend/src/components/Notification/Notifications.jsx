import React from 'react';

export default function Notifications({ notification }) {
  return (
    <div className="notification">
      <div className="userInfo">
        <img
          src={notification.senderProfile}
          alt=""
          style={{
            width: '27px',
            height: '27px',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        <span>{notification.message}</span>
      </div>
      <small>{notification.date}</small>
    </div>
  );
}
