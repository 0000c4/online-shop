import React from "react";
import { Route, Routes} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import { authRoutes, publicRoutes } from "../routes";
import UserStore from "../store/UserStore";
const AppRouter = () => {
    return (
        <Routes>
            {UserStore.isAuth && authRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} Component={Component} exact />
            })}
            {publicRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} Component={Component} exact />
            })}
            <Route path="*" Component={publicRoutes[0].Component} exact />
        </Routes>
    )
}
export default observer(AppRouter)