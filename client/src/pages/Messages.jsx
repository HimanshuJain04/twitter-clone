import { useEffect, useState } from 'react';
import { MdGroupAdd } from "react-icons/md";
import Conversation from "../components/Conversation.jsx";
import Spinner from "../components/common/Spinner.jsx";
import { useSelector } from "react-redux"
import { getAllChats } from "../services/chatService.js"


const Messages = () => {

    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [allChats, setAllChats] = useState([]);
    const userState = useSelector(state => state.auth.user);

    useEffect(() => {
        setLoading(true);
        getAllChats(userState._id)
            .then(({ data }) => {
                setAllChats(data.data);
            })
            .catch((err) => { console.log("ERROR: ", err) })
            .finally(() => { setLoading(false) })
    }, []);


    useEffect(() => {

    }, [searchValue]);


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
                        </div>

                        {/* users */}
                        <div>
                            {
                                allChats.length > 0 ? (
                                    allChats.map((chats) => (
                                        <Conversation  key={chats._id} data={chats} currentUserId={userState._id} />
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