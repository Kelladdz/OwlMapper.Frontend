import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const departuresApi = createApi({
    reducerPath: 'departures',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json; charset=UTF-8');
        return headers;
        },
    }),
    endpoints: (builder) => {
        return {
            fetchDeparturesByBusStopId: builder.query({
                providesTags: ['Departures'],
                query: ({busStopId, lineName, date}) => {
                    
                    return {
                        url: `/api/departures/filter?busStopId=${busStopId}&lineName=${lineName}&date=${date}&page=1&pageSize=10`,
                        method: 'GET'
                        }
                }
            }),
        }
    }
})

export const { useFetchDeparturesByBusStopIdQuery } = departuresApi;
export { departuresApi };