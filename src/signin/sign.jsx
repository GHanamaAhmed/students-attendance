import React, { memo, useEffect, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
import { useSelector } from "react-redux";
import axios from "axios";
import Forget from "./forget";
export default memo( function Sign() {
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    async function auth(params) {
      let req;
      req = {
        email: account.email,
        password: account.password,
      };
      await axios.post(
        `${process.env.API_URL}/teacher/signin`,
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => {
        if (res.data.res) {
          navigate("/");
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    auth();
  }, []);
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 px-0 dark:bg-slate-800">
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forget/*" element={<Forget/>} />
        <Route path="/*" element={<Navigate to={"signin"} />} />
      </Routes>
      <div className="bg-gray-100 hidden md:flex justify-center items-center dark:bg-slate-400">
        <img src="/img/nobgsh.png" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
})
