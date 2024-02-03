import React from "react";
import { NavLink } from "react-router-dom";
import {observer} from 'mobx-react-lite'
import UserStore from "../store/UserStore";
const Navbar = () =>{
    return(
        UserStore.isAuth ?
        <div className="h-14 bg-[#101237]">
        <nav className="max-w-[1400px] h-full px-2 mx-auto flex items-center justify-between">
            <NavLink className="text-white font-semibold text-2xl" to={'/'}>Techno Store</NavLink>
            <div className="flex gap-4">
            <NavLink to={'/admin'} className="text-white border border-white rounded-md px-4 py-1 bg-transparent">Админ панель</NavLink>
                <button 
                onClick={()=>{UserStore.logout()}}
                className="text-white border border-white rounded-md px-4 py-1 bg-transparent">Выйти</button>
            </div>
        </nav>
    </div>
        :
        <div className="h-14 bg-[#101237]">
            <nav className="max-w-[1400px] h-full px-2 mx-auto flex items-center justify-between">
                <NavLink className="text-white font-semibold text-2xl" to={'/'}>Techno Store</NavLink>
                <div className="flex gap-1">
                    <NavLink to={'/login'} className="text-white border border-white rounded-md px-4 py-1 bg-transparent"
                    >Войти</NavLink>
                </div>
            </nav>
        </div>
    )
}
export default observer(Navbar)