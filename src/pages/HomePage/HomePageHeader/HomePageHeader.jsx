import React from 'react';

import './HomePageHeader.scss';
import 'antd/dist/antd.css';
import { Button } from 'antd';

export const HomePageHeader = ({ openLoginForm }) => {
  return (
    <header className="mainHeader">
      <Button type="primary" onClick={openLoginForm}>
        LogIn
      </Button>
    </header>
  );
};
