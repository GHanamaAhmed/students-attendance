import React, { memo } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiLogout } from 'react-icons/hi'

import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout } from "../redux/accountReducer"
export default memo(function ListHeader({ className }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className={`md:w-full w-fit ${className} bg-gray-50 shadow-md z-50`}>
            <>
                <aside
                    id="separator-sidebar"
                    className="h-full w-full"
                    aria-label="Sidebar"
                >
                    <div className="h-full w-full px-3 py-4 overflow-y-auto flex flex-col justify-between bg-gray-50 dark:bg-gray-800">

                        <ul className="space-y-2 font-medium">
                            <div className='p-2'>
                            </div>
                            <li>
                                <Link
                                    to={"/Dashboard/"}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                    </svg>

                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/rooms/"}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Rooms</span>
                                </Link>
                            </li>

                        </ul>
                        <ul className="py-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <Link
                                    to={"/ourteam/"}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                    </svg>

                                    <span className="ml-3">Our Team</span>
                                </Link>
                            </li>
                            <li onClick={() => {
                                dispatch(logout())
                                navigate("/sign/")
                            }}>
                                <div

                                    className="flex items-center p-2 cursor-pointer text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <HiLogout />
                                    <span className="ml-3">Logout</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </aside>

            </>

            {/* <Sidebar aria-label="Sidebar with multi-level dropdown example" className='h-full w-full p-0'>
                <Sidebar.Items className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col gap'>
                        <div className='p-2'>
                            <img src="./img/logo.svg" alt="" width={130} />
                        </div>
                        <Sidebar.ItemGroup className='border-none'>
                            <Sidebar.Item
                                icon={HiChartPie}
                            >
                                <Link to='/Dashboard'>Dashboard</Link>
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={HiInbox}
                            >
                                <Link to='/Rooms'>Rooms</Link>
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={HiUser}
                            
                            >
                               <Link to='/CreateRoom'>Create Room</Link>
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>
                    </div>
                    <Sidebar.ItemGroup className=''>
                        <Sidebar.Item
                            icon={HiInbox}
                        >
                          <Link to='/Settings'>Settings</Link>
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={HiLogout}
                        >
                            <Link to='/Logout'>Logout</Link>
                        </Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar> */}
        </div>
    )
})