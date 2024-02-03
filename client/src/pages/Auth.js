import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import UserStore from "../store/UserStore";
const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        isLogin ?
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[80%] lg:w-[40%] px-6 py-10 rounded-lg flex flex-col gap-5 border border-black border-opacity-10">
                    <h2 className="text-center font-semibold text-4xl text-[#000000bd]">Авторизация</h2>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="px-3 py-2 bg-transparent rounded-lg border border-black border-opacity-10" type="text" placeholder="Введите ваш email" />
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="px-3 py-2 bg-transparent rounded-lg border border-black border-opacity-10" type="password" placeholder="Введите ваш пароль" />
                    <div className="flex items-center justify-between">
                        <span>Нет аккаунта ? <NavLink className=" text-blue-800" to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></span>
                        <button
                            onClick={async () => {
                                await UserStore.login(email, password)
                                navigate('/')
                            }}
                            className="text-green-600 rounded-md px-4 py-1 border border-green-600">Войти</button>
                    </div>
                </div>
            </div>
            :
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[80%] lg:w-[40%] px-6 py-10 rounded-lg flex flex-col gap-5 border border-black border-opacity-10">
                    <h2 className="text-center font-semibold text-4xl text-[#000000bd]">Регистрация</h2>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="px-3 py-2 bg-transparent rounded-lg border border-black border-opacity-10" type="text" placeholder="Введите ваш email" />
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="px-3 py-2 bg-transparent rounded-lg border border-black border-opacity-10" type="password" placeholder="Придумайте пароль" />
                    <input className="px-3 py-2 bg-transparent rounded-lg border border-black border-opacity-10" type="password" placeholder="Повторите пароль" />
                    <div className="flex items-center justify-between">
                        <span>Есть аккаунт ? <NavLink className=" text-blue-800" to={LOGIN_ROUTE}>Войдите!</NavLink></span>
                        <button
                            onClick={async () => {
                                await UserStore.registration(email, password)
                                navigate('/')
                            }}
                            className="text-green-600 rounded-md px-4 py-1 border border-green-600">Регистрация</button>
                    </div>
                </div>
            </div>
    )
}
export default observer(Auth)