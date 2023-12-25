import React, { useEffect, useState } from 'react'
import { useNotification } from '../context/NotificationProvider';
import { updateUser } from '../api/user';




export default function ModalEdit({ isVisible, onClose, children, currentUser }) {

    const [values, setValues] = useState({
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.password,
        role: currentUser.role
    })

    const { updateNotification } = useNotification();

    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    const handleChange = ({ target }) => {
        const { value, name } = target;
        const newUser = { ...values, [name]: value };
        setValues({ ...newUser })

    };


    const handelValidation = () => {
        if (!values.name.trim()) {
            updateNotification("error", "Name is missing!");
        };
        if (!values.email.trim()) {
            updateNotification("error", "Email is missing!");
        };
        if (!values.password.trim()) {
            updateNotification("error", "Password is missing!");
        };
        if (values.password.length < 8) {
            updateNotification("error", "Password should be equal or greater than 8 characters.");
        };
        if (values.role.length <= 0) {
            updateNotification("error", "Role is missing!");
        };
    }

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        try {
            handelValidation();
            await updateUser(values._id, values)
                .then((response) => {
                    if (response.user) {
                        updateNotification('success', 'Update complete!');
                        console.log("data", response.user);
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    updateNotification("error", error);
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div
                onClick={handleClose}
                id='wrapper'
                className='fixed inset-0 bg-opacity-25
                backdrop-blur-sm flex justify-center '>
                <div className='w-[600px] flex flex-col mt-20'>
                    <button
                        onClick={() => onClose()}
                        className='text-black text-2xl w-10 font-semibold absolute
                         place-self-end '>
                        x
                    </button>
                    <div
                        className='bg-blue-100 p-2 rounded'>
                        {children}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-10'>

                                {/* Name */}
                                <div>
                                    <label
                                        for="name"
                                        class="block text-sm font-medium 
                                        leading-6 text-gray-900">
                                        Name (<span className='text-red-600'>*</span>)
                                    </label>
                                    <div class="mt-2">
                                        <input
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 
                                py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 px-3
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        for="email"
                                        class="block text-sm font-medium 
                            leading-6 text-gray-900">
                                        Email address (<span className='text-red-600'>*</span>)
                                    </label>
                                    <div class="mt-2">
                                        <input
                                            name="email"
                                            type="email"
                                            autocomplete="email"
                                            value={values.email}
                                            disabled
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 
                                py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 px-3
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <div class="flex items-center justify-between">
                                        <label
                                            for="password"
                                            class="block text-sm font-medium leading-6 
                                text-gray-900"
                                        >
                                            Password (<span className='text-red-600'>*</span>)
                                        </label>
                                    </div>
                                    <div class="mt-2">
                                        <input
                                            pattern='.{8,}'
                                            name="password"
                                            type="password"
                                            disabled
                                            autocomplete="current-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 
                                py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 px-3
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Role select */}
                                <div class=" flex items-center justify-start mt-8 px-0.5">
                                    <div>
                                        <label
                                            for="role"
                                            className=" w-1/5 text-sm font-semibold
                                    text-gray-900 dark:text-white mr-2"
                                        >
                                            Select a role(<span className='text-red-600'>*</span>)
                                        </label>
                                    </div>

                                    <div>
                                        <select
                                            name='role'
                                            value={values.role}
                                            onChange={handleChange}
                                            className="bg-gray-50 border 
                                        border-gray-300 text-gray-900 
                                        text-sm rounded-lg focus:ring-blue-500 
                                        focus:border-blue-500 block w-full p-2 
                                        dark:bg-gray-700 dark:border-gray-600 
                                        dark:placeholder-gray-400 dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500">
                                            <option hidden selected>Choose a role</option>
                                            <option>admin</option>
                                            <option>user</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            {/* button */}
                            <div>
                                <button
                                    onClick={handleSubmit}
                                    type='submit'
                                    className="text-white min-h-max bg-blue-700
                                hover:bg-blue-800 focus:outline-none font-semibold 
                                text-sm rounded-lg px-5 py-2.5 text-center ml-5 float-right">
                                    Save
                                </button>

                                <button
                                    onClick={() => onClose()}
                                    className="text-white bg-red-700 hover:bg-red-800
                                focus:outline-none font-semibold text-sm rounded-lg 
                                px-5 py-2.5 text-center ml-5 float-right">
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>

        </>

    )
}
