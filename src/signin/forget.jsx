import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Reseter from "./Reseter";
import NewPass from "./NewPass";
import { useRef, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
export default function Forget() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [state, setState] = useState({
        invalidinpute:
            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-xr12 focus:border-xr12",
        invalidelabel:
            "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
    });
    const emailuser = useRef();
    function validateEmailUsername(email) {
        return (
            String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        );
    }
    function handle(e) {
        let value = e.target.value;
        if (validateEmailUsername(value) || value == "") {
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
    const sendCode = async (e) => {
        e.preventDefault()
        if (isLoading) {
            return
        }
        setIsLoading(true)
        const wait = toast.loading("Wait few minut")
        if (validateEmailUsername(emailuser.current.value)) {
            axios.post(`${process.env.API_URL}/teacher/authResetPassword`, { email: emailuser.current.value }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                .then(async res => {
                    if (res.data.res) {
                        toast.update(wait, { render: "Success", type: "success", isLoading: false, autoClose: 2000 });
                        await new Promise((resolve) => setTimeout(resolve, 3000))
                        setIsLoading(false)
                        navigate("auth", { state: { email: emailuser.current.value } })
                    } else {
                        toast.update(wait, { render: res.data?.mes, type: "error", isLoading: false, autoClose: 2000 });
                        setIsLoading(false)
                    }
                }).catch(async err => {
                    toast.update(wait, { render: err, type: "error", isLoading: false, autoClose: 2000 });
                    setIsLoading(false)

                })
        } else {
            toast.update(wait, { render: "Entry your enail correctly", type: "error", isLoading: false, autoClose: 2000 });
            setIsLoading(false)
        }
        setIsLoading(false)
    }
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <Routes>
                    <Route path="/" element={
                        <>
                            <div className="flex w-full flex-col items-center gap-3">
                                <div className="rounded-full p-3 bg-sky-400 bg-opacity-20">
                                    <div className="rounded-full p-1 bg-sky-400 bg-opacity-30">
                                        <img src="/img/icons8-key.svg" alt="" width={40} />
                                    </div>
                                </div>
                                <p className="text-2xl font-semibold">Forget password?</p>
                                <p className="text-lg font-semibold text-slate-800 opacity-70">dot warring ,we'll send you reset instruction</p>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input
                                        type={"email"}
                                        ref={emailuser}
                                        onBlur={handle}
                                        name="floating_email"
                                        id="floating_email"
                                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.invalidinpute} appearance-none focus:outline-none focus:ring-0 peer`}
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className={`${state.invalidelabel} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                    >
                                        Username or Email
                                    </label>
                                </div>
                                <button onClick={sendCode} className="rounded-lg bg-xr12 py-2 px-4 w-full flex justify-center items-center text-white">Send password</button>
                            </div>
                        </>
                    } />
                    <Route path="auth/*" element={<Reseter />} />
                    <Route path="newpass/*" element={<NewPass />} />
                </Routes>
            </div>
        </div>
    )
}
