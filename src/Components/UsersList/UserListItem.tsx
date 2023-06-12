import React from 'react';
import './UserListItem.css';
import { User } from '../../types';

function UserListItem(props: { user: User|null, onItemClick: (user: User) => void }) {
  // const { user, onItemClick, numSubordinates } = props;
  const { user, onItemClick } = props;
  if (!user || user.show==false) return (<div className="no-data"></div>);

  return (
    <div className="user" onClick={() => onItemClick(user)}>
      <div className="user-avatar">
        <img src={user.profile_thumbnail_url} alt={user.first_name} />
      </div>
      <div className="user-details">
        <div className="user-primary">{`${user.title} ${user.first_name} ${user.last_name}`}</div>
        <div className="user-secondary">{user.gender}</div>
        <div className="user-secondary"></div>
        <div className="user-secondary">{user.phone}</div>
        <div className="user-secondary">{user.email}</div>
      </div>
    </div>
  );
}

export default UserListItem;
