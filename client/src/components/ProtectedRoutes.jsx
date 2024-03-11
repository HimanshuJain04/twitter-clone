import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Landing from '../pages/Landing';
import FeatureSidebar from './common/FeaturSidebar';
import TrendingSidebar from './common/TrendingSidebar';
import MobileNavbar from "./MobileNavbar";

const ProtectedRoutes = () => {
    const userAuth = useSelector(state => state.auth.user);
    // const userAuth = false;

    return (
        userAuth ?
            <div className='justify-between relative h-screen overflow-hidden w-full items-start flex flex-row'>
                <div className='lg:block hidden'>
                    <FeatureSidebar />
                </div>
                <div className='border-r-2 w-full border-white/[0.15] xl:border-none'>
                    <Outlet />
                </div>
                <div className='xl:block hidden'>
                    <TrendingSidebar />
                </div>
                <div className='fixed lg:hidden block left-0 bottom-0 w-full'>
                    <MobileNavbar />
                </div>
            </div>
            : <Landing />
    )
}

export default ProtectedRoutes;