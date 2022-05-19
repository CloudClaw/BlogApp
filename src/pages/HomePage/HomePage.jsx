import React from 'react';

import './HomePage.scss';

import { LoginForm } from '../../components/LoginForm/LoginForm';
import { HomePageHeader } from './HomePageHeader/HomePageHeader';
import { Slider } from '../../components/Slider/Slider';

export const HomePage = ({ setIsLoggeIn}) => {
  const [LoginFormView, setLoginFormView] = React.useState(false);

  const openLoginForm = () => {
    setLoginFormView(true);
  };

  
  return (
    <div>
      <HomePageHeader openLoginForm={openLoginForm} />
      <div className="homePage">
        <Slider />
        <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione quia deleniti laboriosam
          fugiat, necessitatibus at distinctio totam, pariatur voluptate vel impedit excepturi qui
          delectus. Sint beatae repellat commodi saepe autem?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione quia deleniti laboriosam
          fugiat, necessitatibus at distinctio totam, pariatur voluptate vel impedit excepturi qui
          delectus. Sint beatae repellat commodi saepe autem?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione quia deleniti laboriosam
          fugiat, necessitatibus at distinctio totam, pariatur voluptate vel impedit excepturi qui
          delectus. Sint beatae repellat commodi saepe autem?
        </p>
      </div>
      {LoginFormView && (
        <LoginForm setIsLoggeIn={setIsLoggeIn} setLoginFormView={() => setLoginFormView(false)}/>
      )}
    </div>
  );
};
