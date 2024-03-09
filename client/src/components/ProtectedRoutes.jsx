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
            <div className='justify-between h-screen overflow-hidden w-full items-start flex flex-row'>
                <div className='lg:block hidden'>
                    <FeatureSidebar />
                </div>
                <div className='border-r-2 w-full border-white/[0.15] xl:border-none'>
                    <Outlet />
                </div>
                <div className='xl:block hidden'>
                    <TrendingSidebar />
                </div>
            </div>
            : <Landing />
    )
}

export default ProtectedRoutes;