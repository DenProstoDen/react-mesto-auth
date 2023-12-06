import React from 'react';
import logo from '../images/logo.svg';
import { Link, Routes, Route, useNavigate } from "react-router-dom";


export default function Header(props) {
    const navigate = useNavigate();
    function signOut() {
        localStorage.removeItem('jwt');
        navigate('/signin', { replace: true });
    }
    return(
        <Routes>
            <Route path="/signin" element={
                <header className="header">
                    <img src={logo} className="header__logo" alt="Место"/>
                    <Link to="/signup" className="header__link">Регистрация</Link>
                </header>
            } />
            <Route path="/signup" element={
                <header className="header">
                    <img src={logo} className="header__logo" alt="Место"/>
                    <Link to="/signin" className="header__link">Войти</Link>
                </header>
            } />
            <Route path="/" element={
                <header className="header">
                    <img src={logo} className="header__logo" alt="Место"/>
                    <div className="header__section">
                        <p className="header__email">{props.userData}</p>
                        <button onClick={signOut} className="header__logout">Выйти</button>
                    </div>
                </header>
            } />
        </Routes>
    )
}