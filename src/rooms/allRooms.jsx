import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Dropdown, Pagination } from 'flowbite-react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '../redux/roomsReducer';
import { fetchSeassions } from '../redux/seassion';
import RoomParam from './roomParam';
import { useNavigate } from 'react-router-dom';
export default function AllRooms() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.rooms)
    const [currentPage, setCurrentPage] = useState(1);
    const store = useSelector(state => state.account)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(5)
    const [clear, setClear] = useState(true)
    const [selectForDelete, setSelectForDelete] = useState([])
    const [typeShearch, setTypeShearch] = useState('Module')
    const [shearchInp, setShearchInp] = useState("")
    const [filter, setFilter] = useState([])
    const handle = (e) => {
        e.preventDefault()
        setShearchInp(e.target.value)
    }
    useLayoutEffect(() => {
        rooms?.rooms && setFilter(rooms.rooms.filter((room) => (!shearchInp || (typeShearch == "Module" && !`${room?.module}`.toLowerCase().indexOf(shearchInp.toLowerCase())) || (typeShearch == "Code" && !`${room?.code}`.toLowerCase().indexOf(shearchInp.toLowerCase())) || (typeShearch == "Type" && !`${room?.type}`.toLowerCase().indexOf(shearchInp.toLowerCase())))))
    }, [rooms,shearchInp,typeShearch])
    const removeRoom = async (id) => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: id
        }
        await axios.delete(`${process.env.API_URL}/teacher/deletroom`, {
            data: req,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            dispatch(setRooms({ id: [id] }))
            dispatch(fetchSeassions(store))
        }).catch(err => {
            console.log(err);
        })
    }
    const removeRooms = async (e) => {
        e.preventDefault()
        if (selectForDelete.length > 0) {
            const req = {
                email: store.email,
                password: store.password,
                idroom: selectForDelete
            }
            await axios.delete(`${process.env.API_URL}/teacher/deletrooms`, {
                data: req,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(async res => {
                if (res.data.res) {
                    dispatch(setRooms({ id: selectForDelete }))
                    setSelectForDelete(() => [])
                    dispatch(fetchSeassions(store))
                    setClear(false)
                    await new Promise((resolve) => setTimeout(resolve, 1))
                    setClear(true)
                }

            }).catch(err => {
                console.log(err);
            })
        }
    }
    const selectRoom = (e, id) => {
        if (e.target.checked) {
            setSelectForDelete(prev => {
                prev.push(id)
                return prev
            })
        } else {
            setSelectForDelete(prev => prev.filter(element => element != id))
        }
    }
    const fetchSession = async (id) => {
        await axios.get(`${process.env.API_URL}/student/session/${id}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.res) {
                navigate("/Student-Attendance/rooms/prevRoom", { state: res.data, replace: true })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <RoomParam />
            <div className='flex gap-2'>
                <div className='flex items-center justify-between py-0 bg-white rounded-lg ps-5'>
                    <Dropdown label={typeShearch} inline={true}>
                        <Dropdown.Item onClick={() => setTypeShearch("Module")}>
                            Module
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setTypeShearch("Code")}>
                            Code
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setTypeShearch("Type")}>
                            Type
                        </Dropdown.Item>
                    </Dropdown>
                    <input type="text" placeholder='search' onChange={handle} className='w-1/2 border-none placeholder:opacity-50 bg-transparent focus:ring-0 py-2' />
                </div>
            </div>
            <div className='w-full h-full flex justify-center items-start'>
                <div className='w-full flex items-center flex-col' >
                    {!rooms.isloading && <div className="w-11/12  bg-transparent shadow-none relative overflow-auto   sm:rounded-lg">
                        <table className="w-full h-full rounded-3xl shadow-sm text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <label htmlFor="checkbox-all-search" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-1 md:px-6  py-3">
                                        Module name
                                    </th>
                                    <th scope="col" className="px-1 md:px-6  py-3 hidden md:block">
                                        code
                                    </th>
                                    <th scope="col" className="px-1 md:px-6  py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-1 md:px-6  py-3">
                                        Ceate At
                                    </th>
                                    <th scope="col" className="px-1 md:px-6  py-3 hidden md:block">
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clear && filter.length>0&& filter.map((room, index) => {
                                    if (index >= min && index < max) {
                                        return (
                                            <tr key={index} onDoubleClick={() => { fetchSession(room["_id"]) }} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            onChange={(e) => { selectRoom(e, room?._id) }}
                                                            id="checkbox-table-search-1"
                                                            type="checkbox"
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                            checkbox
                                                        </label>
                                                    </div>
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="px-1 md:px-6  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {index + 1} - {room?.module}
                                                </th>
                                                <td className="px-1 md:px-6  py-4">{room?.code ? room.code : "Empty"}</td>
                                                <td className="px-1 md:px-6  py-4 hidden md:block">{room?.type}</td>
                                                <td className="px-1 md:px-6  py-4">{new Date(room?.createAt).toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</td>
                                                <td className="px-1 md:px-6 cursor-pointer py-4 hidden md:block" onClick={() => removeRoom(room?._id)}>
                                                    Remove
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                        <nav
                            className="flex items-center justify-between p-4"
                            aria-label="Table navigation"
                        >
                            <Pagination
                                currentPage={currentPage}
                                layout="table"
                                onPageChange={(page) => {
                                    let newMin;
                                    let newMax;
                                    if (page > currentPage) {
                                        newMin = Math.max((page - 1) * 5, 0);
                                        newMax = page * 5;
                                        setMin(newMin);
                                        setMax(newMax);
                                        setCurrentPage(page);
                                    } else if (page < currentPage && currentPage != 1) {
                                        newMin = Math.max((page - 2) * 5, 0);
                                        newMax = (page) * 5;
                                        setMin(newMin);
                                        setMax(newMax);
                                        setCurrentPage(page);
                                    }
                                }}
                                showIcons={true}
                                totalPages={filter.length>0 ? Math.ceil(filter.length / 5) : 1}
                            />
                            <button onClick={removeRooms} className='text-red-600 py-2 px-4 rounded-lg'>Delete</button>
                        </nav>
                    </div>}
                </div>

            </div></>
    )
}
