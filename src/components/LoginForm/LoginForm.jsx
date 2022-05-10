import React from 'react';

import './LoginForm.scss';
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg';
import { useHistory } from 'react-router-dom';

export const LoginForm = ({ setLoginFormView, setIsLoggeIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [emailError, setEmailError] = React.useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = React.useState('Поле не может быть пустым');
  const [formValid, setFormValid] = React.useState(false);

  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  const history = useHistory();

  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      if (!e.target.value) {
        setEmailError('Поле не может быть пустым');
      }
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3) {
      setPasswordError('Пароль должен содержать более 3 символов');
      if (!e.target.value) {
        setPasswordError('Поле не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const handleLogIn = (e) => {
    e.preventDefault();
	 
    const userData = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };
    localStorage.setItem('isLoggedIn', true);
    setIsLoggeIn(true);
	 history.push('/')
  };

  return (
    <div className="modal active" onClick={setLoginFormView}>
      <div className="modal__content active" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleLogIn}>
          <CloseIcon className="hideBtn" onClick={setLoginFormView} />
          <h1>Авторизация</h1>
          {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          <input
            ref={loginRef}
            onChange={emailHandler}
            value={email}
            onBlur={blurHandler}
            name="email"
            type="text"
            placeholder="Введите email"
          />
          {passwordDirty && passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
          <input
            ref={passwordRef}
            onChange={passwordHandler}
            value={password}
            onBlur={blurHandler}
            name="password"
            type="password"
            placeholder="Введите пароль"
          />
          <button type="submit" disabled={!formValid}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
