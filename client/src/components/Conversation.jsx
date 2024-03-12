import React from 'react';
import { useSelector } from "react-redux"

const Conversation = ({ user }) => {

    const userState = useSelector(state => state.auth.user);
    

    return (
        <div>Conversation</div>
    )
}

export default Conversation