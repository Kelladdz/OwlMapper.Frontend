import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7033',
    prepareHeaders: (headers) => {
      const token = useSelector(state => state.auth.accessToken)

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => {
    return {
        getUserDetails: builder.query({
            query: (userId) => {
                return {
                    url: `api/users/${userId}`,
                    method: 'GET',
                }   
            },
        }),
    }
    
  },
});

// export react hook
export const { useGetUserDetailsQuery } = authApi
export { authApi }
