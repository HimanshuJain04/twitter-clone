import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";



function commentHandler() {
    console.log("Comment")
}


function retweetHandler() {

}


function likeHandler() {

}


function statsHandler() {

}


function bookmarkHandler() {

}



export const postFeatures = [
    {
        title: 'Comment',
        icon1: <FaRegComment />,
        func: commentHandler,
    },
    {
        title: 'Retweet',
        icon1: <AiOutlineRetweet />,
        func: retweetHandler,

    },
    {
        title: 'Like',
        icon1: <FaRegHeart />,
        icon2: <FaHeart />,
        func: likeHandler,

    },
    {
        title: 'Stats',
        icon1: <IoStatsChartSharp />,
        func: statsHandler,

    },
    {
        title: 'Bookmark',
        icon1: <FaRegBookmark />,
        icon2: <FaBookmark />,
        func: bookmarkHandler,
    },
];