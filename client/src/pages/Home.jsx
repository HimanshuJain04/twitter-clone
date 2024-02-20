import React, { useState } from 'react';
import FeaturesSidebar from "../components/home/FeaturSidebar";
import Feeds from "../components/home/Feeds";
import TrendingSidebar from "../components/home/TrendingSidebar";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='min-h-screen justify-between items-start w-10/12 flex flex-row'>

                <FeaturesSidebar />
                <Feeds setIsLoading={setIsLoading} isLoading={isLoading} />
                <TrendingSidebar />

            </div>
        </div>
    )
}

export default Home