import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Landing from '../pages/Landing';
import FeatureSidebar from './common/FeaturSidebar';
import TrendingSidebar from './common/TrendingSidebar';

const ProtectedRoutes = () => {
    const userAuth = useSelector(state => state.auth.user);
    // const userAuth = false;

    return (
        userAuth ?
            <div className='justify-between w-full items-start flex flex-row'>
                <div>
                    <FeatureSidebar />
                </div>
                <Outlet />
                <div>
                    <TrendingSidebar />
                </div>
            </div>
            : <Landing />
    )
}

export default ProtectedRoutes;