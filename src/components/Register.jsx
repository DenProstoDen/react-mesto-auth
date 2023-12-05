import React from "react";
import { Link } from 'react-router-dom'

function Register(props) {
    return(
        <SignForm
        name="register"
        title="Регистрация"
        textButton="Зарегистрироваться"
        text="Уже зарегистрировались? "
        link={<Link to="/signin" className="">Войти</Link>}
        onSubmit={props.onSubmit}
        onChange={props.onChange}
        email={props.email}
        password={props.password}
    />
    )
}