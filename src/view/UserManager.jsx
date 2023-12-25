import React, { useEffect, useState } from 'react'
import NavBar_Search_Component from './NavBar_Search_Component'
import { getAllUser, deleteUser } from '../api/user';
import { useNotification } from '../context/NotificationProvider';
import ModalUser from './ModalUser';
import ModalEdit from './ModalEdit';


export default function UserManager() {
  const [listUser, setListUser] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const { updateNotification } = useNotification();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getAllUser();
    if (response) {
      setListUser(response.user);
      console.log("res:", response.user);
    }
  };

  const handleDeleteUser = async ({ _id }) => {
    const confirmed = window.confirm("Are you sure to delete this user?");
    if (!confirmed) return;
    const { error, message } = await deleteUser(_id);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    window.location.reload(true);

  };

  const handleEditUser = (user) => {
    setDataModal(user);
    setShowModal2(true);
  }


  return (
    <div className="max-w-screen-full flex">
      <div className="flex relative ">
        <NavBar_Search_Component />
      </div>

      <div className="flex-1 max-w-screen-lg justify-center items-center border-l-2 bg-gray-100">

        <div className="flex items-center space-x-5 bg-blue-300 mt-14">
          <h1 className="justify-center mx-auto items-center text-xl font-semibold text-gray-700 ">
            List User
          </h1>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 border-2 border-gray-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 border-2">
                        No.
                      </th>

                      <th scope="col" className="px-6 py-3 border-2">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 border-2">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 border-2">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 flex justify-center">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {listUser && listUser.length > 0 ?
                      <>
                        {listUser.map((item, index) => {
                          return (
                            <tr className='hover:bg-gray-200 border-2 border-gray-300' key={`row-${index}`}>
                              <td className='mt-4 justify-center border-gray-300 flex'>{index + 1}</td>
                              {/* <td className="whitespace-nowrap border-2 border-gray-300 px-6 py-4 font-semibold">{item._id}</td> */}
                              <td className="whitespace-nowrap border-2 border-gray-300 px-6 py-4 font-semibold">{item.name}</td>
                              <td className="whitespace-nowrap border-2 border-gray-300 px-6 py-4 font-semibold">{item.email}</td>
                              <td className="whitespace-nowrap border-2 border-gray-300 px-6 py-4 font-semibold">{item.role}</td>
                              <td className="whitespace-nowrap border-gray-300 px-6 py-4 flex justify-center">

                                <button
                                  onClick={() => {
                                    handleEditUser(item)
                                  }}
                                  className='bg-yellow-400 w-16 h-7 mr-5 rounded-lg
                                  hover:bg-yellow-500'>
                                  <h1
                                    className='text-gray-800 
                                  font-semibold'>
                                    Edit
                                  </h1>
                                </button>



                                <button
                                  onClick={() => handleDeleteUser(item)}
                                  className='bg-red-400 h-7 w-20 rounded-lg 
                                  hover:bg-red-500'>
                                  <h1
                                    className='text-gray-800 font-semibold'>
                                    Delete
                                  </h1>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </>
                      :
                      <> <h1> Not Found User </h1> </>
                    }
                  </tbody>
                </table>

                <div className='mt-10 flex justify-end'>
                  <button
                    onClick={() => setShowModal1(true)}
                    className="text-white bg-green-600 hover:bg-green-700
                    focus:outline-none font-semibold text-sm rounded-lg px-5 py-2.5
                    text-center ml-5">
                    <h1> Add New User</h1>
                  </button>
                </div>

                <ModalUser
                  isVisible={showModal1}
                  onClose={() => setShowModal1(false)}>
                  <div className='px-1 py-3 mb-6 border-b-2 border-gray-400'>
                    <h3 className='text-2xl font-semibold  text-gray-900 mb-5'>
                      Add new user
                    </h3>
                  </div>
                </ModalUser>

                {showModal2 &&

                  <ModalEdit
                    isVisible={showModal2}
                    currentUser={dataModal}
                    onClose={() => setShowModal2(false)}>
                    <div className='px-1 py-3 mb-6 border-b-2 border-gray-400'>
                      <h3 className='text-2xl font-semibold  text-gray-900 mb-5'>
                        Edit User
                      </h3>
                    </div>
                  </ModalEdit>

                }

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
