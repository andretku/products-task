import { authApi } from "./../../services/auth"
import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  token: string
}

const initialState: AuthState = {
  token: "",
}

export const authSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = ""
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getToken.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
      }
    )
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
