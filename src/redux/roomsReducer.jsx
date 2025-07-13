import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { useSelector } from "react-redux"

const fetchRooms = createAsyncThunk(
    "account/fetchRooms",
    async (account) => {
        try {
            const req = {
                email: account.email,
                password: account.password
            }
            const response = await axios.post(`${process.env.API_URL}/teacher/rooms`, req, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            return response.data.data&&response.data.data.reverse()
        } catch (err) {
            console.log(err)
            throw err
        }
    }
)

const roomSlice = createSlice(
    {
        name: "account",
        initialState: {
            rooms: [],
            isloading: false,
            error: false,
        },
        reducers: {
            setRooms(state, { payload }) {
                let f = []
                f
                state.rooms = state.rooms.filter(room => !payload.id.includes(room["_id"]))
            }
            , addRoom(state, { payload }) {
                state.rooms.unshift(payload)
            }
        },
        extraReducers: (builder) => {
            builder.addCase(fetchRooms.fulfilled, (state, { payload }) => {
                state.rooms = payload
                state.isloading = false
            }).addCase(fetchRooms.pending, (state) => {
                state.isloading = true
            }).addCase(fetchRooms.rejected, (state) => {
                state.isloading = false
                state.error = true
            })
        }
    }
)
const { setRooms, addRoom } = roomSlice.actions
export { fetchRooms, setRooms, addRoom }
export default roomSlice.reducer