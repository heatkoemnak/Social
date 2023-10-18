import React from 'react';

import { Posts } from '../../DummyData';
import { Users } from '../../DummyData';

export default function Notifications({ notification }) {
  const posts = Posts.filter((post) => post.id === notification?.postId)[0];
  const user = Users.filter((user) => user.id === posts?.userId)[0];
  return (
    <div className="notification">
      <div className="userInfo">
        <img
          src={user?.profilePicture}
          alt=""
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        <small>
          <b>{user?.username}</b>
        </small>
      </div>
      <span>{notification.message}</span>
      <small>{notification.date}</small>
    </div>
  );
}
