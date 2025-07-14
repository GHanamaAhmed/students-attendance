import React, { useRef } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid'
import { addRoom } from "../redux/roomsReducer"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function RoomParam() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const account = useSelector(state => state.account)
    const [sp, setSp] = useState([])
    const specialist = useRef()
    const schoolYear = useRef()
    const moudle = useRef()
    const type = useRef()
    const [cursor, setCursor] = useState("cursor-not-allowed")
    const fetchspecialist = async () => {
        await axios.get(`${process.env.API_URL}/specialist`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            setSp((e) => res.data?.length || [
                { specialist: "Math" },
                { specialist: "Physics" },
                { specialist: "Chemistry" },
                { specialist: "Biology" },
                { specialist: "Computer Science" },
                { specialist: "History" },
                { specialist: "Geography" },
                { specialist: "English" },
                { specialist: "French" },
                { specialist: "Other" }

            ])
        }).catch(err => {
            console.log(err);
        })

    }
    const createQrcode = async (e) => {
        e.preventDefault()
        if (specialist.current.value == '' || schoolYear.current.value == '' || moudle.current.value == '' || type.current.value == '') {
            return
        }
        const req = {
            email: account.email,
            password: account.password,
            qrcode: account.email + uuid(),
            code: Math.floor(1000000 + Math.random() * 9000000)
        }
        if (specialist.current.value != "specialst") {
            req.specialist = specialist.current.value;
        }
        if (schoolYear.current.value != "School year") {
            req.schoolYear = schoolYear.current.value;
        }
        if (moudle.current.value != "") {
            req.module = moudle.current.value;
        }
        if (type.current.value != "Type") {
            req.type = type.current.value;
        }
        await axios.post(`${process.env.API_URL}/teacher/createroom`, req, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            dispatch(addRoom(res.data.data))
            navigate("seassion", { state: res.data.data })
        }).catch(err => {
            console.log(err);
        }
        )
    }
    useEffect(() => {
        fetchspecialist()
    }, [])
    const handleChange = () => {
        if (specialist.current.value == '' || schoolYear.current.value == '' || moudle.current.value == '' || type.current.value == '') {
            setCursor("cursor-not-allowed")
        } else {
            setCursor("cursor-pointer")
        }
    }
    return (
        <div className='flex flex-col items-center px-3 pt-4 bg-white w-11/12 mt-2 rounded-3xl'>
            <p className='text-3xl font-bold mb-5'>Create a New Room</p>
            <div className='w-full flex flex-col md:flex-row justify-around items-center gap-2'>
                <div className='rounded-full w-5/6 bg-secondary'>
                    <input type="text" ref={moudle} onChange={handleChange} className='border-none text-center placeholder:text-center flex w-full focus:ring-0 bg-transparent py-3 placeholder:text-xl' placeholder='Moudile' />
                </div>
                <div className='rounded-full text-center w-5/6 bg-secondary'>
                    <select name="speaciality" onChange={handleChange} defaultValue={""} ref={specialist} id="speaciality" className='border-none text-center focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl'>
                        <option value={""} disabled>
                            Specialist
                        </option>
                        {sp && sp.map((e, i) => {
                            return (<option key={i} value={e.specialist}>{e.specialist}</option>)
                        })}
                    </select>
                </div>
                <div className='relative w-5/6 rounded-full bg-secondary'>
                    <select name="level" ref={schoolYear} onChange={handleChange} defaultValue={""} id="level" className='border-none text-center w-full focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl'>
                        <option value={""} disabled>School year</option>
                        <option value="First licence">First licence</option>
                        <option value="Seconde licence">Seconde licence</option>
                        <option value="Third licence">Third licence</option>
                        <option value="First master">First master</option>
                        <option value="Seconde master">Seconde master</option>
                    </select>
                </div>
                <div className='relative w-5/6 rounded-full bg-secondary'>
                    <select name="level" defaultValue={""} onChange={handleChange} ref={type} id="level" className='border-none text-center w-full focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl'>
                        <option value={""} disabled>Type</option>
                        <option value="Cour">Cour</option>
                        <option value="Td">Td</option>
                        <option value="Tp">TP</option>
                    </select>
                </div>
            </div>
            <div className='w-full mb-4 md:mb-0 flex flex-col md:flex-row justify-between items-center '>
                <button onClick={createQrcode} className={`bg-orange-400 ${cursor} text-white  px-4 rounded-lg mb-2  py-3  mt-5 w-full`}>Create with qrcode</button>
            </div>
        </div>
    )
}
