import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Landing from '../pages/Landing';

const ProtectedRoutes = () => {
    const userAuth = useSelector(state => state.auth.user);
    // const userAuth = false;

    return (
        userAuth ? <Outlet /> : <Landing />
    )
}

export default ProtectedRoutes;