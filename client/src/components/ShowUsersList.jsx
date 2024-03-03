import React from 'react'

const ShowUsersList = ({ title, accounts }) => {
    return (
        <div>
            <div className='fixed flex justify-center items-center w-screen left-0 top-0 z-50 bg-black/[0.5] h-screen'>
                <div className='flex flex-col justify-start items-center'>
                    <div>
                        <p className='text-white font-bold text-xl'>{title}</p>
                    </div>
                    <div className='flex text-white'>
                        {
                            accounts?.length > 0 ? (
                                accounts.map((account) => (
                                    <div
                                        key={account}
                                    >
                                        {account}
                                    </div>
                                ))
                            ) : (
                                <div>
                                    No user found
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShowUsersList