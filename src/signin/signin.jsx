import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAcount } from "../redux/accountReducer";
import { useDispatch, useSelector } from "react-redux"
export default function Signin() {
  const account = useSelector((state) => state.account)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    invalidinpute:
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600",
    invalidelabel:
      "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
  });
  const emailuser = useRef();
  const password = useRef();
  const navigate = useNavigate();
  async function send() {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    const wait = toast.loading("Please wait...")
    let req;
    let data;
    if (validateEmailUsername(emailuser.current.value)) {
      req = {
        email: emailuser.current.value,
        password: password.current.value,
      };
      console.log("api url", process.env.API_URL,
      );
      data = await axios.post(
        `${process.env.API_URL}/teacher/signin`,
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (data.data.res) {
        dispatch(setAcount(data.data.data))
        toast.update(wait, { render: "Success", type: "success", isLoading: false, autoClose: 1500 });
        await new Promise((resolve) => setTimeout(resolve, 1500))
        localStorage.setItem("email", req.email)
        localStorage.setItem("password", req.password)
        navigate("/Dashboard");
      } else {
        toast.update(wait, { render: data.data.mes, type: "error", isLoading: false, delay: 1000, autoClose: true });
      }
    } else {
      toast.update(wait, { render: "check your information", type: "error", isLoading: false, delay: 1000, autoClose: true });
    }
    setIsLoading(false)
  }

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
  return (
    <div className="flex items-center justify-center">
      <div className="w-5/6 md:w-3/5">
        <div className="mb-5 dark:text-white">
          <img className="my-4" src="/img/LogoQr.svg" alt="" />
          <p className="text-zinc-500 mt-3 font-serif dark:text-slate-400">
            Welcome,please entre details.
          </p>
        </div>
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
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="password"
            ref={password}
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="mt-3">
          <Link to={"../forget"} className="text-zinc-500 font-serif" href="#">
            Forget password
          </Link>
        </div>
        <button
          onClick={() => {
            send();
          }}
          className="w-full mt-6 mb-3 bg-xr12 rounded-md h-10 text-white font-serif"
        >
          Sign in
        </button>
        <div className="flex justify-center mt-5">
          <p className="font-serif dark:text-white">if dont have an account?</p>
          <Link
            to={"../signup"}
            className="pl-1 text-xr12 font-serif"
          >
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
