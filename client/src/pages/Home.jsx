import React, { useState } from 'react';
import Feeds from "../components/home/Feeds";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='min-h-screen justify-between items-start w-10/12 flex flex-row'>
                <Feeds setIsLoading={setIsLoading} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Home