import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const ProtectedRoutes = () => {
    let auth = { 'token': true }

    return (
        <div>
            {
                auth.token ? <Outlet /> : <Navigate to="/" />
            }
        </div>
    )
}

export default ProtectedRoutes