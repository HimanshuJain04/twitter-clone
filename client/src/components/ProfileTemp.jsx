import React from 'react';


const ProfileTemp = ({ user }) => {

    console.log(user)


    return (
        <div className='w-full'>
            <div className='w-full'>

                {/* Navbar */}
                <div>
                    {/* navigation */}
                    <div>
                    </div>
                    {/* user info */}
                    <div>
                        <p>{user?.fullName}</p>
                        <p>{user?.posts?.length} posts</p>
                    </div>
                </div>

                {/* cover | profile image */}
                <div>
                    {/* cover */}
                    <div>
                        <img src="" alt="" />
                    </div>

                    {/* profile */}
                    <div>
                        <img src="" alt="" />
                    </div>

                    {/* edit button */}
                    <div>
                        <button>Edit</button>
                    </div>
                </div>

                {/* details about user */}
                <div>
                    {/* full name */}
                    <div>
                        <p></p>
                    </div>

                    {/* user name */}
                    <div>
                        <p></p>
                    </div>

                    {/* bio */}
                    <div>
                        <p></p>
                    </div>

                    {/* location and joinedAt */}
                    <div>
                        <p></p>
                        <p></p>
                    </div>

                    {/* Followers | Following  */}
                    <div>
                        <div>
                            <span></span>
                            <p></p>
                        </div>

                        <div>
                            <span></span>
                            <p></p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProfileTemp;