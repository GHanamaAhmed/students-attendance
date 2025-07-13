import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Header from "./header/header";
import ListHeader from "./components/listHeader";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";
import Rooms from "./rooms/rooms";
import CreateRoom from "./createRoom/createRoom";
import Sign from "./signin/sign";
import { fetchRooms, setRooms } from './redux/roomsReducer';
import { useDispatch, useSelector } from "react-redux";
import { fetchSeassions } from './redux/seassion';
import { fetchStudents, emptyStudents } from './redux/studentReducer';
import OurTeam from "./OurTeam/ourTeam";
import { setAcount } from "./redux/accountReducer";
import axios from "axios";
function App() {
  const location = useLocation()
  const account = useSelector(state => state.account)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const store = useSelector(state => state.account)
  const [show, setShow] = useState(false)
  useEffect(() => {
    dispatch(fetchRooms(store))
  }, [account])
  useEffect(() => {
    dispatch(fetchSeassions(store))
  }, [account])
  useEffect(() => {
    let email = localStorage.getItem("email")
    let password = localStorage.getItem("password")
    console.log(location.pathname== "/Student-Attendance/sign/signup" );
    if (location.pathname == "/Student-Attendance/sign/signup" || location.pathname == "/Student-Attendance/sign/signin") {
     
    }else{
      if (email && password) {
        send(email, password)
      } else {
        navigate("/Student-Attendance/sign/signin");
      }
    }
    setShow(true)
  }, [account])
  async function send(email, password) {
    let req = {
      email: email,
      password: password,
    };
    try {
      await axios.post(
        `${process.env.API_URL}/teacher/signin`,
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then(async data => {
        if (data.data.res) {
          dispatch(setAcount(data.data.data))
          navigate("/Student-Attendance/Dashboard");
        } else {
          navigate("/Student-Attendance/sign/signin");
        }
      }).catch(err => { navigate("/Student-Attendance/sign/signin"); });
    } catch (e) {
      navigate("/Student-Attendance/sign/signin");
    }
  }
  if (!show) {
    return
  }
  return (
    <>
      <Routes>
        <Route
          exact
          path="/*"
          element={
            <>
              <div className="md:grid md:grid-cols-4 mb-10 md:mb-0 md:grid-rows-1 overflow-y-auto h-full">
                <Header />
                <ListHeader
                  className={"hidden md:block w-fit col-start-1 h-full col-end-2"}
                />
                <Routes>
                  <Route exact path="/Student-Attendance/Dashboard/*" element={<Dashboard />} />
                  <Route exact path="/Student-Attendance/Rooms/*" element={<Rooms />} />
                  <Route exact path="/Student-Attendance/CreateRoom/*" element={<CreateRoom />} />
                  <Route exact path="/Student-Attendance/ourteam/*" element={<OurTeam />} />
                  <Route path="/*" element={<Navigate to="/Student-Attendance/sign" />} />
                </Routes>
              </div>
            </>
          }
        />
        <Route exact path="/Student-Attendance/sign/*" element={<Sign />} />
        <Route path="/*" element={<Navigate to="/Student-Attendance/sign" />} />
      </Routes>

    </>
  );
}
export default App;
