import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import ProfileTemp from "../components/ProfileTemp";


const MyProfile = () => {

    const userState = useSelector(state => state.auth.user);



    return (
        <div className='w-full'>
            <ProfileTemp user={userState} />
        </div>
    )
}

export default MyProfile;