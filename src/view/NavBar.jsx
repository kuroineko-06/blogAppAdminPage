import React from "react"
import { NavLink } from "react-router-dom"
import { AiFillHome, AiFillFolderAdd } from "react-icons/ai"
import { FaUser } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";


const NavItem = ({ to, value, closed, Icon }) => {
    const commonClass = " flex items-center space-x-2 w-full p-2 block whitespace-nowrap"
    const activeClass = commonClass + " bg-blue-500 text-white"
    const isActiveClass = commonClass + " text-gray-500"



    return <NavLink className={({ isActive }) =>
        isActive ? activeClass : isActiveClass}
        to={to}>{Icon}
        <span
            className={
                closed
                    ? "w-0 transition-width overflow-hidden"
                    : "w-full transition-width overflow-hidden"
            }>
            {value}
        </span>
    </NavLink>
}

export default function NavBar({ closed }) {
    return (
        <nav>
            <div className="flex justify-center p-3">
                <img className="w-14" src="./neko-logo.png" alt="" />
            </div>
            <ul>
                <li>
                    <NavItem closed={closed}
                        to="/home"
                        value="Home"
                        Icon={<AiFillHome size={24} />} />
                </li>
                <li>
                    <NavItem closed={closed}
                        to="/create-post"
                        value="Create Post"
                        Icon={<AiFillFolderAdd size={24} />} />
                </li>
                <li>
                    <NavItem closed={closed}
                        to="/check"
                        value="User Manager"
                        Icon={<FaUser size={19} />} />
                </li>
                <li>
                    <NavItem closed={closed}
                        to="/logout"
                        value="Logout"
                        Icon={<IoLogOutSharp size={19} />} />
                </li>

            </ul>
        </nav>
    )
}
