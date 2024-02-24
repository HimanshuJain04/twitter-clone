import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import ProfileTemp from "../components/ProfileTemp";


const Profile = () => {

    return (
        <div className='w-full'>
            <ProfileTemp />
        </div>
    )
}

export default Profile;