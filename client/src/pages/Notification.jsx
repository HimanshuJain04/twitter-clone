import React, { useEffect, useState } from 'react'
import { fetchNotification } from "../services/postService.js";
import Spinner from "../components/common/Spinner.jsx";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";


const Notification = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetchNotification()
      .then(({ data }) => {
        setData(data.data);
        console.log(data);

      }).catch((err) => {
        console.log("ERROR: ", err);
      })
      .finally(() => setLoading(false));

  }, []);


  return (
    <div className='w-full h-screen'>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className='w-full h-full'>
            {
              data.length > 0 ? (
                <>
                  {
                    data?.map((notification) => (
                      <div
                        key={notification._id}
                        className='flex justify-start w-full items-start'
                      >
                        {/* for icon */}
                        <div>
                          <span className='text-blue-500 text-xl'>
                            <FaUserAlt />
                          </span>
                        </div>

                        {/* user details */}
                        <div className='w-full'>
                          {/* user profile image */}
                          <div>
                            <img src={notification.messageFrom?.profileImg} alt="" />
                          </div>

                          {/*  message */}
                          <div>
                            <span>
                              <Link>{notification.messageFrom?.userName}</Link>
                              <p>{notification.message}</p>
                            </span>
                          </div>
                        </div>

                      </div>
                    ))
                  }
                </>
              ) : (
                <div className='w-full py-20'>
                  <p className='text-4xl text-center text-white font-bold'>No notification found</p>
                </div>
              )
            }
          </div>
        )
      }
    </div >
  )
}

export default Notification