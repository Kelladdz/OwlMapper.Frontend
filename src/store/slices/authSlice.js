import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    refreshToken: '',
    userFingerprint: '',
    firstName: '',
    lastName: '',
    userName: '',
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken) // set token to storage
      localStorage.setItem('refreshToken', action.payload.refreshToken) // set refresh token to storage
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userFingerprint = jwtDecode(action.payload.accessToken).userFingerprint
      state.firstName = jwtDecode(action.payload.accessToken).firstName
      state.lastName = jwtDecode(action.payload.accessToken).lastName
      state.userName = jwtDecode(action.payload.accessToken).name
      console.log(state.accessToken,
        state.refreshToken,
        state.userFingerprint,
        state.firstName,
        state.lastName,
        state.userName)
    },
    logout: (state) => {
      localStorage.removeItem('accessToken') // delete token from storage
      localStorage.removeItem('refreshToken') // delete refresh token from storage
      state.accessToken = ''
      state.refreshToken = ''
      state.firstName = ''
      state.lastName = ''
      state.userName = ''
      state.userFingerprint = ''
    },
    setCredentials: (state, action ) => {
      state.userInfo = action.payload
    },
  }
})

export const { logout, setCredentials, login } = authSlice.actions

export const authReducer = authSlice.reducer
