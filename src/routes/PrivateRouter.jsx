import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PrivateRouter(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const session = sessionStorage.getItem("account");
    const new_session = JSON.parse(session);
    if (!new_session) {
      navigate(`/`);
    }
  },[]);

  return (
    <>
      <Routes>
        <Route path={props.path} element={props.element} />
      </Routes>
    </>
  );
}
