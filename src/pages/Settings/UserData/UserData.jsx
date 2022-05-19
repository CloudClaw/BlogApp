import React from 'react';

import './UserData.scss';
import { ReactComponent as EditIcon } from '../../../assets/img/pen.svg';
import { EditUserData } from './EditUserData/EditUserData';

export const UserData = ({
  setShowEditUserForm,
  showEditUserForm,
  name,
  lastname,
  email,
  selectUser,
  selectedUser,
}) => {

  return (
    <>
      <div className="userData">
        <p>Имя: {name}</p>
        <p>Фамилия: {lastname}</p>
        <p>Email: {email}</p>
        <button className="editBtn">
          <EditIcon onClick={selectUser} />
        </button>
      </div>
      {showEditUserForm && (
        <EditUserData
          setShowEditUserForm={setShowEditUserForm}
          selectedUser={selectedUser}
        />
      )}
    </>
  );
};
