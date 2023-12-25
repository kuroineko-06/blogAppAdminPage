import React from "react";
import { Route, Routes } from "react-router-dom";
import CreatePost from "../view/CreatePost";
import UpdatePost from "../view/UpdatePost";
// import NotFound from '../view/NotFound'
import Home from "../view/Home";
import Login from "../view/Login";
import Register from "../view/Register";
import UserManager from "../view/UserManager";
import PrivateRouter from "./PrivateRouter";
import Logout from "../view/Logout";
import NotHasPemission from "../view/NotHasPemission";
import Check from "../view/Check";

export default function AppRouter() {
  // const navigate = useNavigate();
  // const role = localStorage.getItem("role");
  // console.log(">>>> check role:", role);

  return (
    <>
      <div className=" max-w-screen-full ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/check" element={<Check />} />
          <Route path="/not-have-permission" element={<NotHasPemission />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>

        <PrivateRouter path="/user-manager" element={<UserManager />} />
        <PrivateRouter path="/home" element={<Home />} />
        <PrivateRouter path="/create-post" element={<CreatePost />} />
        <PrivateRouter path="/update-post/:slug" element={<UpdatePost />} />
      </div>
    </>
  );
}
