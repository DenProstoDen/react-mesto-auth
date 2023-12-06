import React from 'react';
import PopupSignForm from './PopupSignForm';
function Login(props) {
    return (
        <PopupSignForm
            name="login"
            title="Вход"
            textButton="Войти"
            onSubmit={props.onSubmit}
            onChange={props.onChange}
            email={props.email}
            password={props.password}
        />
    )
}

export default Login;