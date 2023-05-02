import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: null,
    },
    reducers: {
        login: (state, action) => {
            state.value = {
                email: action.payload.email,
                name: action.payload.name,
                token: action.payload.token
            }
        },
        logout: state => {
            state.value = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer