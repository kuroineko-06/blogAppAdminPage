import React, { useState } from 'react'
import { useNotification } from '../context/NotificationProvider';
import { addUser } from '../api/user';

export const defaultUser = {
    name: '',
    email: '',
    password: '',
    role: ''
};

export default function ModalUser({ isVisible, onClose, children }) {
    const [userInfo, setUserInfo] = useState({ ...defaultUser });

    const { updateNotification } = useNotification();

    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    const handleChange = ({ target }) => {
        const { value, name } = target;
        const newUser = { ...userInfo, [name]: value };

        setUserInfo({ ...newUser });

    };

    const handelValidation = () => {
        if (!userInfo.name.trim()) {
            updateNotification("error", "Name is missing!");
        };
        if (!userInfo.email.trim()) {
            updateNotification("error", "Email is missing!");
        };
        if (!userInfo.password.trim()) {
            updateNotification("error", "Password is missing!");
        };
        if (userInfo.password.length < 8) {
            updateNotification("error", "Password should be equal or greater than 8 characters.");
        };
        if (userInfo.role.length <= 0) {
            updateNotification("error", "Role is missing!");
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            handelValidation();
            await addUser(userInfo)
                .then((response) => {
                    if (response.user) {
                        console.log('ok', response);
                        updateNotification('success', 'Add complete!');
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data);
                    updateNotification("error", "The email is already in use!");
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
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={userInfo.name}
                                            onChange={handleChange}
                                            required class="block w-full rounded-md border-0 
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
                                            id="email"
                                            name="email"
                                            type="email"
                                            autocomplete="email"
                                            value={userInfo.email}
                                            onChange={handleChange}
                                            required class="block w-full rounded-md border-0 
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
                                            id="password"
                                            pattern='.{8,}'
                                            name="password"
                                            type="password"
                                            autocomplete="current-password"
                                            value={userInfo.password}
                                            onChange={handleChange}
                                            required class="block w-full rounded-md border-0 
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
                                            id="role"
                                            name='role'
                                            value={userInfo.role}
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
