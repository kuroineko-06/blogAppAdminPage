import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Check() {

    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (role === "admin") {
            navigate(`/user-manager`);
        }
        else {
            navigate(`/not-have-permission`);
            setTimeout(function () {
                navigate(`/home`);
            }, 5000);
        }
    })


    return (
        <></>
    )
}
