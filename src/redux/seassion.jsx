import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const fetchSeassions = createAsyncThunk(
    "seassions/fetchSeassions",
    async (account) => {
        const req = {
            email: account.email,
            password: account.password
        }
        const response = await axios.post(`${process.env.API_URL}/teacher/allSeasons`, req, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return response.data.data
    }
)
const seassionsReducer = createSlice({
    name: "seassions",
    initialState: {
        seassions: [],
        isLading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSeassions.pending, (state, action) => {
            state.isLading = true
        }
        ).addCase(fetchSeassions.fulfilled, (state, action) => {
            state.isLading = false
            state.seassions = action.payload
        }
        ).addCase(fetchSeassions.rejected, (state, action) => {
            state.isLading = false
            state.error = true
        }
        )
    }

})
export { fetchSeassions }
export default seassionsReducer.reducer