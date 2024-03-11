import React, { useEffect, useState } from 'react';
import { MdGroupAdd } from "react-icons/md";
import { getAllConnectedUsers } from "../services/userService.js"
import UserAccount from "../components/UserAccount.jsx";
import Spinner from "../components/common/Spinner.jsx";

const Messages = () => {

    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        setLoading(true);
        getAllConnectedUsers()
            .then(({ data }) => {
                setAllUsers(data.data);
            })
            .catch((err) => { console.log("ERROR: ", err) })
            .finally(() => { setLoading(false) })
    }, []);


    // useEffect(() => {

    // }, [searchValue]);


    return (
        <div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='w-full '>

                        {/* navbar */}
                        <div className='flex flex-row gap-5 justify-between items-center bg-black border-b-2 border-white/[0.2] p-3 w-full'>

                            <div className='w-full'>
                                <input
                                    type="text"
                                    className='w-full outline-none bg-transparent font-semibold text-lg px-4 rounded-full py-2 text-white/[0.8] focus-within:border-blue-400 border-2 border-white/[0.3] transition-all duration-300 ease-in-out'
                                    placeholder='Search users'
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>

                            {/* group button */}
                            <div>
                                <button className='flex bg-green-600 hover:bg-green-500 transition-all duration-300 ease-out rounded-full py-2 px-8 justify-center items-center gap-2 font-bold'>
                                    <span className='text-xl'>
                                        <MdGroupAdd />
                                    </span>
                                    <span className='text-lg'>Group</span>
                                </button>
                            </div>

                        </div>

                        {/* users */}
                        <div>
                            {
                                allUsers.length > 0 ? (
                                    allUsers.map((user) => (
                                        <UserAccount key={user._id} user={user} path={`/chat/${user.userName}`} />
                                    ))
                                ) : (
                                    <div className='w-full mt-10'>
                                        <p className='text-white text-center font-bold text-4xl {
                                }'>No message found</p>
                                    </div>
                                )
                            }
                        </div>

                    </div >
                )
            }

        </div >
    )
}

export default Messages