import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAcount } from '../redux/accountReducer'
export default function Signup(params) {
  const [spE, setSpE] = useState([])
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    validateusername: [
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validateemail: [
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatefirstname: [
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatelastname: [
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatetel: [
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatepassowrd: [
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    paswwordchecked: false,
    err: {
      msg: [],
      hidden: "hidden",
    },
  });
  const [isHidden, setIshedden] = useState("true");
  const p = useRef();
  const rp = useRef();
  const username = useRef();
  const email = useRef();
  const fname = useRef();
  const lname = useRef();
  const tel = useRef();
  const sp = useRef();
  const code = useRef();
  const company = useRef();
  const navigate = useNavigate();
  async function sendCode() {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    const wait = toast.loading("Please wait...")
    let res;
    let req = { email: email.current.value };
    if (validateEmail(email.current.value) && sp.current.value != "" && company.current.value != "" && validateName(fname.current.value) && validatepassword(p.current.value) && validateName(lname.current.value) && p.current.value == rp.current.value) {
      res = await axios.post(
        `${process.env.API_URL}/teacher/auth`,
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then(res => {
        if (res.data.res) {
          toast.update(wait, { render: "Send code", type: "success", isLoading: false, autoClose: 2000 })
          setIshedden((prevValue) => !prevValue)
        } else {
          toast.update(wait, { render: res.data.mes, type: "error", isLoading: false, data: 2000, autoClose: 2000 })
        }
      }).catch(err => {
        toast.update(wait, { render: err, type: "error", isLoading: false, data: 2000, autoClose: 2000 })
      });

    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.update(wait, { render: "chek your information", type: "error", isLoading: false, data: 2000, autoClose: 2000 })
    }
    setIsLoading(false)
  }
  const fetchspecialist = async () => {
    await axios.get(`${process.env.API_URL}/specialist`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      setSpE((e) => res.data?.length || [
        { specialist: "No specialist" }
      ])
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchspecialist()
  }, [])
  async function send() {
    const wait = toast.loading("Please wait...")
    let res;

    let req = {
      firstname: fname.current.value,
      lastname: lname.current.value,
      sex: company.current.value,
      email: email.current.value,
      password: p.current.value,
      specialist: sp.current.value,
      code: code.current.value,
    };
    if (req.password == rp.current.value) {
      res = await axios.post(
        `${process.env.API_URL}/teacher/signup`,
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then(async res => {
        if (res.data.res) {
          dispatch(setAcount(res.data?.data))
          toast.update(wait, { render: "Success", type: "success", isLoading: false, autoClose: true });
          await new Promise((resolve) => setTimeout(resolve, 1000))
          localStorage.setItem("email", req.email)
          localStorage.setItem("password", req.password)
          navigate("/Student-Attendance/Dashboard/");
        } else {
          toast.update(wait, { render: res.data?.mes, type: "error", isLoading: false, autoClose: true });
        }
      }).catch(err => {
        toast.update(wait, { render: err, type: "error", isLoading: false, autoClose: true });
      });
    }
  }
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  function validateName(username) {
    return (
      String(username).match(/^([a-zA-z]+)$/) && String(username).length <= 15
    );
  }
  function validateNumbre(numbre) {
    return (
      String(numbre).match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) &&
      String(numbre).length <= 15
    );
  }
  function validateusername(username) {
    return (
      String(username).match(/^([a-z_]+[0-9_]*)+$/) &&
      String(username).length <= 15
    );
  }
  function validatepassword(password) {
    return String(password).length < 30 ? true : false;
  }
  function handle(e) {
    let value = e.target.value;
    if (validateEmail(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validateemail: [
          "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validateemail: [
          "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
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
              "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
              "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
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
              "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
              "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
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
            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
            "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
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
  function handlfirstname(e) {
    let value = e.target.value;
    if (validateName(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validatefirstname: [
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validatefirstname: [
          "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }


  function handllastname(e) {
    let value = e.target.value;
    if (validateName(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validatelastname: [
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validatelastname: [
          "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  function handletel(e) {
    let value = e.target.value;
    if (validateNumbre(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validatetel: [
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validatetel: [
          "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  return (
    <div className="items-center justify-center flex">
      <div
        className={`flex justify-center items-center flex-col ${isHidden ? "hidden" : ""
          }`}
      >
        <div className="relative z-0 mb-3 w-full group">
          <input
            type="text"
            name="floating_email"
            ref={code}
            id="username"
            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className={`${state.validateusername[1]}`}
          >
            Code
          </label>
          <button
            onClick={send}
            className="w-full mt-6 mb-3 bg-purple-500 rounded-md h-10 text-white font-serif"
          >
            Sign up
          </button>
        </div>
      </div>
      <div className={`w-5/6 md:w-3/5 ${isHidden ? "" : "hidden"}`}>
        <div className="mb-3 dark:text-white">
          <img className="my-4" src="/img/LogoQr.svg" alt="" />
          <p className="text-zinc-500 mt-3 font-serif">
            Welcome,please enter details.
          </p>
        </div>

        <div className="relative z-0 mb-3 w-full group">
          <input
            type="email"
            name="floating_email"
            ref={email}
            onBlur={handle}
            id="floating_email"
            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.validateemail[0]} appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className={`${state.validateemail[1]}`}
          >
            Email address
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
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
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="text"
              ref={fname}
              onChange={handlfirstname}
              name="floating_first_name"
              id="floating_first_name"
              className={`${state.validatefirstname[0]}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className={`${state.validatefirstname[1]}`}
            >
              First name
            </label>
          </div>
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="text"
              ref={lname}
              onChange={handllastname}
              name="floating_last_name"
              id="floating_last_name"
              className={`${state.validatelastname[0]}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className={`${state.validatelastname[1]}`}
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">

          <div className="relative z-0 mb-3 w-full group">

            <select name="speaciality" defaultValue={""} ref={sp} id="speaciality" className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'>
              <option value={""} disabled>specialist</option>
              {spE && spE.map((e, i) => {
                return (<option key={i} value={e.specialist}>{e.specialist}</option>)
              })}
            </select>

          </div>
          <div>

            <select ref={company} id="underline_select" defaultValue={""} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option value={""} disabled>Male Or Female</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => {
            sendCode();


          }}
          className="w-full mt-6 mb-3 bg-xr12 rounded-md h-10 text-white font-serif"
        >
          Sign up
        </button>

        <div className="flex justify-center mt-5">
          <p className="font-serif">you have an account?</p>
          <Link
            to={"../signin"}
            className="pl-1 text-xr12 font-serif"
          >
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
