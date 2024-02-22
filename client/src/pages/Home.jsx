import React, { useState } from 'react';
import Feeds from "../components/home/Feeds";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='w-full flex justify-center items-center'>
            <Feeds setIsLoading={setIsLoading} isLoading={isLoading} />
        </div>
    )
}

export default Home