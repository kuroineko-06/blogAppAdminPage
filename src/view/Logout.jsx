import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationProvider';

export default function Logout() {

    const navigate = useNavigate();
    const { updateNotification } = useNotification();


    useEffect(() => {
        const confirmed = window.confirm("Are you sure to logout ?");
        if (confirmed) {
            sessionStorage.removeItem("account");
            setTimeout(function () {
                updateNotification("success", "Logout successfully!!!!!")
                navigate(`/`); 
            }, 1500);
            
        } 
        else navigate(`/home`)
    }, []);

    return (
        <>

        </>
    )
}
