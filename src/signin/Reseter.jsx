import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Reseter() {
    const location = useLocation()
    const navigate = useNavigate()
    const code = useRef()
    const [time, setTime] = useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const [state, setState] = useState({
        invalidinpute:
            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-xr12 focus:border-xr12",
        invalidelabel:
            "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
    });
    function handle(e) {
        let value = e.target.value;
        if (value != "") {
            setState((dstate) => ({
                ...dstate,
                invalidinpute:
                    "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600",
                invalidelabel:
                    "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
            }));
        } else {
            setState((dstate) => ({
                ...dstate,
                invalidelabel: "text-red-600 dark:text-red-600",
                invalidinpute:
                    "border-red-500 text-red-600 dark:text-red focus:border-red-600",
            }));
        }
    }
    const sendCode = () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        const wait = toast.loading("Wait few minut")
        if (code.current.value != "") {
            axios.post(`${process.env.API_URL}/teacher/forgetpassword`, { email: location.state.email, code: code.current.value }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                .then(async res => {
                    if (res.data.res) {
                        toast.update(wait, { render: "Code successfuly", type: "success", isLoading: false, autoClose: 1000 });
                        await new Promise((resolve) => setTimeout(resolve, 1000))
                        navigate("../newpass", { state: { email: location.state.email, code: code.current.value } })
                    } else {
                        toast.update(wait, { render: res.data.mes, type: "error", isLoading: false, delay: 1000, autoClose: true });
                    }
                })
        } else {
            toast.update(wait, { render: "form is Empty!", type: "error", isLoading: false, delay: 1000, autoClose: true });
        }
        setIsLoading(false)
    }
    const resend = () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        const wait = toast.loading("Wait few minut")
        let newTime = Date.now()
        if (newTime - time < 59000) {
            toast.update(wait, { render: `wait 60s stay ${new Date(newTime - time).getSeconds()}s`, type: "success", isLoading: false, autoClose: 1000 });
            return
        }
        axios.post(`${process.env.API_URL}/teacher/authResetPassword`, { email: location.state.email }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then(async res => {
                if (res.data.res) {
                    setTime(() => Date.now())
                    toast.update(wait, { render: "Code has been resended", type: "success", isLoading: false, autoClose: 1000 });
                } else {
                    toast.update(wait, { render: res.data.mes, type: "error", isLoading: false, delay: 1000, autoClose: true });
                }
            })
            setIsLoading(false)
    }
    return (
        <div className='w-full'>
            <div className="relative z-0 mb-6 w-full group">
                <input
                    type={"text"}
                    ref={code}
                    name="code"
                    onBlur={handle}
                    id="code"
                    className={`block py-2.5 w-full px-16 text-sm bg-transparent border-0 border-b-2 ${state.invalidinpute} appearance-none focus:outline-none focus:ring-0 peer`}
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="code"
                    className={`${state.invalidelabel} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                    4-digit code
                </label>
            </div>
            <div>
                <div className='flex gap-3'>
                    <button onClick={resend} className="rounded-lg bg-xr12 py-2 px-4 w-full flex justify-center items-center text-white">Resend</button>
                    <button onClick={sendCode} className="rounded-lg bg-xr12 py-2 px-4 w-full flex justify-center items-center text-white">Send code</button>
                </div>
            </div>
        </div>
    )
}
