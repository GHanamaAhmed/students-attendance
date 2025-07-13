import React, { memo, useEffect, useRef, useState, useTransition } from 'react'
import Nav from '../nav/nav'
import MyCharts from './chartLine'
import { Dropdown, Pagination } from 'flowbite-react'
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents, emptyStudents } from "../redux/studentReducer"
import axios from 'axios'
import Tabel from './tabel'
export default memo(function Dashboard() {
  const dispatch = useDispatch()
  const [typeShearch, setTypeShearch] = useState('Name')
  const [shearchInp, setShearchInp] = useState("")
  const account = useSelector(state => state.account)
  const rooms = useSelector(state => state.rooms)
  const seassions = useSelector(state => state.seassions)
  const [ladding, transition] = useTransition()
  const students = useSelector(state => state.students)
  const [models, setModels] = React.useState([])
  const [specialist, setSpecialist] = React.useState([])
  const [currentModule, setCurrentModule] = useState("All modules")
  const [student, setStudent] = useState([])
  useEffect(() => {
    rooms && rooms.rooms && transition(() => {
      if (rooms.rooms.length <= 0) {
        setSpecialist(() => [])
        dispatch(emptyStudents())
      } else {
        rooms.rooms.forEach(room => {
          setModels((prev) => [...prev, room.module])
          setSpecialist((prev) => [...prev, room.specialist])
        })
      }
      setModels((prev) => removeDuplicate(prev))
      setSpecialist((prev) => removeDuplicate(prev))
    })
  }, [rooms.rooms]);
  useEffect(() => {
    dispatch(fetchStudents(specialist))
  }, [specialist]);
  useEffect(() => {
    if (seassions.seassions) {
      setStudent([])
      seassions.seassions.map((e) => {
        e.attendence.map((att) => {
          let a = {
            ...att,
            module: e.room.module
          }
          setStudent((prev) => {
            return [...prev, a]
          })
        })
      })
    }
  }, [seassions.seassions]);
  const handleModule = (value) => {
    setCurrentModule(() => value)
  }
  //remove duplicate
  const removeDuplicate = (arr) => {
    let unique_array = []
    arr.map((e) => {
      if (unique_array.indexOf(e) === -1) {
        unique_array.push(e)
      }
    })
    return unique_array
  }
  const presentInModule = (st) => {
    let count = 0
    if (currentModule === "All modules") {
      student.map((e) => {
        if (e._id === st._id && e.year == st.year && e.specialist == st.specialist) {
          count++
        }
      })
    } else {
      student.map((e) => {
        if (e.module === currentModule && e._id === st._id && e.year == st.year && e.specialist == st.specialist) {
          count++
        }
      })
    }
    return count
  }
  const absentInModule = (st) => {
    let countRepeteModule = 0
    let count = 0
    let present = 0
    if (currentModule != "All modules") {
      rooms.rooms.map((e) => {
        if (e.module == currentModule && e.schoolYear == st.year && e.specialist == st.specialist) {
          countRepeteModule++
        }
      })
      present = presentInModule(st)
    } else {
      seassions && seassions.seassions && seassions.seassions.map((e) => {
        if (e.room.schoolYear == st.year && e.room.specialist == st.specialist) {
          countRepeteModule++
        }
        e.attendence.map((att) => {
          if (att._id === st._id && att.year == e.room.schoolYear && att.specialist == e.room.specialist) {
            present++
          }
        })
      })
    }
    count = countRepeteModule - present
    return count
  }
  const sendToAllStudent = async () => {
    let st = students.students.map(e => {
      if (absentInModule(e)) {
        return {
          id: e._id,
          absent: absentInModule(e)
        }
      }
    })
    const req = {
      email: account.email,
      password: account.password,
      student: st,
      module: currentModule
    }
    await axios.post(`${process.env.API_URL}/teacher/sendtoallstudents`, req, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => !res.data.res && console.error(res.data?.mes)).catch(err => {
      console.log(err);
    })

  }
  const handle = (e) => {
    e.preventDefault()
    setShearchInp(e.target.value)
  }
  return (
    <div className='col-start-2 col-end-5 mb-8 max-h-screen h-full overflow-y-auto'>
      <div className='flex justify-center items-center gap-2 w-full flex-col overflow-y-auto'>
        <Nav />
        <div className='w-5/6 flex flex-col md:flex-row gap-2 justify-around items-center overflow-y-auto'>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Welcome </p>
            <p className='font-semibold'>{account?.firstName} {account?.lastName}</p>
            <p className='opacity-70'>{account?.email}</p>
          </div>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Total Rooms </p>
            <p className='font-semibold'>{rooms.rooms?.length}</p>
            <p className='opacity-70'>Rooms</p>
          </div>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Total Moudels </p>
            <p className='font-semibold'>{models?.length}</p>
            <p className='opacity-70'>Moudels</p>
          </div>
        </div>
        <MyCharts />
        <div className='w-full bg-white pb-10 pt-4 px-4 overflow-y-auto'>
          <div className='w-full flex flex-col md:flex-row items-center mb-3 gap-2 justify-between'>
            <div className='flex items-center flex-col md:flex-row gap-5'>
              <div className='flex flex-col gap-2'>
                <div className='bg-secondary rounded-lg py-3 bg-opacity-40 px-5 w-full'>
                  <Dropdown
                    label={currentModule}
                    inline={true}
                    style={{ backgroundColor: "red" }}
                  >
                    <Dropdown.Item onClick={() => setCurrentModule(() => "All modules")}>
                      All modules
                    </Dropdown.Item>
                    {models.map((m, i) => <Dropdown.Item key={i} onClick={() => { handleModule(m) }}>{m}</Dropdown.Item>)}
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='flex items-center justify-center py-0 bg-white rounded-lg ps-5'>
                <Dropdown label={typeShearch} inline={true}>
                  <Dropdown.Item onClick={() => setTypeShearch("Name")}>
                    Name
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTypeShearch("Email")}>
                    Email
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTypeShearch("Presents")}>
                    Presents
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTypeShearch("Absence")}>
                  Absence
                  </Dropdown.Item>
                </Dropdown>
                <input type="text" placeholder='search' onChange={handle} className='w-1/2 border-none placeholder:opacity-50 bg-transparent focus:ring-0 py-2' />
                 </div>
            </div>
            <button onClick={sendToAllStudent} className='bg-secondary  rounded-lg py-3 bg-opacity-40 hover:bg-indigo-400 hover:bg-opacity-50  px-5'>Send to all students</button>
          </div>
          <Tabel seassions={seassions} students={students} currentModule={currentModule} account={account} rooms={rooms} shearch={shearchInp} typeShearch={typeShearch} />
        </div>
      </div>
    </div>
  )
}
)