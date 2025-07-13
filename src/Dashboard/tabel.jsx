import axios from 'axios'
import { Pagination } from 'flowbite-react'
import React, { useEffect, useState, useTransition } from 'react'
import Printer from '../rooms/printer'
export default function Tabel({ seassions, students, currentModule, account, rooms, typeShearch, shearch }) {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [student, setStudent] = useState([])
  const [filter, setFilter] = useState([])
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
  useEffect(() => {
    let t = []
    if (students?.students) {
      t = students.students.filter((e) => (!shearch || (typeShearch == "Name" && !`${e?.lastname} ${e?.firstname}`.toLowerCase().indexOf(shearch.toLowerCase())) || (typeShearch == "Email" && !`${e?.email}`.toLowerCase().indexOf(shearch.toLowerCase())) || (typeShearch == "Presents" && presentInModule(e).toString() == shearch) || (typeShearch == "Absence" && absentInModule(e).toString() == shearch)))
      setFilter(t.map((e)=>({...e,present:presentInModule(e),absent:absentInModule(e)})))
    }
  }, [students, typeShearch, shearch,currentModule]);
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
  const sendMessages = async (idStudent, absent) => {
    if (absent == 0) {
      return
    }
    const req = {
      email: account.email,
      password: account.password,
      idStudent: idStudent,
      absent: absent,
      module: currentModule
    }
    await axios.post(`${process.env.API_URL}/teacher/sendMessage`, req, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => !res.data.res && console.error(res.data?.mes)).catch(err => {
      console.log(err);
    })
  }
  const print = () => {
    let tabel = []
    tabel = filter.map(e => {

    })
  }
  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>

            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Speciality
            </th>
            <th scope="col" className="px-6 py-3">
              Presnts
            </th>
            <th scope="col" className="px-6 py-3">
              Absence
            </th>
            <th scope="col" className="px-6 py-3">
              Send warring
            </th>
          </tr>
        </thead>
        <tbody>
          {
            filter.length > 0 && filter.map((e, i) => {
              if (i >= min && i < max) {
                return (
                  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="pl-3">
                        <div className="text-base font-normal">{i + 1} - {e?.lastname} {e?.firstname}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{e?.email}</td>
                    <td>
                      <div className="pl-3">
                        <div className="text-base font-semibold">{e?.specialist}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                        {e?.present}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />{" "}
                        {e?.absent}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {e?.absent ? <button className='rounded text-white bg-blue-500 hover:bg-red-600 px-5 py-2' onClick={() => sendMessages(e._id, e?.absent)}>Send</button> : <button className='px-5 py-2 cursor-default'>Send</button>}
                      </div>
                    </td>
                  </tr>
                )
              }
            })
          }
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
          totalPages={Math.ceil(filter.length>0 ? filter.length / 5 : 1)}
        />
        <Printer apiData={filter.map(e => ({ first_name: e.firstname, last_name: e.lastname, email: e.email, specialist: e.specialist, sex: e.sex,present:e?.present,absent:e?.absent,moudle:currentModule }))}/>
      </nav>
    </div>
  )
}
