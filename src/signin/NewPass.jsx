import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function NewPass() {
    const navigate=useNavigate()
    const location = useLocation()
    const [isLoading,setIsLoading]=useState(false)
    const p = useRef();
    const rp = useRef();
    const [state, setState] = useState({
        validatepassowrd: [
            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-xr12",
            "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-xr12 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
        paswwordchecked: false,
    });
    function validatepassword(password) {
        return String(password).length < 30 ? true : false;
    }
    function handlepassword(e) {
        if (e.target.id == "floating_password") {
            if (state.paswwordchecked && rp.current.value != "") {
                if (
                    p.current.value == rp.current.value &&
                    validatepassword(p.current.value)
                ) {
                    setState((dstate) => ({
                        ...dstate,
                        validatepassowrd: [
                            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-xr12",
                            "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-xr12 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                        ],
                    }));
                } else {
                    setState((dstate) => ({
                        ...dstate,
                        validatepassowrd: [
                            "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
                            "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                        ],
                    }));
                }
            } else {
                if (
                    (p.current.value == rp.current.value || rp.current.value == "") &&
                    validatepassword(p.current.value)
                ) {
                    setState((dstate) => ({
                        ...state,
                        validatepassowrd: [
                            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-xr12",
                            "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-xr12 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                        ],
                    }));
                } else {
                    setState((dstate) => ({
                        ...dstate,
                        validatepassowrd: [
                            "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
                            "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                        ],
                    }));
                }
            }
        } else {
            if (
                p.current.value == rp.current.value &&
                validatepassword(rp.current.value)
            ) {
                setState((dstate) => ({
                    ...dstate,
                    validatepassowrd: [
                        "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-xr12",
                        "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-xr12 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                    ],
                }));
            } else {
                setState((dstate) => ({
                    ...dstate,
                    validatepassowrd: [
                        "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
                        "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                    ],
                }));
            }
        }
    }
    const resetPassword = () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        const wait = toast.loading("Wait few minut")
        if (validatepassword(p.current.value)) {
            axios.post(`${process.env.API_URL}/teacher/resetPaswword`, { email: location.state.email, code: location.state.code, rpassword: p.current.value }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                .then(async res => {
                    if (res.data.res) {
                        toast.update(wait, { render: "Success", type: "success", isLoading: false, autoClose: 1000 });
                        await new Promise((resolve) => setTimeout(resolve, 1000))
                        navigate("../../signin")
                    } else {
                        toast.update(wait, { render: res.data.mes, type: "error", isLoading: false, delay: 1000, autoClose: true });
                    }
                }).catch(err => { toast.update(wait, { render: err, type: "error", isLoading: false, delay: 1000, autoClose: true }); })
        } else {
            toast.update(wait, { render: "Entry correct password", type: "error", isLoading: false, delay: 1000, autoClose: true });
        }
        setIsLoading(false)
    }
    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 gap-3 w-full">
                <div className="relative z-0 mb-3 w-full group">
                    <input
                        type="password"
                        ref={p}
                        onChange={handlepassword}
                        name="floating_password"
                        id="floating_password"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.validatepassowrd[0]} appearance-none focus:outline-none focus:ring-0 peer`}
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_password"
                        className={`${state.validatepassowrd[1]}`}
                    >
                        Password
                    </label>
                </div>
                <div className="relative z-0 mb-3 w-full group">
                    <input
                        type="password"
                        ref={rp}
                        onBlur={handlepassword}
                        onClick={() => {
                            setState({ ...state, paswwordchecked: true });
                        }}
                        name="repeat_password"
                        id="floating_repeat_password"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.validatepassowrd[0]} appearance-none focus:outline-none focus:ring-0 peer`}
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_repeat_password"
                        className={`${state.validatepassowrd[1]}`}
                    >
                        Confirm password
                    </label>
                </div>
            </div>
            <div>
                <button onClick={resetPassword} className="rounded-lg bg-sky-400 py-2 px-4 w-full flex justify-center items-center text-white">Change password</button>
            </div>
        </div>
    )
}
