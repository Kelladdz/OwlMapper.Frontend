import { createSlice } from '@reduxjs/toolkit'

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState: {
    userName: '',
    password: '',
  },
  reducers: {
    handleChangeUserName: (state, action) => {
        state.userName = action.payload
    },
    handleChangePassword: (state, action) => {
        state.password = action.payload
    }
  }
})

export const { handleChangeUserName, handleChangePassword } = loginFormSlice.actions

export const loginFormReducer = loginFormSlice.reducer