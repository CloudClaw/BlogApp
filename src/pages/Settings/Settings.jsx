import React from 'react';
import './Settings.scss';
import { UserData } from './UserData/UserData';

export const Settings = ({ title, users }) => {
  const [selectedUser, setSelectedUser] = React.useState();
  const [showEditUserForm, setShowEditUserForm] = React.useState(false);


  const selectUser = (user) => {
    setSelectedUser(user);
    setShowEditUserForm(true);
  };
  
  return (
    <div className="settings">
      <h1 className="settings__header">{title}</h1>
      <div className="settings__userData">
        {users.map((user, index) => {
          return (
            <UserData
              key={`${user.name}_${index}`}
              name={user.name}
              lastname={user.lastname}
              email={user.email}
              setShowEditUserForm={setShowEditUserForm}
              selectUser={()=>selectUser(user)}
              selectedUser={selectedUser}
              showEditUserForm={showEditUserForm}
            />
          );
        })}
      </div>
    </div>
  );
};
