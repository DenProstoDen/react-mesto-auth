import React from 'react';
import logo from '../images/logo.svg';
import { Link, Routes, Route, useNavigate } from "react-router-dom";


export default function Header() {
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
            <Route path="/signin" element={
                <header className="header">
                    <img src={logo} className="header__logo" alt="Место"/>
                    <Link to="/signup" className="header__link">Регистрация</Link>
                </header>
            } />
            <Route path="/signin" element={
                <header className="header">
                    <img src={logo} className="header__logo" alt="Место"/>
                    <Link to="/signup" className="header__link">Регистрация</Link>
                </header>
            } />
        </Routes>
    )
}