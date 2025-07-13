import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const fetchStudents = createAsyncThunk(
    "account/fetchStudents",
    async (arr) => {
        try {
            const req = {
                specialist: arr,
            }
            const response = await axios.post(`${process.env.API_URL}/teacher/getStudents`, req, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            return response.data.data
        } catch (err) {
            console.log(err)
            throw err
        }
    }
)

const studentsSlice = createSlice(
    {
        name: "students",
        initialState: {
            students: [],
            isloading: false,
            error: false,
        },
        reducers: {
            setStudents(state, { payload }) {
                let f = []
                state.students = state.students.filter(students => !payload.id.includes(students["_id"]))
            },
            emptyStudents(state) {
                state.students = []
            }
        },
        extraReducers: (builder) => {
            builder.addCase(fetchStudents.fulfilled, (state, { payload }) => {
                state.students = payload
                state.isloading = false
            }).addCase(fetchStudents.pending, (state) => {
                state.isloading = true
            }).addCase(fetchStudents.rejected, (state) => {
                state.isloading = false
                state.error = true
            })
        }
    }
)
const { setStudents,emptyStudents} = studentsSlice.actions
export { fetchStudents, setStudents,emptyStudents }
export default studentsSlice.reducer