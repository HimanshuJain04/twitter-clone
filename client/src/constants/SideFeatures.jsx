import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { TbSquareForbid } from "react-icons/tb";
import logo from "/logo.png";
import { CgMoreO } from "react-icons/cg";
import { RiFileListLine } from "react-icons/ri";


export const sideFeatures = [
    {
        title: "Home",
        icon: <MdHomeFilled />
    },
    {
        title: "Explore",
        icon: <FiSearch />
    },
    {
        title: "Notifications",
        icon: <IoNotifications />
    },
    {
        title: "Messages",
        icon: <IoMailOutline />
    },
    {
        title: "Grok",
        icon: <TbSquareForbid />
    },
    {
        title: "Lists",
        icon: <RiFileListLine />
    },
    {
        title: "Communities",
        icon: <FiUsers />
    },
    {
        title: "Premium",
        icon: <img
            src={logo}
            className="h-5 w-auto object-contain"
        />
    },
    {
        title: "Profile",
        icon: <FaRegUser />
    },
    {
        title: "More",
        icon: <CgMoreO />
    },
];