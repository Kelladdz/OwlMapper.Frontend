import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



  const linesApi = createApi({
    reducerPath: 'lines',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033'}),
    endpoints: (builder) => {
        return {
            fetchLine: builder.query({
                query: (lineName) => {
                    return {
                        url: `/api/Lines/${lineName}`,
                        method: 'GET'
                        }
        }}),
        fetchFilteredByBusStopId: builder.query({
            query: (busStopId) => {
                return {
                    url: `/api/Lines/filter?busStopId=${busStopId}`,
                    method: 'GET'
                    }
        }}),
            fetchLines: builder.query({
                providesTags: ['Lines'],
                query: () => {
                    return {
                        url: '/api/Lines',
                        method: 'GET'
                        }
        }}),
            addLine: builder.mutation({
                invalidatesTags: ['Lines'],
                query: ({ lineName, validFrom, route, routeStops, departures, routeLinePoints }) => {
                    return {
                        url: '/api/Lines',
                        method: 'POST',
                        body: {
                            lineName: lineName,
                            validFrom: validFrom,
                            route: route,
                            routeStops: routeStops,
                            departures: departures,
                            routeLinePoints: routeLinePoints
                        },
                    }
                }
            }),
            deleteLine: builder.mutation({
                invalidatesTags: ['Lines'],
                query: (lineName) => {
                    return {
                        url: `/api/Lines/${lineName}`,
                        method: 'DELETE'
                    }
                }
            })}
        }
    })





export const { useFetchLinesQuery, useFetchFilteredByBusStopIdQuery, useFetchLineQuery, useAddLineMutation, useDeleteLineMutation } = linesApi;
export { linesApi };