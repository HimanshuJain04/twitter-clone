import React, { useState } from 'react';
import { sideFeatures } from "../../constants/SideFeatures";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";



const FeaturSidebar = () => {

  const [option, setoption] = useState(sideFeatures[0]?.title);
  const navigate = useNavigate();


  return (

    <div>
      <div className='flex flex-col pr-10 pt-2 min-h-screen border-r-2 border-[white]/[0.15] justify-start items-start gap-1'>
        <div className='cursor-pointer p-4 transition-all ease-in-out duration-200 hover:bg-[white]/[0.1] rounded-full'>
          <img
            src={logo}
            className="h-7 w-auto  object-contain"
          />
        </div>
        {
          sideFeatures?.map((set) => (
            <div
              key={set.title}
            >
              <div
                onClick={() => {
                  setoption(set.title);
                  navigate(set.path);
                }}
                className='flex text-white gap-4 pl-3 pr-7 py-2 transition-all duration-300 ease-in-out hover:bg-[white]/[0.1] rounded-full cursor-pointer justify-start items-center'
              >

                <span className='text-2xl'>{set.icon}</span>
                <span className={`text-xl transition-all duration-200 ease-in-out ${option === set.title ? "font-bold" : "font-semibold"}`}>{set.title}</span>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FeaturSidebar