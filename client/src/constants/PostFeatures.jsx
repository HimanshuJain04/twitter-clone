import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";

export const postFeatures = [
    {
        title: 'Comment',
        icon1: <FaRegComment />,
    },
    {
        title: 'Retweet',
        icon1: <AiOutlineRetweet />,
    },
    {
        title: 'Like',
        icon1: <FaRegHeart />,
        icon2: <FaHeart />,
    },
    {
        title: 'Stats',
        icon1: <IoStatsChartSharp />,
    },
    {
        title: 'Bookmark',
        icon1: <FaBookmark />,
        icon2: <FaRegBookmark />,
    },
];